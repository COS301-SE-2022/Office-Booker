import { Directive, HostListener, Input } from '@angular/core';
import { SVGService } from '../services/svg.service';

@Directive({
  selector: '[officeBookerDroppable]'
})
export class DroppableDirective {

  private draggingElement: any;

  constructor(private svgService: SVGService) { }

  @HostListener('drop', ['$event'])
  onDrop(event: any) {
    const dropzone = event.target;
    const droppedElementId = event.dataTransfer.getData('text');
    const droppedElement = document.getElementById(droppedElementId) as any;

    if (droppedElementId.slice(0, 4) == 'desk') {
      dropzone.appendChild(droppedElement);
      droppedElement.setAttribute('draggable', true);
      const svgPoint = this.svgService.getSVGPoint(event, droppedElement);
      this.setPosition(droppedElement, { x: this.roundNum(svgPoint.x), y: this.roundNum(svgPoint.y) });
    } else if (droppedElementId.slice(0, 4) == 'wall') {
      dropzone.appendChild(droppedElement);
      droppedElement.setAttribute('draggable', true);
      const svgPoint = this.svgService.getSVGPoint(event, droppedElement);
      droppedElement.setAttribute('x1', this.roundNum(svgPoint.x));
      droppedElement.setAttribute('y1', this.roundNum(svgPoint.y));
      droppedElement.setAttribute('x2', 500 + (droppedElement.getAttribute('x1') - 35 ));
      droppedElement.setAttribute('y2', 35 + (droppedElement.getAttribute('y1') - 35));

      //droppedElement.setAttribute('x1', 35 + 60);
      //droppedElement.setAttribute('y1', 35 + 100);
      //droppedElement.setAttribute('x2', 500 + 60);
      //droppedElement.setAttribute('y2', 35 + 100);
    }
  }

  roundNum(n: number) {
    return Math.round(n / 10) * 10;
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: any): void {
    if (this.draggingElement) {
      const svgPoint = this.svgService.getSVGPoint(event, this.draggingElement);
      this.setPosition(this.draggingElement, { x: this.roundNum(svgPoint.x), y: this.roundNum(svgPoint.y) });
    }
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: any): void {
    if (event.target.getAttribute('draggable')) {
      this.draggingElement = event.target;
    }
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(event: any): void {
    this.draggingElement = null;
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave(event: any): void {
    this.draggingElement = null;
  }

  private setPosition(element: any, coord: { x: any, y: any }) {
    element.setAttribute('x', coord.x);
    element.setAttribute('y', coord.y);
  }
}
