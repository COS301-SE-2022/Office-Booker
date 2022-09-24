import { Component, OnInit, Input } from '@angular/core';
import { Desk, company, Room, employee} from '../services/booking-service.service';
import { OfficeMakerService} from '../services/office-maker.service';
import { SVGService } from '../services/svg.service';
import { ChangeDetectorRef } from '@angular/core';
import { BookingServiceService } from '../services/booking-service.service';
import { DeskPopupComponent } from '../bookings/map-bookings/desk-popup/desk-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { PopupDialogService } from '../shared/popup-dialog/popup-dialog.service';

@Component({
  selector: 'office-booker-office-maker',
  providers: [SVGService],
  templateUrl: './office-maker.component.html',
  styleUrls: ['./office-maker.component.css'],
})
export class OfficeMakerComponent implements OnInit {
  clicked = false;
  drawMode = false;
  idCounterDesk = 0;
  idCounterWall = 0;
  idCounterMeetingRoom = 0;
  deskWidth = 50;
  deskHeight = 30;
  roomWidth = 200;
  roomHeight = 200;
  wallWidth = 300;
  desks: Array<Desk> = [];
  selectedItemId = "default";

  currentRooms: Array<Room> = [];
  selectedRoom = 1;

  option = {
    title: 'CONFIRM.DOWNLOAD.JOB.TITLE',
    message: 'CONFIRM.DOWNLOAD.JOB.MESSAGE',
    cancelText: 'CONFIRM.DOWNLOAD.JOB.CANCELTEXT',
    confirmText: 'CONFIRM.DOWNLOAD.JOB.CONFIRMTEXT'
  };
  
  @Input() deleteLine = "default";

  currentUser: employee = { id: -1, email: "null", name: "null", companyId: -1, admin: false, guest: false, currentRating: 0, ratingsReceived: 0 };


  constructor(private makerService: OfficeMakerService, 
    private changeDetection: ChangeDetectorRef,
    private bookingService: BookingServiceService, 
    public dialog: MatDialog, 
    private popupDialogService: PopupDialogService,
    ) {}

  ngOnInit(): void {
    //this.getOffices();
    // this.getRooms(this.currentUser.companyId);
    this.getCurrentUser();
    this.changeDetection.detectChanges();
  }

