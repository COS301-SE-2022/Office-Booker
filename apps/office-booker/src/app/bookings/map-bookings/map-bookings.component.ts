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

  //map based variables
  desks: Array<Desk> = [];
  roomId = 1;

  //variables for the selected section
  selected = false;
  selectedItemName = "";
  selectedItemType = "";
  selectedItemId: number;
  selectedItemFacilities = [];
  selectedItemBookings: Array<Booking> = [];

  //multi select variables
  multiSelectedItemId: Array<number> = [];
  multiSelectedItemBookingsArr: Array<Array<Booking>> = []

  //date variables for date time picker
  grabbedStartDate = "";
  grabbedEndDate = "";

  //user to have user id and rest if necessary
  currentUser: employee = {id:-1, email:"null", name: "null", companyId:-1, admin: false};

  constructor(private bookingService: BookingServiceService, private changeDetection: ChangeDetectorRef,
              private cognitoService: CognitoService) {       
    changeDetection.detach();
    this.selectedItemId = 0;
  }
  ngOnInit() {
    this.getDesksByRoomId(1);       //gets all the desks for the current room
    this.getCurrentUser();          //fetches the logged in user

    this.changeDetection.detectChanges();
  }

  getDesksByRoomId(roomId: number){
    this.bookingService.getDesksByRoomId(roomId).subscribe(res => { 
      res.forEach(desk => {
        const newDesk = {} as Desk;       //new desk object to hold a new and possibly empty variable
        newDesk.id = desk.id;             //assigns each property individually
        newDesk.LocationCol = desk.LocationCol;
        newDesk.LocationRow = desk.LocationRow;
        newDesk.roomId = desk.roomId;
        newDesk.bookings = [];            //the potentially empty variable needs to be instantiated
        this.getBookingsByDeskId(desk.id);      //makes the call for the bookings for the desk for the above variable

        this.desks.push(newDesk);       //adds to desk array
        
        this.changeDetection.detectChanges();
      });
    })
    
  }

  getBookingsByDeskId(deskId: number) {
    let bookingReturn = false;        //instantiates a boolean to be false to be used in whether bookings exist on the desk or not
    this.bookingService.getBookingsByDeskId(deskId).subscribe(res => {
      res.forEach(booking => {        //if call returns a booking array, need to go through each booking to add to desk array bookings
        if(booking){      //if a booking exists at all even one, change the boolean to true
          bookingReturn = true;
        }
        for(let i = 0; i < this.desks.length; i++)      //loop through each desk in the array to make sure you find the correct desk
        {
          if(this.desks[i].id == deskId){       //find correct desk using the id of the desk
            this.desks[i].booking = bookingReturn;        //assigns the boolean to the desk of specific id (if there were no bookings the booking is false)
            this.desks[i].bookings.push(booking);       //pushes each booking received on to the correct desk bookings array
            this.desks[i].bookings = this.desks[i].bookings.sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime());
          }
        }
      this.changeDetection.detectChanges();
      });
    })
  }

  selectToBook(itemId: number, itemType: string){       //used to find the info for the selected desk
    this.selectedItemBookings = [];   
    this.selected = true;         //changes so that the div can be displayed only once something has been selected
    this.selectedItemName = itemType + " " + itemId.toString();       //cosmetic for displaying in the selected div
    this.selectedItemId = itemId;           //needed for when making bookings and canceling bookings and displaying bookings
    this.selectedItemType = itemType;     //will be necessary once meeting rooms have been included
    this.desks.forEach(desk => {        
      if(desk.id == itemId){
        this.selectedItemBookings = desk.bookings;        //used to grab the correct bookings for the correct selected desk
        //this.selectedItemBookings = this.selectedItemBookings.sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime());    //sorts display bookings in ascending order (earliest first)
      }
    })

    if(this.multiSelectedItemId.length < 5){      //limits compaarison to 5
      if(!(this.multiSelectedItemId.includes(itemId))){     //checks id doesnt already exist in the array
        this.multiSelectedItemId.push(itemId);        //adds the id to the selection array
      }
    }
this.multiSelectedItemBookingsArr = [];       //avoids the doubling up of already added items, by clearing the array first
    this.multiSelectedItemId.forEach(id => {
      this.desks.forEach(desk => {          //loops through each id and each desk
        if(desk.id == id){              //to match id's for pushing the bookings on to the array
          this.multiSelectedItemBookingsArr.push(desk.bookings);
        }
      })
    })
console.log(this.desks[8]);
console.log(this.multiSelectedItemBookingsArr);
    this.changeDetection.detectChanges();
  }

  filterBookings(){         //filters the bookings based on the selected date
    if(this.grabbedStartDate !="" && this.grabbedEndDate ==""){       // if start date is selected but no end date it checks everything after the start date
      this.desks.forEach(desk => {
        if(desk.booking){
          desk.booking = false;         //sets to false so that if a booking exists in the newly filtered time then it gets changed back to true
          for(let i = 0; i < desk.bookings.length; i++){
            if(desk.bookings[i].endsAt > this.grabbedStartDate){        //if the end date of the booking is after the start date of the filter
              desk.booking = true;
            }
          }
        }
        if(!desk.booking){            //repeated for when the filter has been used and no bookings were in that range, it needs to recheck again
          for(let i = 0; i < desk.bookings.length; i++){
            if(desk.bookings[i].endsAt > this.grabbedStartDate){
              desk.booking = true;
            }
          }
        }
        this.changeDetection.detectChanges();
      })
    }
    else if(this.grabbedEndDate !="" && this.grabbedStartDate ==""){        //used when the end date is chosen for a filter but start date is not, checks if bookings prior to a date
      this.desks.forEach(desk => {
        if(desk.booking){
          desk.booking = false;                 //sets to false so that if a booking exists in the newly filtered time then it gets changed back to true
          for(let i = 0; i < desk.bookings.length; i++){
            if(desk.bookings[i].startsAt < this.grabbedEndDate){            //if the start date of the booking is before the end date of the filter ie it starts before the end date therefore there is a booking
              desk.booking = true;
            }
          }
          if(!desk.booking){            //repeated for when the filter has been used and no bookings were in that range, it needs to recheck again
            for(let i = 0; i < desk.bookings.length; i++){
              if(desk.bookings[i].startsAt < this.grabbedEndDate){
                desk.booking = true;
              }
            }
          }
        }
        this.changeDetection.detectChanges();
      })
    }
    else if (this.grabbedStartDate != "" && this.grabbedEndDate != ""){       //used when both start and end are selected
      this.desks.forEach(desk => {
        if(desk.booking){
          desk.booking = false;         //sets to false so that if a booking exists in the newly filtered time then it gets changed back to true
          for(let i = 0; i < desk.bookings.length; i++){
            if(desk.bookings[i].startsAt < this.grabbedStartDate && desk.bookings[i].endsAt > this.grabbedEndDate){     //if start of booking is before start of filter and end of booking is after end of filter
              desk.booking = true;
            }
          }
        }
        if(!desk.booking){             //repeated for when the filter has been used and no bookings were in that range, it needs to recheck again
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

  bookItem(itemId: number, itemType: string){         //used when the booked button is clicked
    if(this.grabbedStartDate != "" && this.grabbedEndDate != "")      //makes sure dates are selected
    {
      const splitTimeDateStart = this.grabbedStartDate.split('-');        //string is grabbed from the input and needs to be separated to create date object (splits the year from month and date)
      const splitTimeDateEnd = this.grabbedEndDate.split('-');        //same as above but this is the end date and the above is the start
  
      const newYearStart = Number(splitTimeDateStart[0]);       //first item in the split is the year   and needs to be number for the new date
      const newMonthStart = Number(splitTimeDateStart[1]);      //second item in the split is the month  and needs to be number for the new date
      const newYearEnd = Number(splitTimeDateEnd[0]);             //same as above but for the end date as the above is the start
      const newMonthEnd = Number(splitTimeDateEnd[1]);  
  
      const splitDateAndSecStart = splitTimeDateStart[2].split('T');        //third item in the split needs to be further split as the string contains the date as well as the time
      const splitTimeStart = splitDateAndSecStart[1].split(':');            //second item in the new split needs to be split as the hours and minutes need to be split
      const splitDateAndSecEnd = splitTimeDateEnd[2].split('T');          //same as above but for the end date as the above is the start
      const splitTimeEnd = splitDateAndSecEnd[1].split(':');
  
      const newWholeDateStart = new Date(newYearStart, newMonthStart-1, Number(splitDateAndSecStart[0]), Number(splitTimeStart[0])+2, Number(splitTimeStart[1]));     //uses the variable from above in (year, month -1 as the number is incorrect when using input, date from the first index in the second split and converted to number, second split first item is the hour plus two *something UTC related*, and second item is minutes (both converted to numbers) )
      const newWholeDateEnd = new Date(newYearEnd, newMonthEnd-1, Number(splitDateAndSecEnd[0]), Number(splitTimeEnd[0])+2, Number(splitTimeEnd[1]));
      if(itemType == 'desk'){       //needed once meeting rooms included
        this.makeADeskBooking(itemId, newWholeDateStart, newWholeDateEnd);        //calls booking that uses api
      }
    }
    else{       //when no date was chosen
      alert("No date chosen");
    }
    this.changeDetection.detectChanges();
  }

  makeADeskBooking(deskId: number, startDate: Date, endDate: Date) {
    const currentDesk = this.desks.filter((desk) => {       //grabs the desk matching the correct id
      return desk.id == deskId;
    });
    let bookingClash = false;         //boolean for if a clash in bookings exist
    currentDesk[0].bookings.forEach(booking => {        //goes through all the bookings for the currently selected desk
      const endDateCheck = new Date(booking.endsAt);      //conversions needed for comparison
      const startDateCheck = new Date(booking.startsAt);
      if(endDateCheck >= startDate && startDateCheck <= startDate){       //if the booking end date is greater than the start of the attempted start booking date and start date of booking is less than the attempted start booking date
        bookingClash = true;                                            //ie if the attempted booking date starts before the end of a booking but after the start of the same booking
      }
      else if(startDateCheck <= endDate && endDateCheck >= endDate){      //if the booking start date is less than the end of the attempted end booking date and the end date is greater than the end of the attempted end booking date
        bookingClash = true;                                            //ie if the attempted booking date ends after the start of a booking but before the end of the same booking 
      }
      else if (startDate <= startDateCheck && endDate >= endDateCheck){     // if the start of the attempted start booking date is less than the start date of the booking and the end of attempted booking end date is greater than the end date of the booking
        bookingClash = true;                                               //ie when the start of the attempted booking date is before the start of an existing booking and the end of the attempted booking date is after end date the of the same existing booking
      }
    })

    if(!bookingClash){        //if there are no clashes from above
      const startsAt = startDate.toISOString();   //needs to be converted to be passed to the api
      const endsAt = endDate.toISOString();
      this.bookingService.createBooking(deskId, this.currentUser.id, startsAt, endsAt).subscribe(booking => {     //creates a booking with API
        for(let i = 0; i < this.desks.length; i++){
          if(this.desks[i].id == deskId){       //at the same time it needs to go through all the desks to find the correct desk matching with id
            this.desks[i].booking = true;       //makes sure the booking boolean is true if there existed non before
            this.desks[i].bookings.push(booking);     //to add the new booking to the array for the desk
          }
        }
        this.changeDetection.detectChanges();
      });
    }
    else {        //if clash alert
      alert("Can't overlap bookings");
    }
  }

  deleteBooking(itemId: number, itemType: string){        //function when delete booking is called from a button
    if(itemType == 'desk'){
      this.deleteADeskBooking(itemId);        //calls the function with the api function
    }
    this.changeDetection.detectChanges();
  }

  deleteADeskBooking(bookingId: number) {         //does the api call in the function
    this.bookingService.deleteBooking(bookingId).subscribe(res => {     //deletes the booking
      return res;
    });
    this.desks.forEach(desk => {        //goes through desk to get the matching desk with id
      for(let d = 0; d < desk.bookings.length; d++){
        if(desk.bookings[d].id == bookingId){
          desk.bookings.splice(d,1);        //when found removes the booking from the bookings array for the correct desk
        }
        if(desk.bookings.length < 1){       //if the booking array is empty boolean needs to be set to false
          desk.booking = false;
        }
      }
    })
    
    this.changeDetection.detectChanges();
  }

getCurrentUser(){             //used to get the current logged in user for using the userId, and potentially other information at a later date
  const userData = JSON.stringify(localStorage.getItem("CognitoIdentityServiceProvider.4fq13t0k4n7rrpuvjk6tua951c.LastAuthUser"));
  this.bookingService.getEmployeeByEmail(userData.replace(/['"]+/g, '')).subscribe(res => {
      this.currentUser = res;
      this.changeDetection.detectChanges();    
  }) 
}
}