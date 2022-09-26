import { Component, OnInit, Input } from '@angular/core';
import { Desk, company, Room, employee} from '../services/booking-service.service';
import { OfficeMakerService} from '../services/office-maker.service';
import { SVGService } from '../services/svg.service';
import { ChangeDetectorRef } from '@angular/core';
import { BookingServiceService } from '../services/booking-service.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupDialogService } from '../shared/popup-dialog/popup-dialog.service';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { Facility } from '@prisma/client';
import { MatSnackBar } from '@angular/material/snack-bar';


export interface DialogData {
  numPlugs: number;
  numMonitors: number;
  numProjectors: number;
  deskId: number;
}

@Component({
  selector: 'office-booker-office-maker',
  providers: [SVGService],
  templateUrl: './office-maker.component.html',
  styleUrls: ['./office-maker.component.css'],
})
export class OfficeMakerComponent implements OnInit {
  clicked = false;
  drawMode = false;
  editMode = false;
  idCounterDesk = 0;
  
  idCounterWall = 0;
  idCounterMeetingRoom = 0;
  deskWidth = 50;
  deskHeight = 30;
  roomWidth = 200;
  roomHeight = 200;
  wallWidth = 300;
  desks: Array<Desk> = [];
  facilities: Array<Facility> = [];
  selectedItemId = "default";

  currentRooms: Array<Room> = [];
  selectedRoom = 1;

