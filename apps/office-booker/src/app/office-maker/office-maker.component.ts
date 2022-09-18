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
  clicked = false;
  idCounterDesk = 0;
  idCounterWall = 0;
  idCounterMeetingRoom = 0;
  deskWidth = 65;
  deskHeight = 35;
  roomWidth = 100;
  roomHeight = 100;
  wallWidth = 300;
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
    newMeetingRoom.setAttribute("width", this.roomWidth.toString());//default 100
    newMeetingRoom.setAttribute("height", this.roomHeight.toString());//deafult 100
    newMeetingRoom.setAttribute("fill", "brown");
    newMeetingRoom.setAttribute("isMeetingRoom", "true");
    newMeetingRoom.setAttribute("id", "desk-"+this.idCounterMeetingRoom.toString());
    this.idCounterMeetingRoom++;

    svg?.appendChild(newMeetingRoom);
  }

  createWall(){
    const svg = document.getElementById("create-object");
    let child = svg?.lastElementChild;
    while (child){
      svg?.removeChild(child);
      child = svg?.lastElementChild;
    }

    const svgns = "http://www.w3.org/2000/svg";
    const newWall = document.createElementNS(svgns, "line");
    newWall.setAttribute("x1", "35");
    newWall.setAttribute("y1", "35");
    newWall.setAttribute("x2", (this.wallWidth + 35).toString());
    newWall.setAttribute("y2", "35");
    newWall.setAttribute("style", "stroke:rgb(0,0,0);stroke-width:5");
    //newWall.setAttribute("height", "10");
    //newWall.setAttribute("isMeetingRoom", "false");
    newWall.setAttribute("id", "wall-"+this.idCounterWall.toString());
    newWall.setAttribute("len", (this.wallWidth).toString())
    newWall.setAttribute("transform", "rotate(0)");
    this.idCounterWall++;
    svg?.appendChild(newWall);
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

  rotate(){
    const selected = document.getElementById("wall-0");
    selected?.setAttribute("transform", "rotate(45 100 100)");
  }

  startDraw(){
    const svg = document.getElementById("create-object");
    let child = svg?.lastElementChild;
    while (child){
      svg?.removeChild(child);
      child = svg?.lastElementChild;
    }

    const svgns = "http://www.w3.org/2000/svg";
    const newWall = document.createElementNS(svgns, "line");
    newWall.setAttribute("x1", "0");
    newWall.setAttribute("y1", "0");
    newWall.setAttribute("x2", "1");
    newWall.setAttribute("y2", "1");
    newWall.setAttribute("style", "stroke:rgb(0,0,0);stroke-width:5");
    newWall.setAttribute("id", "wall-"+this.idCounterWall.toString());
    newWall.setAttribute("len", '1')
    newWall.setAttribute("transform", "rotate(0)");
    this.idCounterWall++;
    svg?.appendChild(newWall);
  }

  // debug function
  printClicked(){
    console.log(this.clicked);
  }
}