  getCurrentUser() {             //used to get the current logged in user for using the userId, and potentially other information at a later date
    const userData = JSON.stringify(localStorage.getItem("CognitoIdentityServiceProvider.4fq13t0k4n7rrpuvjk6tua951c.LastAuthUser"));
    this.bookingService.getEmployeeByEmail(userData.replace(/['"]+/g, '')).subscribe(res => {
      this.currentUser = res;
      console.log(this.currentUser);
      
      console.log(this.currentUser.companyId);
      
      this.getRooms(this.currentUser.companyId);
      console.log(this.currentRooms[0]);
      this.generateDesks();

      this.changeDetection.detectChanges();
    })
  }

  generateDesks(){ 
    const svg = document.getElementById("dropzone");
    console.log(svg);
    const svgns = "http://www.w3.org/2000/svg";

    console.log(this.desks);
    for (let i=0; i<this.desks.length; i++)
    {
      const newDesk = document.createElementNS(svgns, "rect");
      newDesk.setAttribute("x", this.desks[i].LocationCol.toString());
      newDesk.setAttribute("y", this.desks[i].LocationRow.toString());
      newDesk.setAttribute("width", this.desks[i].Width.toString() ); //default 65
      newDesk.setAttribute("height", this.desks[i].Height.toString() ); //default 35
      newDesk.setAttribute("fill", "grey");
      newDesk.setAttribute("isMeetingRoom", "false");
      newDesk.setAttribute("id", this.desks[i].id.toString());
      newDesk.classList.add("preMade");
      newDesk.onclick = () => this.selectItem(newDesk.id);
      console.log("new desk created");
      svg?.appendChild(newDesk);

    }
  }

  createDesk(){
    const svg = document.getElementById("create-object");
    let child = svg?.lastElementChild;
    while (child){
      svg?.removeChild(child);
      child = svg?.lastElementChild;
    }

    const svgns = "http://www.w3.org/2000/svg";
    const newDesk = document.createElementNS(svgns, "rect");
   
    newDesk.setAttribute("x", "0");
    newDesk.setAttribute("y", "0");
    newDesk.setAttribute("width", this.deskWidth.toString());//default 65
    newDesk.setAttribute("height", this.deskHeight.toString());//default 35
    newDesk.setAttribute("fill", "green");
    newDesk.setAttribute("isMeetingRoom", "false");
    newDesk.setAttribute("id", "desk-"+this.idCounterDesk.toString());
    newDesk.onclick = () => this.selectItem(newDesk.id);
    this.idCounterDesk++;
   
    svg?.appendChild(newDesk);
  }

  selectItem(itemId: string) {
    if (this.selectedItemId != "default" && this.selectedItemId != itemId) {
      document.getElementById(this.selectedItemId)?.setAttribute("style", "stroke:rgb(0,255,0);stroke-width:0");
      this.selectedItemId = "default";
      this.selectedItemId = itemId;
      document.getElementById(itemId)?.setAttribute("style", "stroke:rgb(0,0,255);stroke-width:5");
    } else if (this.selectedItemId == "default") {
      this.selectedItemId = itemId;
      document.getElementById(itemId)?.setAttribute("style", "stroke:rgb(0,0,255);stroke-width:5");
    }
    console.log("select item: " + this.selectedItemId);
  }

  deleteItem() {
    if(this.selectedItemId != "default"){
      const deleteItem = document.getElementById(this.selectedItemId);
      deleteItem?.remove();
      console.log(deleteItem);
      this.selectedItemId = "default";
    }
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
    newMeetingRoom.setAttribute("x", "0");
    newMeetingRoom.setAttribute("y", "0");
    newMeetingRoom.setAttribute("width", this.roomWidth.toString());//default 100
    newMeetingRoom.setAttribute("height", this.roomHeight.toString());//deafult 100
    newMeetingRoom.setAttribute("fill", "brown");
    newMeetingRoom.setAttribute("isMeetingRoom", "true");
    newMeetingRoom.setAttribute("id", "desk-"+this.idCounterMeetingRoom.toString());
    newMeetingRoom.onclick = () => this.selectItem(newMeetingRoom.id);
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

  rotate(){
    const selected = document.getElementById("wall-0");
    selected?.setAttribute("transform", "rotate(45 100 100)");
  }

  startDraw(){
    // if (document.getElementById("startdraw") != null) {
    //   document.getElementById("startdraw")?.setAttribute("style", "border: 10px red solid");
    // }
    this.drawMode = !this.drawMode;
    // if (this.drawMode == true) {
    //   document.getElementById("startdraw")?.setAttribute("style", "border: 10px red solid");
    // } else if (this.drawMode == false) {
    //   document.getElementById("startdraw")?.setAttribute("style", "border: 0px");
    // }
    console.log(this.drawMode);
  }

  // debug function
  printClicked(){
    console.log(this.clicked);
  }

  onChangeFloor(event: { value: any; })
  {
    this.selectedRoom = event.value;
    console.log(event.value);
    this.printRooms(event.value);
  }

  printRooms(roomId: number){
    this.desks.length = 0;

    this.getDesksByRoomId(roomId); 
  }

  getDesksByRoomId(roomId: number) {
    this.bookingService.getDesksByRoomId(roomId).subscribe(res => {
      res.forEach(desk => {
        const newDesk = {} as Desk;       //new desk object to hold a new and possibly empty variable
        newDesk.id = desk.id;             //assigns each property individually
        newDesk.LocationCol = desk.LocationCol;
        newDesk.LocationRow = desk.LocationRow;
        newDesk.roomId = desk.roomId;
        newDesk.bookings = [];            //the potentially empty variable needs to be instantiated
        newDesk.Height = desk.Height;
        newDesk.Width = desk.Width;
        newDesk.isMeetingRoom = desk.isMeetingRoom;

        this.desks.push(newDesk);       //adds to desk array

        this.changeDetection.detectChanges();
      });
    })

  }

  getRooms(coId: number) {
    this.bookingService.getRoomsByCompanyId(coId).subscribe(res => {
      res.forEach(room => {
        this.currentRooms.push(room);
      })
      
      console.log(this.currentRooms[0]);
      this.getDesksByRoomId(this.currentRooms[0].id); //gets all the desks for the current room
      this.changeDetection.detectChanges();
    })
  }

  selectToBook(deskId: number, itemType: boolean) {       //used to find the info for the selected desk
    
    this.openDialog(deskId, itemType);        //opens the dialog box for booking
    this.changeDetection.detectChanges();
  }

  openDialog(deskId: number, itemType: boolean): void {
    if (itemType === true) {this.option.title = "Meeting Room " + deskId}
    else if (itemType === false) {this.option.title = "Desk " + deskId}
    this.popupDialogService.open(this.option);
  }


  //below functions to be fixed/implemented for selecting offices for a company to be able to edit

  // onChangeOffice(event: { value: any; })
  // {
  //   this.selectedOffice = event.value;
  //   console.log(event.value);
  // }

  // getOffices() {
  //   this.makerService.getCompanies().subscribe(res => {
  //     res.forEach(office => {
  //       this.currentOffice.push(office);
  //     })
  //     this.changeDetection.detectChanges();
  //   })
    
  // }
}