  numPlugs: number;
  numMonitors: number;
  numProjectors: number;
  deskId: number;
  facilityString: string;


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
    public snackBar: MatSnackBar
    ) {
      this.numPlugs = 99;
      this.numMonitors = 99;
      this.numProjectors = 99;
      this.deskId = -1;
      this.facilityString = "error";
    }

  ngOnInit(): void {
    //this.getOffices();
    // this.getRooms(this.currentUser.companyId);
    this.getCurrentUser();
    this.changeDetection.detectChanges();
  }

  getCurrentUser() { //used to get the current logged in user for using the userId, and potentially other information at a later date
    const userData = JSON.stringify(localStorage.getItem("CognitoIdentityServiceProvider.4fq13t0k4n7rrpuvjk6tua951c.LastAuthUser"));
    this.bookingService.getEmployeeByEmail(userData.replace(/['"]+/g, '')).subscribe(res => {
      this.currentUser = res;
      console.log(this.currentUser);
      
      console.log(this.currentUser.companyId);
      
      this.getRooms(this.currentUser.companyId);
      console.log(this.currentRooms[0]);

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
      this.getFacilitiesForDesk(this.desks[i].id);
        console.log(this.numPlugs);
        const newDesk = document.createElementNS(svgns, "rect");
        newDesk.setAttribute("x", this.desks[i].LocationCol.toString());
        newDesk.setAttribute("y", this.desks[i].LocationRow.toString());
        newDesk.setAttribute("width", this.desks[i].Width.toString() ); //default 65
        newDesk.setAttribute("height", this.desks[i].Height.toString() ); //default 35
        newDesk.setAttribute("fill", "grey");
        newDesk.setAttribute("isMeetingRoom", "false");
        newDesk.setAttribute("id", this.desks[i].id.toString());
        newDesk.classList.add("preMade");
        newDesk.classList.add("desk");
        // newDesk.style.cursor = "pointer";
        newDesk.onclick = () => this.selectItem(newDesk.id);
        newDesk.setAttribute("numPlugs", this.numPlugs.toString());
        newDesk.setAttribute("numMonitors", this.numMonitors.toString());
        newDesk.setAttribute("numProjectors", this.numProjectors.toString());

        this.changeDetection.detectChanges();
      
      svg?.appendChild(newDesk);
      

    }
    for (let i = 0; i < this.currentRooms.length; i++) {
      if (this.currentRooms[i].id === this.selectedRoom) {
      this.openSuccessSnackBar("Generated " + this.currentRooms[i].name);
      }
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
    newDesk.style.cursor = "pointer";
    newDesk.classList.add("new");
    newDesk.classList.add("desk");
    newDesk.classList.add("objectGrab");
    newDesk.onclick = () => this.selectItem(newDesk.id);
    this.idCounterDesk++;
   
    svg?.appendChild(newDesk);
  }

  selectItem(itemId: string) {

    if (this.editMode == true) {
      // this.getFacilitiesForDesk(parseInt(itemId));
      console.log(this.editMode);
      this.selectedItemId = itemId;
      this.startEdit(itemId);

    }
    else if (this.selectedItemId != "default" && this.selectedItemId != itemId) {
      console.log("item selected not editMode");
      document.getElementById(this.selectedItemId)?.setAttribute("style", "stroke:rgb(0,255,0);stroke-width:0");
      this.selectedItemId = "default";
      this.selectedItemId = itemId;
      document.getElementById(itemId)?.setAttribute("style", "stroke:rgb(0,0,255);stroke-width:5");
    } else if (this.selectedItemId == "default") {
      this.selectedItemId = itemId;
      document.getElementById(itemId)?.setAttribute("style", "stroke:rgb(0,0,255);stroke-width:5");
    }
    // console.log("select item: " + this.selectedItemId);
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
    newMeetingRoom.style.cursor = "pointer";

    newMeetingRoom.setAttribute("id", "meetingRoom-"+this.idCounterMeetingRoom.toString());
    newMeetingRoom.classList.add("new");
    newMeetingRoom.onclick = () => this.selectItem(newMeetingRoom.id);
    this.idCounterMeetingRoom++;

    svg?.appendChild(newMeetingRoom);
  }

  saveMap(){
    const map = document.querySelectorAll("svg#dropzone");
    map.forEach(node => {
      const rects = node.children;
      Array.from(rects).forEach(rect => {
        if (rect.classList.contains("new")){
        const attrb = rect.attributes;
        const newRect = {} as Desk;
        newRect.LocationCol = Number(attrb.getNamedItem('x')?.value);
        newRect.LocationRow = Number(attrb.getNamedItem('y')?.value);
        newRect.Width = Number(attrb.getNamedItem('width')?.value);
        newRect.Height = Number(attrb.getNamedItem('height')?.value);
        newRect.isMeetingRoom = attrb.getNamedItem("isMeetingRoom")?.value ==='true';
        this.makerService.createDesk(this.selectedRoom, Math.round(newRect.LocationRow), Math.round(newRect.LocationCol), newRect.Height, newRect.Width, newRect.isMeetingRoom, 10).subscribe();
        console.log(newRect);
        }
      })
    });
    alert("Map saved");
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

  setEdit(){
    this.editMode = !this.editMode;
    console.log(this.editMode);
  }

  startEdit(itemId: string){
    // if (document.getElementById("startdraw") != null) {
    //   document.getElementById("startdraw")?.setAttribute("style", "border: 10px red solid");
    // }
    console.log("start edit");
        this.selectedItemId = itemId;
        
        this.openDialog(parseInt(itemId));
      
    
    // if (this.drawMode == true) {
    //   document.getElementById("startdraw")?.setAttribute("style", "border: 10px red solid");
    // } else if (this.drawMode == false) {
    //   document.getElementById("startdraw")?.setAttribute("style", "border: 0px");
    // }
    
  }

  getFacilitiesForDesk(deskId: number) {
    if (deskId != 0) 
    {
      this.bookingService.getFacilitiesByDeskId(deskId).subscribe(res => {
        this.facilities.push(res);
        this.facilityString = JSON.stringify(res);//converts response to string
        if (JSON.stringify(res) != "[]") {
          //split the parsed string to extract the varaiables we need
          const myArray = JSON.stringify(res).split(",");
          const id = myArray[0].split(":");
          const plugsString = myArray[2].split(":")[1];
          const monitorsString = myArray[3].split(":")[1];
          const projectorsString = myArray[4].split(":")[1].replace(/\D/g, '');
          //change the extarcted strings into numbers
          // this.numPlugs = Number(plugsString);
          // this.numMonitors = Number(monitorsString);
          // this.numProjectors = Number(projectorsString);
          // console.log("get facilities: " + this.numPlugs + " " + this.numMonitors + " " + this.numProjectors);
          const facility = {} as Facility;
          facility.deskId = deskId;
          facility.plugs = Number(plugsString);
          facility.monitors = Number(monitorsString);
          facility.projectors = Number(projectorsString); 
          facility.id = Number(id);
          this.facilities.push(facility);
          this.changeDetection.detectChanges();
       
        this.changeDetection.detectChanges();
      
    }
    else {
      //if deskId is 0, set all to 0
      this.numPlugs = 0;
      this.numMonitors = 0;
      this.numProjectors = 0;
      this.changeDetection.detectChanges();

    }


  });
}
}
  

  // debug function
  printClicked(){
    console.log(this.clicked);
  }

  onChangeFloor(event: { value: any; })
  {
    this.selectedRoom = event.value;
    this.printRooms(event.value);
  }

  printRooms(roomId: number){
    this.desks.length = 0;
    this.selectedRoom = roomId;

    this.getDesksByRoomId(roomId); 
  }

  getDesksByRoomId(roomId: number) {
    this.bookingService.getDesksByRoomId(roomId).subscribe(res => {
      res.forEach(desk => {
        this.getFacilitiesForDesk(desk.id);
        const newDesk = {} as Desk;       //new desk object to hold a new and possibly empty variable
        newDesk.id = desk.id;             //assigns each property individually
        newDesk.LocationCol = desk.LocationCol;
        newDesk.LocationRow = desk.LocationRow;
        newDesk.roomId = desk.roomId;
        newDesk.bookings = [];            //the potentially empty variable needs to be instantiated
        newDesk.Height = desk.Height;
        newDesk.Width = desk.Width;
        newDesk.isMeetingRoom = desk.isMeetingRoom;
        newDesk.numPlugs = this.numPlugs;
        newDesk.numMonitors = this.numMonitors;
        newDesk.numProjectors = this.numProjectors;

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

  openDialog(x: number): void {    
    console.log("open dialog");
    console.log(this.facilities[0].plugs);
    
    // this.desks.find(d => d.id == x)?.numPlugs
    this.changeDetection.detectChanges();
    
    // console.log(this.numMonitors + " " + this.numPlugs + " " + this.numProjectors);

    // console.log("data before sent: " + this.desks.find(d => d.id == x)?.id + " " 
    //                                  + this.desks.find(d => d.id == x)?.numPlugs + " " 
    //                                  + this.desks.find(d => d.id == x)?.numMonitors + " "
    //                                  + this.desks.find(d => d.id == x)?.numProjectors);

      const dialogRef = this.dialog.open(EditDialogComponent, {
        width: '550px',
        data: { numPlugs: this.facilities.find(d => d.deskId == x)?.plugs,
                numMonitors: this.facilities.find(d => d.deskId == x)?.monitors,
                numProjectors: this.facilities.find(d => d.deskId == x)?.projectors,
                deskId: x
              }

              
              
            });


      dialogRef.afterClosed().subscribe(result => {
        // console.log(result);
        if (result){
          this.numPlugs = result.numPlugs;
          this.numMonitors = result.numMonitors;
          this.numProjectors = result.numProjectors;
          this.deskId = result.deskId;
          this.bookingService.updateFacilities(this.deskId, this.numPlugs, this.numMonitors, this.numProjectors).subscribe(res => {
            console.log(res);
            for (let i=0; i<this.facilities.length; i++) {
              if (this.facilities[i].deskId == this.deskId) {
                this.facilities[i].plugs = this.numPlugs;
                this.facilities[i].monitors = this.numMonitors;
                this.facilities[i].projectors = this.numProjectors;
              }
            }
            this.changeDetection.detectChanges();
          });
        }
        
        //
      });

    }

    openSuccessSnackBar(message: string) {
      this.snackBar.open(message, "Ok", {
        duration: 5000,
        panelClass: "success-snack"
      });
    }
  
    openFailSnackBar(message: string) {
      this.snackBar.open(message, "Ok", {
        duration: 5000,
        panelClass: "fail-snack"
      });
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
