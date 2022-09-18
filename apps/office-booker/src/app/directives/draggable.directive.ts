import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[officeBookerDraggable]'
})
export class DraggableDirective {

  constructor(private el: ElementRef) {
    this.el.nativeElement.setAttribute('draggable', true);
  }

  @HostListener('dragstart', ['$event'])
  onDragStart(event: any) {
    console.log("Drag Start");
    const elementToBeDraggedRect = event.target.getElementsByTagName('rect')[0];
    console.log(elementToBeDraggedRect);
    const elementToBeDraggedLine = event.target.getElementsByTagName('line')[0];
    if(elementToBeDraggedLine){
      event.dataTransfer.setData('text', elementToBeDraggedLine.id);
    }
    if(elementToBeDraggedRect){
      event.dataTransfer.setData('text', elementToBeDraggedRect.id);
    }
  }

  @HostListener('document:dragover', ['$event'])
  onDragOver(event: any) {
    console.log("Drag Over");
    event.preventDefault();
  }

}
