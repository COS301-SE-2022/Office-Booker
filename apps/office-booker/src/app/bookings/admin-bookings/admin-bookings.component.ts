import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card'
import { BookingServiceService, Room, Desk, Booking, employee} from '../../services/booking-service.service';

@Component({
  selector: 'office-booker-admin-bookings',
  templateUrl: './admin-bookings.component.html',
  styleUrls: ['./admin-bookings.component.css'],
})
export class AdminBookingsComponent{
  desks: Array<Desk> = [];
  userBookings: Array<Booking> = [];
  Users: Array<employee> = [];
  employeeName = "";
  userNumb = -1;
  currentUser: employee = {id:-1, email:"null", name: "null", companyId:-1};
  
  constructor(private router: Router, private bookingService: BookingServiceService, private changeDetection: ChangeDetectorRef) {
    changeDetection.detach();
    //console.log(this.userBookings);
  }

  ngOnInit(){
    this.getDesksByRoomId(1);
    this.getCurrentUser();
  }

  getUsers(){
    this.bookingService.getAllEmployees().subscribe( res => {
      res.forEach(user => {
        this.Users.push(user);
        this.changeDetection.detectChanges();
        if(this.Users.length == 3){
        this.getCurrentUser();
        this.changeDetection.detectChanges();
        }
      });
    })
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
    
    this.bookingService.getBookingsByDeskId(this.currentUser.id).subscribe(res => {
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

  getBookings(userId: number){

    this.bookingService.getBookingByEmployee(userId).subscribe(res => {
       res.forEach(booking => {
         console.log(booking);
         const newBooking = {} as Booking;
         newBooking.id = booking.id;
         newBooking.deskId = booking.deskId;
         newBooking.startsAt = booking.startsAt;
         newBooking.endsAt = booking.endsAt;
         newBooking.employeeId = booking.employeeId;
         this.userBookings.push(newBooking);
         this.changeDetection.detectChanges();
        });
        this.changeDetection.detectChanges();
      })   
 }


 getCurrentUser(){
   const userData = JSON.stringify(localStorage.getItem("CognitoIdentityServiceProvider.4fq13t0k4n7rrpuvjk6tua951c.LastAuthUser"));
   this.bookingService.getEmployeeByEmail(userData.replace(/['"]+/g, '')).subscribe(res => {
      console.log(res);
      this.currentUser = res;
      //console.log(this.currentUser.id);
      this.userNumb = this.currentUser.id;
      this.getBookings(this.currentUser.id);
      this.changeDetection.detectChanges();
      
   }) 
}

//  getUsers(){
//   this.bookingService.getAllEmployees().subscribe(res => {
//     res.forEach(user => {
//       const newUser = {} as employee;
//       newUser.id = user.id;
//       newUser.name = user.name;
//       newUser.email = user.email;
//       newUser.companyId = user.companyId;
//       this.Users.push(newUser);
//     });
//   })
// }

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
