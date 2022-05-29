import { Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'office-booker-personal-bookings',
  templateUrl: './personal-bookings.component.html',
  styleUrls: ['./personal-bookings.component.css'],
})
export class PersonalBookingsComponent{

  userBookings: object[] = [];

  constructor(private router: Router,) {
    this.userBookings = this.getBookings();
    console.log(this.userBookings);
  }

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