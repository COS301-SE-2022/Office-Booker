
import { Injectable } from '@angular/core';

@Injectable()
export class SVGService {
  //constructor() {}

  getSVGPoint(event: any, element: any): SVGPoint {
    // get the mouse coordinates and set them to the SVG point
      const point = element.viewportElement.createSVGPoint();
      point.x = event.clientX;
      point.y = event.clientY;
      const CTM = element.viewportElement.getScreenCTM();
      const svgPoint = point.matrixTransform(CTM.inverse());
      return svgPoint;
}
}