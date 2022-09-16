import { Component, OnInit } from '@angular/core';
import { Desk } from '../services/booking-service.service';
import { OfficeMakerService} from '../services/office-maker.service';
import { SVGService } from '../services/svg.service';

@Component({
  selector: 'office-booker-office-maker',
  providers: [SVGService],
  templateUrl: './office-maker.component.html',
  styleUrls: ['./office-maker.component.css'],
})
export class OfficeMakerComponent /*implements OnInit*/ {
  idCounterDesk = 0;
  idCounterMeetingRoom = 0;
  deskWidth = 65;
  deskHeight = 35;
  desks: Array<Desk> = [];
  constructor(private makerService: OfficeMakerService) {}

  //ngOnInit(): void {}

  createDesk(){
    const svg = document.getElementById("create-object");
    let child = svg?.lastElementChild;
    while (child){
      svg?.removeChild(child);
      child = svg?.lastElementChild;
    }

    const svgns = "http://www.w3.org/2000/svg";
    const newDesk = document.createElementNS(svgns, "rect");
    newDesk.setAttribute("x", "35");
    newDesk.setAttribute("y", "65");
    newDesk.setAttribute("width", this.deskWidth.toString());//default 65
    newDesk.setAttribute("height", this.deskHeight.toString());//default 35
    newDesk.setAttribute("fill", "green");
    newDesk.setAttribute("isMeetingRoom", "false");
    newDesk.setAttribute("id", "desk-"+this.idCounterDesk.toString());
    this.idCounterDesk++;

    svg?.appendChild(newDesk);
  }

  createMeetingRoom(){
    const svg = document.getElementById("create-object");
    let child = svg?.lastElementChild;
    while (child){
      svg?.removeChild(child);
      child = svg?.lastElementChild;
    }

    const svgns = "http://www.w3.org/2000/svg";
    const newMeetingRoom = document.createElementNS(svgns, "rect");
    newMeetingRoom.setAttribute("x", "35");
    newMeetingRoom.setAttribute("y", "35");
    newMeetingRoom.setAttribute("width", "100");
    newMeetingRoom.setAttribute("height", "100");
    newMeetingRoom.setAttribute("fill", "brown");
    newMeetingRoom.setAttribute("isMeetingRoom", "true");
    newMeetingRoom.setAttribute("id", "desk-"+this.idCounterMeetingRoom.toString());
    this.idCounterMeetingRoom++;

    svg?.appendChild(newMeetingRoom);
  }

  saveMap(){
    const map = document.querySelectorAll("svg#dropzone");
    map.forEach(node => {
      const rects = node.children;
      Array.from(rects).forEach(rect => {
        const attrb = rect.attributes;
        const newRect = {} as Desk;
        newRect.LocationCol = Number(attrb.getNamedItem('x')?.value);
        newRect.LocationRow = Number(attrb.getNamedItem('y')?.value);
        newRect.Width = Number(attrb.getNamedItem('width')?.value);
        newRect.Height = Number(attrb.getNamedItem('height')?.value);
        newRect.isMeetingRoom = attrb.getNamedItem("isMeetingRoom")?.value ==='true';
        this.makerService.createDesk(2, Math.round(newRect.LocationRow), Math.round(newRect.LocationCol), newRect.Height, newRect.Width, newRect.isMeetingRoom, 10).subscribe();
        console.log(newRect);
      })
    });
  }
}
