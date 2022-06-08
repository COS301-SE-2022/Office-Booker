import { ChangeDetectorRef } from '@angular/core';
import { Component } from '@angular/core';
import { BookingServiceService, Desk, Booking, employee} from '../../services/booking-service.service';
import { CognitoService } from '../../cognito.service';

@Component({
  selector: 'office-booker-map-bookings',
  templateUrl: './map-bookings.component.html',
  styleUrls: ['./map-bookings.component.css'],
})
export class MapBookingsComponent{
  desks: Array<Desk> = [];
  roomId = 1;
  selected = false;
  selectedItemName = "";
  selectedItemType = "";
  selectedItemId: number;
  selectedItemFacilities = [];
  selectedItemBookings: Array<Booking> = [];

  grabbedStartDate = "";
  grabbedEndDate = "";

  currentUser: employee = {id:-1, email:"null", name: "null", companyId:-1, admin: false};

  constructor(private bookingService: BookingServiceService, private changeDetection: ChangeDetectorRef,
              private cognitoService: CognitoService) { 
    changeDetection.detach();
    this.selectedItemId = 0;
  }
  ngOnInit() {
    this.getDesksByRoomId(1);
    this.getCurrentUser();

    this.changeDetection.detectChanges();
  }

  getDesksByRoomId(roomId: number){
    this.bookingService.getDesksByRoomId(roomId).subscribe(res => {
      res.forEach(desk => {
        const newDesk = {} as Desk;
        newDesk.id = desk.id;
        newDesk.LocationCol = desk.LocationCol;
        newDesk.LocationRow = desk.LocationRow;
        newDesk.roomId = desk.roomId;
        newDesk.bookings = [];
        this.getBookingsByDeskId(desk.id);

        this.desks.push(newDesk);
        
        this.changeDetection.detectChanges();
      });
    })
    
  }

  getBookingsByDeskId(deskId: number) {
    let bookingReturn = false;
    this.bookingService.getBookingsByDeskId(deskId).subscribe(res => {
      res.forEach(booking => {
        if(booking){
          bookingReturn = true;
        }
        for(let i = 0; i < this.desks.length; i++)
        {
          if(this.desks[i].id == deskId){
            this.desks[i].booking = bookingReturn;
            this.desks[i].bookings.push(booking);
          }
        }
      this.changeDetection.detectChanges();
      });
    })
  }

  selectToBook(itemId: number, itemType: string){
    this.selectedItemBookings = [];
    this.selected = true;
    this.selectedItemName = itemType + " " + itemId.toString();
    this.selectedItemId = itemId;
    this.selectedItemType = itemType;
    this.desks.forEach(desk => {
      if(desk.id == itemId){
        this.selectedItemBookings = desk.bookings;
      }
    })
    this.changeDetection.detectChanges();
  }

  filterBookings(){
    if(this.grabbedStartDate !="" && this.grabbedEndDate ==""){
      this.desks.forEach(desk => {
        if(desk.booking){
          desk.booking = false;
          for(let i = 0; i < desk.bookings.length; i++){
            if(desk.bookings[i].endsAt > this.grabbedStartDate){
              desk.booking = true;
            }
          }
        }
        if(!desk.booking){
          for(let i = 0; i < desk.bookings.length; i++){
            if(desk.bookings[i].endsAt > this.grabbedStartDate){
              desk.booking = true;
            }
          }
        }
        this.changeDetection.detectChanges();
      })
    }
    else if(this.grabbedEndDate !="" && this.grabbedStartDate ==""){
      this.desks.forEach(desk => {
        if(desk.booking){
          desk.booking = false;
          for(let i = 0; i < desk.bookings.length; i++){
            if(desk.bookings[i].startsAt > this.grabbedEndDate){
              desk.booking = true;
            }
          }
          if(!desk.booking){
            for(let i = 0; i < desk.bookings.length; i++){
              if(desk.bookings[i].startsAt > this.grabbedEndDate){
                desk.booking = true;
              }
            }
          }
        }
        this.changeDetection.detectChanges();
      })
    }
    else if (this.grabbedStartDate != "" && this.grabbedEndDate != ""){
      this.desks.forEach(desk => {
        if(desk.booking){
          desk.booking = false;
          for(let i = 0; i < desk.bookings.length; i++){
            if(desk.bookings[i].startsAt < this.grabbedStartDate && desk.bookings[i].endsAt > this.grabbedEndDate){
              desk.booking = true;
            }
          }
        }
        if(!desk.booking){
          for(let i = 0; i < desk.bookings.length; i++){
            if(desk.bookings[i].startsAt < this.grabbedEndDate && desk.bookings[i].endsAt > this.grabbedStartDate){
              desk.booking = true;
            }
          }
        }
        this.changeDetection.detectChanges();
      })
    }
  }

