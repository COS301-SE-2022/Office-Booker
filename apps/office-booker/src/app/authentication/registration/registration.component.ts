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
  companyId : number;
  companies: Array<company> = [];
  option: string;

  constructor(private router: Router,
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
      this.companies.push(newComp);
      //this.changeDetection.detectChanges();
    
    });
  })
}

//function to sign the user up using cognito services
public signUp(): void {
  this.option = (<HTMLSelectElement>document.getElementById('company')).value;
  console.log(this.option);
  if (this.option == ''){ //checks if the user did not select a company
    alert('Please select a company')
    
  }
  else {
    this.loading = true;
    this.cognitoService.signUp(this.user)
    

  .then(() => {
    
  this.loading = false;
  this.isConfirm = true;
  this.option = (<HTMLSelectElement>document.getElementById('company')).value;
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
  
}

// confirms sign up using cognito services and once successful, creates a user for the local database
public confirmSignUp(): void {
  this.loading = true;
  this.cognitoService.confirmSignUp(this.user)
  .then(() => {
    
    this.userId = this.user.email
    this.userName = this.user.name
    
      console.log(this.companyId);
    this.bookingService.createUser(this.userName, this.companyId, this.userId).subscribe(res => {
      return res;
     
    });
    
      
    });
  this.router.navigate(['/login']);

  this.loading = false;
  this.router.navigate(['/login'])
}

}