import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookingServiceService, employee, company } from '../../services/booking-service.service';

import { IUser, CognitoService } from '../../cognito.service';

@Component({
  selector: 'office-booker-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css'],
})
export class GuestComponent /*implements OnInit*/ {
  loading: boolean;
  isConfirm: boolean;
  user: IUser;
  userId: string;
  userName: string;
  companyId: number;
  companies: Array<company> = [];
  option: string;
  currentUser: employee = { id: -1, email: "null", name: "null", companyId: -1, admin: false, guest: false };
  constructor(
    private router: Router,
    private cognitoService: CognitoService,
    private bookingService: BookingServiceService,
  ) {
    this.loading = false;
    this.isConfirm = false;
    this.user = {} as IUser;
    this.userId = '';
    this.userName = '';
    this.companyId = 1;
    this.option = '';
  }

  /*ngOnInit() {
    this.getCompanies();
  }*/

  /*getCompanies(){
    this.bookingService.getCompanies().subscribe( res => {
      res.forEach(comp=> {
        const newComp = {} as company;
        newComp.id = comp.id;
        newComp.name = comp.name;
        this.companies.push(newComp);
        //this.changeDetection.detectChanges();
      
      });
    })
  }*/

  public signUp(): void {

    this.option = 'Guest';
    if (this.option == '') {
      alert('Please select a company')

    }
    else {
      this.bookingService.getEmployeeByEmail(this.user.email).subscribe(res => {
        this.currentUser = res;
        if (res == null) {
          alert('You have not been invited');
        } else {
          this.loading = true;
          this.cognitoService.signUp(this.user)
  
  
            .then(() => {
  
              this.loading = false;
              this.isConfirm = true;
  
            }).catch((e) => {
              alert(e)
              this.loading = false;
            });
        }
      })
    }

  }

  public confirmSignUp(): void {
    this.loading = true;
    this.cognitoService.confirmSignUp(this.user)
      .then(() => {

        this.userId = this.user.email
        this.userName = this.user.name

        /*this.bookingService.createUser(this.userName, this.companyId, this.userId, true).subscribe(res => {
          return res;
         
        });*/


      });
    this.router.navigate(['/login']);

    this.loading = false;
    this.router.navigate(['/login'])
  }
}
