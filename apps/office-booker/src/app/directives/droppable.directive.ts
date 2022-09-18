import { Directive, HostListener, Input } from '@angular/core';
import { SVGService } from '../services/svg.service';

@Directive({
  selector: '[officeBookerDroppable]'
})
export class DroppableDirective {

  private draggingElement: any;

  constructor(private svgService: SVGService) {}

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
      // const a = droppedElement.getAttribute('x2') - droppedElement.getAttribute('x1');
      // const b = droppedElement.getAttribute('y2') - droppedElement.getAttribute('y1');
      // const dist = Math.sqrt((a * a) + (b * b));
      dropzone.appendChild(droppedElement);
      droppedElement.setAttribute('draggable', true);
      const svgPoint = this.svgService.getSVGPoint(event, droppedElement);
      droppedElement.setAttribute('x1', this.roundNum(svgPoint.x));
      droppedElement.setAttribute('y1', this.roundNum(svgPoint.y));
      droppedElement.setAttribute('x2', parseInt(droppedElement.getAttribute('len')) + (droppedElement.getAttribute('x1') - 35));
      droppedElement.setAttribute('y2', (droppedElement.getAttribute('y1')));
    }
  }

  roundNum(n: number) {
    return Math.round(n / 10) * 10;
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: any): void {
    if (this.draggingElement != null) {
      if (this.draggingElement && this.draggingElement.toString().slice(0, 4) == 'desk') {
        const svgPoint = this.svgService.getSVGPoint(event, this.draggingElement);
        this.setPosition(this.draggingElement, { x: this.roundNum(svgPoint.x), y: this.roundNum(svgPoint.y) });
      } else {
        console.log(this.draggingElement);
        const svgPoint = this.svgService.getSVGPoint(event, this.draggingElement);
        // const a = this.draggingElement.getAttribute('x2') - this.draggingElement.getAttribute('x1');
        // const b = this.draggingElement.getAttribute('y2') - this.draggingElement.getAttribute('y1');
        // const dist = Math.sqrt((a * a) + (b * b));
        this.draggingElement.setAttribute('x1', this.roundNum(svgPoint.x));
        this.draggingElement.setAttribute('y1', this.roundNum(svgPoint.y));
        this.draggingElement.setAttribute('x2', parseInt(this.draggingElement.getAttribute('len')) + parseInt(this.draggingElement.getAttribute('x1')));
        this.draggingElement.setAttribute('y2', (this.draggingElement.getAttribute('y1')));
      }
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
