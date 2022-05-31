import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card'
import { BookingCardComponent } from './booking-card/booking-card.component';

@Component({
  selector: 'office-booker-personal-bookings',
  templateUrl: './personal-bookings.component.html',
  styleUrls: ['./personal-bookings.component.css'],
})

export class PersonalBookingsComponent implements OnInit {

  
  userBookings: { startDate: Date; endDate: Date; roomName: string; employee: string; desk: string; }[] = [];
  // startDate: Date[] = [];
  // endDate: Date[] = [];
  // roomName: string[] = [];
  // employee: string[] = [];
  // desk: string[] = [];

  constructor(private router: Router,) {
    
    console.log(this.userBookings);
  }

  ngOnInit(){
    this.userBookings = this.getBookings();

  }

  // getStartDate(){
  //   return [{
  //     Date(2018, 11, 24, 8, 33, 30, 0),  
  //   }]
  // }

  // getEndDate(){

  // }
  // getRoomName(){

  // }

  // getEmployeeName(){

  // }

  // getDesk(){

  // }

  getBookings(){
    return [{
      startDate: new Date(2018, 11, 24, 8, 33, 30, 0), 
      endDate: new Date(2018, 11, 24, 10, 33, 30, 0),
      roomName: "Room1",
      employee: 'Bob',
      desk: 'B2',
    }, 

    {
      startDate: new Date(2018, 11, 24, 8, 33, 30, 0), 
      endDate: new Date(2018, 11, 24, 12, 33, 30, 0),
      roomName: "Room2",
      employee: 'Bob',
      desk: 'A2',
    }, 

    {
      startDate: new Date(2018, 11, 24, 8, 33, 30, 0), 
      endDate: new Date(2018, 11, 24, 9, 33, 30, 0),
      roomName: "Room3",
      employee: 'Bob',
      desk: 'C3',
    }, ]
  }



}