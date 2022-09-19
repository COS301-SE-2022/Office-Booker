import { Directive, ElementRef, Input, OnInit, HostListener, Output, EventEmitter } from '@angular/core';
import { SVGService } from '../services/svg.service';

@Directive({
  selector: '[officeBookerDrawable]'
})


export class DrawableDirective {
  @Input() officeBookerDrawable = false;
  @Input() draw = false;
  @Output() deleteLineId = new EventEmitter<string>();

  posX = 0;
  posY = 0;
  newWall: any;
  line: any;
  idCounterWall = 0;
  selectedItemId = "default";

  @HostListener('click', ['$event'])
  onclick(event: any) {
    if (this.draw) {
      if (this.officeBookerDrawable) {
        const dropzone = event.target;
        const svgns = "http://www.w3.org/2000/svg";
        this.newWall = document.createElementNS(svgns, "line");
        this.newWall.setAttribute("x1", "0");
        this.newWall.setAttribute("y1", "0");
        this.newWall.setAttribute("x2", "1");
        this.newWall.setAttribute("y2", "1");
        this.newWall.setAttribute("style", "stroke:rgb(0,0,0);stroke-width:5");
        this.newWall.setAttribute("id", "wall-"+this.idCounterWall.toString());
        this.newWall.onclick = () => this.selectItem(this.newWall.id);
        //newWall.setAttribute("len", '1')
        //newWall.setAttribute("transform", "rotate(0)");
        dropzone.appendChild(this.newWall);
        if (this.newWall != null) {
          this.newWall.setAttribute('draggable', true);
          this.newWall.setAttribute('x1', this.roundNum(this.posX));
          this.newWall.setAttribute('y1', this.roundNum(this.posY));
          this.newWall.setAttribute('x2', this.roundNum(this.posX));
          this.newWall.setAttribute('y2', this.roundNum(this.posY));
        }
      } else {
        if (this.newWall != null) {
          this.newWall.setAttribute('draggable', true);
          this.newWall.setAttribute('x2', this.roundNum(this.posX));
          this.newWall.setAttribute('y2', this.roundNum(this.posY));
        }
      }
    }
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: any): void {
    if (this.draw) {

      const rect = event.currentTarget.getBoundingClientRect();
      this.posX = event.clientX - rect.left; //x position within the element.
      this.posY  = event.clientY - rect.top;  //y position within the element.

      if (!this.officeBookerDrawable && this.newWall != null) {
        this.newWall.setAttribute('x2', this.roundNum(this.posX));
        this.newWall.setAttribute('y2', this.roundNum(this.posY));
      }
    }
  }

  roundNum(n: number) {
    return Math.round(n / 10) * 10;
  }

  selectItem(itemId: string) {
    this.selectedItemId = itemId;
    this.deleteLineId.emit(itemId);
  }

}
