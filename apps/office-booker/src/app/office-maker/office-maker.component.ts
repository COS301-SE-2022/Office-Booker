import { Component, OnInit } from '@angular/core';
import { SVGService } from '../services/svg.service';

@Component({
  selector: 'office-booker-office-maker',
  providers: [SVGService],
  templateUrl: './office-maker.component.html',
  styleUrls: ['./office-maker.component.css'],
})
export class OfficeMakerComponent /*implements OnInit*/ {
  idCounter = 0;
  //constructor() {}

  //ngOnInit(): void {}

  createDesk(){
    const svgns = "http://www.w3.org/2000/svg";
    const newDesk = document.createElementNS(svgns, "rect");
    newDesk.setAttribute("x", "35");
    newDesk.setAttribute("y", "65");
    newDesk.setAttribute("width", "65");
    newDesk.setAttribute("height", "35");
    newDesk.setAttribute("fill", "green");
    newDesk.setAttribute("id", "desk-"+this.idCounter.toString());
    this.idCounter++;

    const svg = document.getElementById("create-desk");
    svg?.appendChild(newDesk);
  }

  createMeetingRoom(){
    const svgns = "http://www.w3.org/2000/svg";
    const newMeetingRoom = document.createElementNS(svgns, "rect");
    newMeetingRoom.setAttribute("x", "35");
    newMeetingRoom.setAttribute("y", "35");
    newMeetingRoom.setAttribute("width", "150");
    newMeetingRoom.setAttribute("height", "150");
    newMeetingRoom.setAttribute("fill", "brown");
    newMeetingRoom.setAttribute("id", "desk-"+this.idCounter.toString());
    this.idCounter++;

    const svg = document.getElementById("create-meetingRoom");
    svg?.appendChild(newMeetingRoom);
  }
}
