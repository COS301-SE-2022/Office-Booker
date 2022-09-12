import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookingServiceService, employee, company} from '../../services/booking-service.service';

import { IUser, CognitoService } from '../../cognito.service';

@Component({
  selector: 'office-booker-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {

  loading: boolean;
  isConfirm: boolean;
  user: IUser;
  userId : string;
  userName : string;
  userDomain : string;
  company : string;
  companyId : number;
  companyDomain : string;
  companies: Array<company> = [];
  option: string;
  selected : string;

  constructor(private router: Router,
    private cognitoService: CognitoService, 
    private bookingService: BookingServiceService,
    ) {
  this.loading = false;
  this.isConfirm = false;
  this.user = {} as IUser;
  this.userId = '';
  this.userName = '';
  this.userDomain = '';
  this.company = '';
  this.companyId = -1;
  this.companyDomain = '';
  this.option = '';
  this.selected = '';
}

ngOnInit(){
  this.getCompanies();
}


//function to get the list of companies
getCompanies(){
  this.bookingService.getCompanies().subscribe( res => {
    res.forEach(comp=> {
      const newComp = {} as company;
      newComp.id = comp.id;
      newComp.name = comp.name;
      newComp.domain = comp.domain
      this.companies.push(newComp);
      //this.changeDetection.detectChanges();
    
    });
  })
}

//function to sign the user up using cognito services
public signUp(company: string): void {
  this.company = company;
  this.userDomain = this.user.email.split('@')[1];
  console.log(this.userDomain);
  if (this.company == ''){ //checks if the user did not select a company
    alert('Please select a company')
    
  }
  else {

    for (let i = 0; i < this.companies.length; i++) {
      if (this.companies[i].name == this.company){
        this.companyId = this.companies[i].id;
      }
    }

    for (let i = 0; i<this.companies.length; i++){
      if (this.companies[i].id == this.companyId){
        this.companyDomain = this.companies[i].domain;
      }
    }

    if (this.companyDomain == this.userDomain){
      this.loading = true;
      this.cognitoService.signUp(this.user)
      .then(() => {
    
      this.loading = false;
      this.isConfirm = true;
      this.option = company;
      console.log(this.option)
        for(let i = 0; i < this.companies.length; i++)
            {
              if(this.companies[i].name == this.option){
              this.companyId = this.companies[i].id;
              }
            }

      }).catch((e) => {
        alert(e)
      this.loading = false;
      });
      }
      else {
        alert('Your email domain "' + this.userDomain + '" does not match the company domain "' + this.companyDomain + '"');
      }
  }
  
}

// confirms sign up using cognito services and once successful, creates a user for the local database
public confirmSignUp(): void {
  this.loading = true;
  this.cognitoService.confirmSignUp(this.user)
  .then(() => {
    
    this.userId = this.user.email
    this.userName = this.user.name
    console.log(this.userName);
    this.bookingService.createUser(this.userName, this.companyId, this.userId, false).subscribe(res => {
      return res;
     
    });
    
      
    });
  this.router.navigate(['/login']);

  this.loading = false;
  this.router.navigate(['/login'])
}

}