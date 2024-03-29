
import { Directive, HostListener } from '@angular/core';
import { SVGService } from '../services/svg.service';

@Directive({
  selector: '[officeBookerDroppable]'
})
export class DroppableDirective {
  private draggingElement: any;

  constructor(private svgService: SVGService) {}

  @HostListener('drop', ['$event'])
  onDrop(event : any) {
    const dropzone = event.target;
    const droppedElementId = event.dataTransfer.getData('text');
    const droppedElement = document.getElementById(droppedElementId) as any;

    dropzone.appendChild(droppedElement);

    droppedElement.setAttribute('draggable', true);

    const svgPoint = this.svgService.getSVGPoint(event, droppedElement);
    this.setPosition(droppedElement, { x: this.roundNum(svgPoint.x), y: this.roundNum(svgPoint.y)});
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event : any): void {
    if (this.draggingElement) {
      const svgPoint = this.svgService.getSVGPoint(event, this.draggingElement);
      this.setPosition(this.draggingElement, { x: this.roundNum(svgPoint.x), y: this.roundNum(svgPoint.y)});
    }
  }

  roundNum(n: number) {
    return Math.round(n / 10) * 10;
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event : any): void {
    if (event.target.getAttribute('draggable')) {
      this.draggingElement = event.target;
    }
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(event : any): void {
    this.draggingElement = null;
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave(event : any): void {
    this.draggingElement = null;
  }

  private setPosition(element : any, coord: { x : any, y : any}) {
    element.setAttribute('x', coord.x);
    element.setAttribute('y', coord.y);
  }
}