  bookItem(itemId: number, itemType: string){
    if(this.grabbedStartDate != "" && this.grabbedEndDate != "")
    {
      const splitTimeDateStart = this.grabbedStartDate.split('-');
      const splitTimeDateEnd = this.grabbedEndDate.split('-');
  
      const newYearStart = Number(splitTimeDateStart[0]);
      const newMonthStart = Number(splitTimeDateStart[1]);
      const newYearEnd = Number(splitTimeDateEnd[0]);
      const newMonthEnd = Number(splitTimeDateEnd[1]);
  
      const splitDateAndSecStart = splitTimeDateStart[2].split('T');
      const splitTimeStart = splitDateAndSecStart[1].split(':');
      const splitDateAndSecEnd = splitTimeDateEnd[2].split('T');
      const splitTimeEnd = splitDateAndSecEnd[1].split(':');
  
      const newWholeDateStart = new Date(newYearStart, newMonthStart-1, Number(splitDateAndSecStart[0]), Number(splitTimeStart[0])+2, Number(splitTimeStart[1]));
      const newWholeDateEnd = new Date(newYearEnd, newMonthEnd-1, Number(splitDateAndSecEnd[0]), Number(splitTimeEnd[0])+2, Number(splitTimeEnd[1]));
      if(itemType == 'desk'){
        this.makeADeskBooking(itemId, newWholeDateStart, newWholeDateEnd);
      }
    }
    else{
      alert("No date chosen");
    }
    this.changeDetection.detectChanges();
  }

  makeADeskBooking(deskId: number, startDate: Date, endDate: Date) {
    const currentDesk = this.desks.filter((desk) => {
      return desk.id == deskId;
    });
    let bookingClash = false;
    currentDesk[0].bookings.forEach(booking => {
      const endDateCheck = new Date(booking.endsAt);
      const startDateCheck = new Date(booking.startsAt);
      if(endDateCheck > startDate && startDateCheck < startDate){
        bookingClash = true;
      }
      else if(startDateCheck < endDate && endDateCheck > endDate){
        bookingClash = true;
      }
      else if (startDate < startDateCheck && endDate > endDateCheck){
        bookingClash = true;
      }
    })

    if(!bookingClash){
      const startsAt = startDate.toISOString();
      const endsAt = endDate.toISOString();
      this.bookingService.createBooking(deskId, this.currentUser.id, startsAt, endsAt).subscribe(booking => {
        for(let i = 0; i < this.desks.length; i++){
          if(this.desks[i].id == deskId){
            this.desks[i].booking = true;
            this.desks[i].bookings.push(booking);
          }
        }
        this.changeDetection.detectChanges();
      });
    }
    else {
      alert("Can't overlap bookings");
    }
  }

  deleteBooking(itemId: number, itemType: string){
    if(itemType == 'desk'){
      this.deleteADeskBooking(itemId);
    }
    this.changeDetection.detectChanges();
  }

  deleteADeskBooking(bookingId: number) {
    this.bookingService.deleteBooking(bookingId).subscribe(res => {
      return res;
    });
    this.desks.forEach(desk => {
      for(let d = 0; d < desk.bookings.length; d++){
        if(desk.bookings[d].id == bookingId){
          desk.bookings.splice(d,1);
        }
        if(desk.bookings.length < 1){
          desk.booking = false;
        }
      }
    })
    
    this.changeDetection.detectChanges();
  }

getCurrentUser(){
  const userData = JSON.stringify(localStorage.getItem("CognitoIdentityServiceProvider.4fq13t0k4n7rrpuvjk6tua951c.LastAuthUser"));
  this.bookingService.getEmployeeByEmail(userData.replace(/['"]+/g, '')).subscribe(res => {
      this.currentUser = res;
      this.changeDetection.detectChanges();    
  }) 
}
}