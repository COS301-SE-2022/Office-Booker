import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card'
import { BookingServiceService, Room, Desk, Booking} from '../../services/booking-service.service';

@Component({
  selector: 'office-booker-personal-bookings',
  templateUrl: './personal-bookings.component.html',
  styleUrls: ['./personal-bookings.component.css'],
})

export class PersonalBookingsComponent implements OnInit {
  desks: Array<Desk> = [];
  userBookings: Array<Booking> = [];
  employeeName = "";


  constructor(private router: Router, private bookingService: BookingServiceService) {
    
    //console.log(this.userBookings);
  }

  ngOnInit(){
    this.getDesksByRoomId(1);
    this.getBookings(1);
    // this.employeeName = this.getEmployee(1);
  }

  // getEmployee(userId: number){
  //   this.bookingService.getEmployeeByEmployeeId(userId).subscribe(res => {
  //     console.log(res);
  //     res.forEach(employee=> {

  //     });
  //   })
  // }

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
      });
    })
  }

  getBookings(userId: number){

    this.bookingService.getBookingByEmployee(userId).subscribe(res => {
       console.log(res);
       res.forEach(booking => {
         console.log(booking);
         const newBooking = {} as Booking;
         newBooking.id = booking.id;
         newBooking.deskId = booking.deskId;
         newBooking.startsAt = booking.startsAt;
         newBooking.endsAt = booking.endsAt;
         newBooking.employeeId = booking.employeeId;
         this.userBookings.push(newBooking);
        });
      })

      
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
    }
  })
  
}



}
