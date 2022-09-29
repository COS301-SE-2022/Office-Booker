import { Component, OnInit, Input } from '@angular/core';
import { Desk, company, Room, employee} from '../services/booking-service.service';
import { OfficeMakerService} from '../services/office-maker.service';
import { SVGService } from '../services/svg.service';
import { ChangeDetectorRef } from '@angular/core';
import { BookingServiceService } from '../services/booking-service.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupDialogService } from '../shared/popup-dialog/popup-dialog.service';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { Facility, Wall } from '@prisma/client';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NewFloorDialogComponent } from './new-floor-dialog/new-floor-dialog.component';


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
  sizeChanger = false;
  right = true;
  idCounterDesk = 0;
  
  idCounterWall = 0;
  idCounterMeetingRoom = 0;

  width = 50;
  height = 30;
  roomWidth = 200;
  roomHeight = 200;
  deskWidth = 50;
  deskHeight = 30;

  selectedItemWidth = 0;
  selectedItemHeight = 0;

  wallWidth = 300;
  allDesks: Array<Desk> = [];
  allWalls: Array<Wall> = [];
  desks: Array<Desk> = [];
  walls: Array<Wall> = [];
  facilities: Array<Facility> = [];
  selectedItemId = "default";

  currentRooms: Array<Room> = [];
  selectedRoom = -1;
  newFloorName = "";

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
      
      this.getRooms(this.currentUser.companyId);

      this.changeDetection.detectChanges();
    })
  }

  getAllDesksOnAllFloors() {
    this.allDesks = [];
    
    for (let i = 0; i < this.currentRooms.length; i++)
    {
      this.getDesksByRoomId(this.currentRooms[i].id); //gets all the desks for the current room
    }

    this.getAllFacilities();
  }

  getAllWallsOnAllFloors() {
    this.allWalls = [];
    
    for (let i = 0; i < this.currentRooms.length; i++)
    {
      this.getWallsByRoomId(this.currentRooms[i].id); //gets all the desks for the current room
    }
  }

  getAllFacilities() {
    for (let i=0; i<this.allDesks.length; i++) {
      this.getFacilitiesForDesk(this.allDesks[i].id);
    }
  }

  

  generateDesks(){ 
    const svg = document.getElementById("dropzone");

    let child = svg?.lastElementChild;
    while (child){      //clears svg zone before getting elements (so changing between offices doesnt show previous office layout)
      svg?.removeChild(child);
      child = svg?.lastElementChild;
    }

    const svgns = "http://www.w3.org/2000/svg";

    for (let i=0; i<this.allDesks.length; i++)
    {
      if (this.allDesks[i].roomId == this.selectedRoom){
        const newDesk = document.createElementNS(svgns, "rect");
        newDesk.setAttribute("x", this.allDesks[i].LocationCol.toString());
        newDesk.setAttribute("y", this.allDesks[i].LocationRow.toString());
        newDesk.setAttribute("width", this.allDesks[i].Width.toString() ); //default 65
        newDesk.setAttribute("height", this.allDesks[i].Height.toString() ); //default 35
        newDesk.setAttribute("fill", "grey");
        newDesk.setAttribute("isMeetingRoom", "false");
        newDesk.setAttribute("id", "existingDesk-" + this.allDesks[i].id.toString());
        newDesk.classList.add("preMade");
        newDesk.classList.add("desk");
        newDesk.onclick = () => this.selectItem(newDesk.id);
        newDesk.setAttribute("numPlugs", this.numPlugs.toString());
        newDesk.setAttribute("numMonitors", this.numMonitors.toString());
        newDesk.setAttribute("numProjectors", this.numProjectors.toString());

        this.changeDetection.detectChanges();
      
      
      svg?.appendChild(newDesk);
      }

    }
    this.generateWalls();

    for (let i = 0; i < this.currentRooms.length; i++) {
      if (this.currentRooms[i].id === this.selectedRoom) {
      this.openSuccessSnackBar("Generated " + this.currentRooms[i].name);
      }
    }
  }

  generateWalls(){ 
    const svg = document.getElementById("dropzone");

    const svgns = "http://www.w3.org/2000/svg";

    for (let i=0; i<this.allWalls.length; i++)
    {
      if (this.allWalls[i].roomId == this.selectedRoom){
        const newWall = document.createElementNS(svgns, "line");
        newWall.setAttribute("x1", this.allWalls[i].Pos1X.toString());
        newWall.setAttribute("y1", this.allWalls[i].Pos1Y.toString());
        newWall.setAttribute("x2", this.allWalls[i].Pos2X.toString());
        newWall.setAttribute("y2", this.allWalls[i].Pos2Y.toString());
        newWall.setAttribute("stroke", "grey");
        newWall.setAttribute("stroke-width", "4");
        newWall.setAttribute("id", "wall-" + this.allWalls[i].id.toString());
        newWall.classList.add("preMade");
        newWall.classList.add("wall");
        
        newWall.onclick = () => this.selectItem(newWall.id);

        this.changeDetection.detectChanges();
      
      svg?.appendChild(newWall);
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
   
    newDesk.setAttribute("x", "10");
    newDesk.setAttribute("y", "10");
    newDesk.setAttribute("width", this.deskWidth.toString());
    newDesk.setAttribute("height", this.deskHeight.toString());
    newDesk.setAttribute("fill", "black");
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
    this.updateSizes();

    if (this.editMode == true) {
      this.drawMode = false;
      this.selectedItemId = itemId;
    
      this.startEdit(itemId);
    }
    // else if (this.selectedItemId != "default" && this.selectedItemId != itemId) {
      const selectedItem =  document.getElementById(this.selectedItemId);
     
      if(selectedItem?.tagName == "rect"){
        selectedItem.setAttribute("style", "stroke-width:0")
        console.log(selectedItem);
        if (this.selectItem != null){
          this.selectedItemHeight = Number(selectedItem?.getAttribute("height"));
          this.selectedItemWidth = Number(selectedItem?.getAttribute("width"));
          this.changeDetection.detectChanges();

        }
      }
        else{
          selectedItem?.setAttribute("style", "stroke:rgb(0,0,0);stroke-width:5");

        }
      
      this.selectedItemId = "default";
      this.selectedItemId = itemId;
      document.getElementById(itemId)?.setAttribute("style", "stroke:rgb(255,255,255);stroke-width:5;");
    if (this.selectedItemId == "default") {
      this.selectedItemId = itemId;
      document.getElementById(itemId)?.setAttribute("style", "stroke:rgb(255,255,255);stroke-width:5");
    }

    this.updateSizes();
  }

  updateSizes()
  {
    this.selectedItemHeight = Number(document.getElementById(this.selectedItemId)?.getAttribute("height"));
    this.selectedItemWidth = Number(document.getElementById(this.selectedItemId)?.getAttribute("width"));
    this.changeDetection.detectChanges();
  }

  deleteItem() {
    if(this.selectedItemId != "default"){
      const deleteItem = document.getElementById(this.selectedItemId);
      if(deleteItem?.classList.contains("preMade")){
        if(deleteItem.classList.contains("desk")){
         const deskId = parseInt(this.selectedItemId.replace("desk-", ""));
         this.makerService.deleteDeskById(deskId).subscribe();
        }
        else if(deleteItem.classList.contains("wall")){
          const wallId = parseInt(this.selectedItemId.replace("wall-", ""));
          this.makerService.deleteWallById(wallId).subscribe();
        }
      }
      
      deleteItem?.remove();
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
    newMeetingRoom.setAttribute("fill", "rgb(50,80,175)");

    newMeetingRoom.setAttribute("isMeetingRoom", "true");
    newMeetingRoom.style.cursor = "pointer";

    newMeetingRoom.setAttribute("id", "meetingRoom-"+this.idCounterMeetingRoom.toString());
    newMeetingRoom.classList.add("new");
    newMeetingRoom.onclick = () => this.selectItem(newMeetingRoom.id);
    this.idCounterMeetingRoom++;

    svg?.appendChild(newMeetingRoom);
  }

  saveMap(){
    if (this.selectedRoom == -1) {
      this.openFailSnackBar("Please use the room selector in the top left corner");
    } 
    else if (this.selectedRoom == 0) {
      this.openRoomNameDialog();
      
    }
    else {
      this.saveMapItems();
     }
    }

  saveMapItems(){
    const map = document.querySelectorAll("svg#dropzone");
      map.forEach(node => {
        const officeObjects = node.children;
        Array.from(officeObjects).forEach(officeObj => {
          if (officeObj.classList.contains("new")){
            if(officeObj.nodeName == "rect"){
              const attrb = officeObj.attributes;
              const newRect = {} as Desk;
              newRect.LocationCol = Number(attrb.getNamedItem('x')?.value);
              newRect.LocationRow = Number(attrb.getNamedItem('y')?.value);
              newRect.Width = Number(attrb.getNamedItem('width')?.value);
              newRect.Height = Number(attrb.getNamedItem('height')?.value);
              newRect.isMeetingRoom = attrb.getNamedItem("isMeetingRoom")?.value ==='true';
              this.makerService.createDesk(this.selectedRoom, Math.round(newRect.LocationRow), Math.round(newRect.LocationCol), newRect.Height, newRect.Width, newRect.isMeetingRoom, 10).subscribe();
              } 
            else if(officeObj.nodeName == "line"){
              const attrb = officeObj.attributes;
              const newLine = {} as Wall;
              newLine.Pos1X = Number(attrb.getNamedItem('x1')?.value);
              newLine.Pos1Y = Number(attrb.getNamedItem('y1')?.value);
              newLine.Pos2X = Number(attrb.getNamedItem('x2')?.value);
              newLine.Pos2Y = Number(attrb.getNamedItem('y2')?.value);
              this.makerService.createWall(this.selectedRoom, Math.round(newLine.Pos1X), Math.round(newLine.Pos1Y), Math.round(newLine.Pos2X), Math.round(newLine.Pos2Y)).subscribe();
            }
          }

        })
      });
      this.openSuccessSnackBar("Map saved");
    }
    
    

  startDraw(){
    this.drawMode = !this.drawMode;
    this.editMode = false;
  }

  setEdit(){
    this.editMode = !this.editMode;
    this.drawMode = false;
  }

  startEdit(itemId: string){
        this.selectedItemId = itemId;
        this.openDialog(itemId);
  }

  getFacilitiesForDesk(deskId: number) {
    if (deskId != 0) 
    {
      this.bookingService.getFacilitiesByDeskId(deskId).subscribe(res => {
        this.facilityString = JSON.stringify(res);//converts response to string
        if (JSON.stringify(res) != "[]") {
          //split the parsed string to extract the varaiables we need
          const myArray = JSON.stringify(res).split(",");
          const id = myArray[0].split(":");
          const plugsString = myArray[2].split(":")[1];
          const monitorsString = myArray[3].split(":")[1];
          const projectorsString = myArray[4].split(":")[1].replace(/\D/g, '');
          //change the extracted strings into numbers
          // this.numPlugs = Number(plugsString);
          // this.numMonitors = Number(monitorsString);
          // this.numProjectors = Number(projectorsString);
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
  
  onChangeFloor(event: { value: any; })
  {
    this.selectedRoom = event.value;
    this.generateDesks();
  }

  getDesks(roomId: number) {
    this.allDesks = [];
    // allDesks
    for (let i=0; i< this.desks.length; i++) {
      if (this.desks[i].roomId == roomId) {
        this.allDesks.push(this.desks[i]);
      }
    }

    this.getDesksByRoomId(roomId); 
    this.getWallsByRoomId(roomId);
  }

  getDesksByRoomId(roomId: number) {
    // this.getRooms(this.currentUser.companyId);
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

        this.allDesks.push(newDesk);       //adds to desk array

        this.changeDetection.detectChanges();
      });
    })

  }

  getWallsByRoomId(roomId: number){
    this.bookingService.getWallsByRoomId(roomId).subscribe(res => {
      res.forEach(wall => {
        const newWall = {id: wall.id, roomId: wall.roomId, Pos1X: wall.Pos1X, Pos1Y: wall.Pos1Y, Pos2X: wall.Pos2X, Pos2Y: wall.Pos2Y}; 

        this.allWalls.push(newWall);

        this.changeDetection.detectChanges();
      });
    })

    this.getAllFacilities();
  }

  getRooms(coId: number) {
    this.bookingService.getRoomsByCompanyId(coId).subscribe(res => {
      res.forEach(room => {
        this.currentRooms.push(room);
      })
      this.getAllDesksOnAllFloors();
      this.getAllWallsOnAllFloors();
      // this.getDesksByRoomId(this.currentRooms[0].id); //gets all the desks for the current room
      this.changeDetection.detectChanges();
    })
  }

  openSizeChanger(){
    this.sizeChanger = !this.sizeChanger;
    
    if (this.sizeChanger) {
        document.getElementById('map')?.setAttribute("style", "width: 75% !important; ");

    }
    if (this.sizeChanger == false) {
      document.getElementById('map')?.setAttribute("style", "width: auto% !important; ");

      
    }

    this.updateSizes();


    
  }

  onSliderChangeHeight(event: any) {  
    if (this.selectedItemId != "default" )
    {
      document.getElementById(this.selectedItemId)?.setAttribute("height", event.value);
    }

    this.updateSizes();


  }

  onSliderChangeWidth(event: any) {
    if (this.selectedItemId != "default" )
    {
      document.getElementById(this.selectedItemId)?.setAttribute("width", event.value);
    }

    this.updateSizes();


  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }

  setNewDeskSize(){
    this.deskWidth = this.width;
    this.deskHeight = this.height;
    this.openSuccessSnackBar("Default Desk size set");
  }

  setNewRoomSize(){
    this.roomHeight = this.height;
    this.roomWidth = this.width;
    this.openSuccessSnackBar("Default Meeting Room size set");

  }

  flip(){
    const temp = this.selectedItemWidth;
    this.selectedItemWidth = this.selectedItemHeight;
    this.selectedItemHeight = temp;
    this.flipValueHeight(this.selectedItemHeight);
    this.flipValueWidth(this.selectedItemWidth);
  }

  

  flipValueHeight(newHeight: number) {
    if (this.selectedItemId != "default" )
    {
      document.getElementById(this.selectedItemId)?.setAttribute("height", newHeight.toString());
    }

  }

  flipValueWidth(newWidth: number) {
    if (this.selectedItemId != "default" )
    {
      document.getElementById(this.selectedItemId)?.setAttribute("width", newWidth.toString());
    }

  }

  moveToTheOtherSide(){

    this.right = !this.right;
    if (this.right) {
        document.getElementById('map')?.setAttribute("style", "width: 75% !important; ");
    }
    else if (!this.right) {
      document.getElementById('map')?.setAttribute("style", "width: 75% !important; float: right;");
    }

  

    this.updateSizes();


    
  }



  openDialog(deskId: string): void {    
    
    // this.desks.find(d => d.id == x)?.numPlugs
    this.changeDetection.detectChanges();
    const splitId = deskId.split("-", 2);
    const id = Number(splitId[1]);
    for (let i=0; i<this.facilities.length; i++) {
  
      if (this.facilities[i].deskId == id) {
        this.numPlugs = this.facilities[i].plugs;
        this.numMonitors = this.facilities[i].monitors;
        this.numProjectors = this.facilities[i].projectors;
        console.log("should be 2: " + this.numPlugs)
      }
      else
      {
        this.numPlugs = 0;
        this.numMonitors = 0;
        this.numProjectors = 0;
      }
    }

    
      const dialogRef = this.dialog.open(EditDialogComponent, {
        width: '550px',
        data: { numPlugs: this.numPlugs, 
                numMonitors: this.numMonitors, 
                numProjectors: this.numProjectors, 
                deskId: id, 
              }
              
            });


      dialogRef.afterClosed().subscribe(result => {
        let success = false;
        if (result){
          this.numPlugs = result.numPlugs;
          this.numMonitors = result.numMonitors;
          this.numProjectors = result.numProjectors;
          this.deskId = result.deskId;
          for (let i = 0; i<this.facilities.length; i++)
          {
            console.log(this.facilities[i])
            if (this.facilities[i].deskId  == this.deskId)
            {
              this.bookingService.updateFacilities(this.deskId, this.numPlugs, this.numMonitors, this.numProjectors).subscribe(res => {
                if (res) {
                      this.facilities[i].plugs = this.numPlugs;
                      this.facilities[i].monitors = this.numMonitors;
                      this.facilities[i].projectors = this.numProjectors;
                    success = true;
                    console.log(success);
                    this.openSuccessSnackBar("Successfully updated facilties");
                  
                  this.changeDetection.detectChanges();
                }
                else {
                  this.openFailSnackBar("There was an error updating the facilities");
                }
              });

            }
          } 
          console.log(success);
          if (success == false) //if this desk does not have a facilities object
          {
            this.bookingService.createFacilities(this.deskId, this.numPlugs, this.numMonitors, this.numProjectors).subscribe(res => {
              if (res) {
                this.facilities.push(res);
                this.openSuccessSnackBar("Successfully updated facilties");

              }
            });
          }
          
          
        } 

        
        //
      });

    }

  openRoomNameDialog(): void {
      this.changeDetection.detectChanges();
    
    const dialogRef = this.dialog.open(NewFloorDialogComponent, {
      width: '550px',
      data: { 
            }
            
          });


    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.newFloorName = result.newFloorName;
        this.makerService.createRoom(this.newFloorName, this.currentUser.companyId.toString()).subscribe(result => {
          this.currentRooms.push(result);
          this.selectedRoom = result.id;
          this.saveMapItems();
      }); 
      } else {
        this.newFloorName = "error";
      }
      this.changeDetection.detectChanges();
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


}
