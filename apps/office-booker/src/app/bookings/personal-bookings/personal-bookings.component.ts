import { ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card'
import { BookingServiceService, Room, Desk, Booking, employee} from '../../services/booking-service.service';

@Component({
  selector: 'office-booker-personal-bookings',
  templateUrl: './personal-bookings.component.html',
  styleUrls: ['./personal-bookings.component.css'],
})

export class PersonalBookingsComponent implements OnInit {
  desks: Array<Desk> = [];
  userBookings: Array<Booking> = [];
  Users: Array<employee> = [];
  employeeName = "";
  userNumb = -1;

  constructor(private router: Router, private bookingService: BookingServiceService, private changeDetection: ChangeDetectorRef) {
    changeDetection.detach();
    //console.log(this.userBookings);
  }

  ngOnInit(){
    this.getDesksByRoomId(1);
    
    //this.getCurrentUser();
    
    // this.changeDetection.detectChanges();
    // this.getCurrentUser();
    // this.getBookings(this.userNumb);
  }

  getDisplay(){
    this.getCurrentUser();
  }

  getUsers(){
    this.bookingService.getAllEmployees().subscribe( res => {
      res.forEach(user => {
        this.Users.push(user);
        this.changeDetection.detectChanges();
        if(this.Users.length == 3){
        this.getCurrentUser();

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
   const userData = JSON.stringify( localStorage.getItem("CognitoIdentityServiceProvider.4fq13t0k4n7rrpuvjk6tua951c.LastAuthUser"));
   console.log(userData);
   this.bookingService.getEmployeeByEmail("u20538945@tuks.co.za").subscribe(res => {
      console.log(res);
      const newUser = {} as employee;
      newUser.name = res[0].name;
      newUser.id = res[0].id;
      newUser.email = res[0].email;
      newUser.companyId = res[0].companyId;
      this.Users.push(newUser);
      this.userNumb = newUser.id;
      this.employeeName = newUser.name;
      this.changeDetection.detectChanges();
      this.getBookings(this.userNumb);
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
