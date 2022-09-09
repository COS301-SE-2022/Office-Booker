import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IUser, CognitoService } from '../../cognito.service';
import { BookingServiceService, Room, Desk, Booking, employee, Invite, rating } from '../../services/booking-service.service';


@Component({
  selector: 'office-booker-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent {
  user: IUser;
  currentUser: employee = { id: -1, email: "null", name: "null", companyId: -1, admin: false, guest: false, currentRating: 0, ratingsReceived: 0 };
  userNumb = -1;
  newRating: rating = { currentRating: -1, ratingsReceived: -1 };
  rating = 0;
  code = "";
  newPassword = "";
  loading = false;

  isConfirm = false;
  changePassword = false;
  changeName = false;


  constructor(private cognitoService: CognitoService,
              private bookingService: BookingServiceService,
              private changeDetection: ChangeDetectorRef) {

    this.user = {} as IUser;
  }

  ngOnInit(): void {
    this.getCurrentUser();

  }

  getCurrentUser() {
    const userData = JSON.stringify(localStorage.getItem("CognitoIdentityServiceProvider.4fq13t0k4n7rrpuvjk6tua951c.LastAuthUser"));
    this.bookingService.getEmployeeByEmail(userData.replace(/['"]+/g, '')).subscribe(res => {
      this.currentUser = res;
      this.userNumb = this.currentUser.id;
      this.getRating();
      this.changeDetection.detectChanges();


    })
  }

  getRating() {
    this.bookingService.getRatings(this.currentUser.id).subscribe(res => {
      this.newRating = res;
      this.rating = this.newRating.currentRating / (this.newRating.ratingsReceived);
      this.changeDetection.detectChanges();
    });
  }

  public setNgIf(setIf : string): void {
    if(setIf == "changePassword"){
      this.changeName = false;
      this.changePassword = true;
      this.isConfirm = false;

    }
    else if(setIf == "changeName"){
      this.changePassword = false;
      this.changeName = true;
      this.isConfirm = false;
      
    }
  }

  

  public forgotPassword(): void {
    this.cognitoService.resetPassword(this.user.email);
    this.changePassword = false;
    this.isConfirm = true;
    
  }

  public submitPasswordReset(): void {
    this.cognitoService.submitPasswordReset(this.user.email, this.code, this.user.password);
    
  }

  public editName(): void {
    //;
  }

}
