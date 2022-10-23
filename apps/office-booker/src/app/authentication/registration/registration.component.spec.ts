import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { RegistrationComponent } from './registration.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../../../environments/environment'
import { Desk, company, Room, employee } from '../../services/booking-service.service'
import * as exp from 'constants';

describe('RegistrationComponent Unit Tests', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrationComponent],
      imports: [RouterTestingModule, FormsModule, HttpClientTestingModule, MatCardModule,
        MatInputModule, MatSelectModule, BrowserAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call getCompanies method', () => {
    let oldLength = component.companies.length;
    component.getCompanies();
    expect(oldLength).toEqual(oldLength++);
  });
  
  it('should call signUp method with empty company', () => {
    component.user.email = "test@email.com";
    component.signUp("");
    expect(component.company).toEqual("");
    expect(component.userDomain).toEqual("email.com");
  });

  it('should call continueRegistration', () => {
    component.registration = true;
    component.continueReg = false;
    component.continueRegistration();
    expect(component.registration).toEqual(false);
    expect(component.continueReg).toEqual(true);
  });
});

describe('RegistrationComponent Integration Tests', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let httpMock: HttpTestingController;
  const baseURL = environment.API_URL + "/api/";

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrationComponent],
      imports: [RouterTestingModule, FormsModule, HttpClientTestingModule, MatCardModule,
        MatInputModule, MatSelectModule, BrowserAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    httpMock = fixture.debugElement.injector.get<HttpTestingController>(HttpTestingController);
    fixture.detectChanges();
  });

  it('should be true', () => {
    expect(component).toBeTruthy();
  });
});