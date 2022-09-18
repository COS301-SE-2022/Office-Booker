import { Directive, ElementRef, Input, OnInit, HostListener } from '@angular/core';
import { SVGService } from '../services/svg.service';

@Directive({
  selector: '[officeBookerDrawable]'
})


export class DrawableDirective {
  @Input() officeBookerDrawable = false;
  constructor(private svgService: SVGService) { }

  @HostListener('click', ['$event'])
  onclick(event: any) {
    console.log(this.officeBookerDrawable);
  }

  @HostListener('mouseenter', ['$event'])
  onMouseEnter(event: any) {
    console.log(this.officeBookerDrawable);
  }

}
