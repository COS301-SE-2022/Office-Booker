import { Directive, ElementRef, Input, OnInit, HostListener } from '@angular/core';
import { SVGService } from '../services/svg.service';

@Directive({
  selector: '[officeBookerDrawable]'
})


export class DrawableDirective {
  @Input() officeBookerDrawable = false;

  posX = 0;
  posY = 0;
  newWall: any;
  line: any;
  constructor(private svgService: SVGService) { }

  @HostListener('click', ['$event'])
  onclick(event: any) {
    if (this.officeBookerDrawable) {
      const dropzone = event.target;
      const svgns = "http://www.w3.org/2000/svg";
      this.newWall = document.createElementNS(svgns, "line");
      this.newWall.setAttribute("x1", "0");
      this.newWall.setAttribute("y1", "0");
      this.newWall.setAttribute("x2", "1");
      this.newWall.setAttribute("y2", "1");
      this.newWall.setAttribute("style", "stroke:rgb(0,0,0);stroke-width:5");
      this.newWall.setAttribute("id", "wall-0");
      //newWall.setAttribute("len", '1')
      //newWall.setAttribute("transform", "rotate(0)");
      dropzone.appendChild(this.newWall);
      if (this.newWall != null) {
        this.newWall.setAttribute('draggable', true);
        const svgPoint = this.svgService.getSVGPoint(event, this.newWall);
        this.newWall.setAttribute('x1', this.posX);
        this.newWall.setAttribute('y1', this.posY);
        this.newWall.setAttribute('x2', this.posX);
        this.newWall.setAttribute('y2', this.posY);
      }
    } else {
      console.log(this.officeBookerDrawable);
      if (this.newWall != null) {
        this.newWall.setAttribute('draggable', true);
        const svgPoint = this.svgService.getSVGPoint(event, this.newWall);
        this.newWall.setAttribute('x2', this.posX);
        this.newWall.setAttribute('y2', this.posY);
      }
    }
  }

  @HostListener('mouseenter', ['$event'])
  onMouseEnter(event: any) {
    console.log(this.officeBookerDrawable);
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: any): void {
    document.addEventListener("mousemove", (e) => {
      this.posX = e.clientX; // Gets Mouse X
      this.posY = e.clientY; // Gets Mouse Y
      //console.log(posX + " " + posY);
    });
  }
}
