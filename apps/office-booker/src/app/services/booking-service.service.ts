import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Room {
  id: number;
  name: string;
}

export interface Desk {
  id: number,
  roomId: number,
  LocationRow: number,
  LocationCol: number,
  Height: number,
  Width: number,
  booking: boolean,
  bookings: Booking[],
  isMeetingRoom: boolean,
  ownBooking: boolean,
}

export interface Booking {
  id: number,
  deskId: number,
  desk: Desk,
  employeeId: number,
  startsAt: string,
  endsAt: string,
  createdAt: string
  employee: employee,
  employeeName: string,
  isMeetingRoom: boolean,
  isInvited: boolean,
  Invite: Invite[],
}

export interface BookingDto {
  startTime: string,
  endTime: string
}

export interface employee {
  id: number,
  email: string,
  name: string,
  companyId: number,
  admin: boolean,
  guest: boolean
  currentRating: number,
  ratingsReceived: number,
}

export interface company {
  id: number,
  name: string,
}

export interface Invite {
  bookingId: number,
  email: string,
  id: number,
  invitedEmployee: employee,
  deskId: number,
  Booking: Booking,
  invitedEmail: string,
  employeeId: number,
  accepted: boolean,


}

export interface Facility {
  id: number,
  desk?: Desk,
  deskId: number,
  plugs: number,
  monitors: number,
  projectors: number,
}


export interface rating{
  currentRating: number,
  ratingsReceived: number,
}

@Injectable({
  providedIn: 'root'
})

export class BookingServiceService {

  constructor(private http: HttpClient) { }

  private baseURL = environment.API_URL + "/api/";

  getAllRooms(): Observable<Room[]> {
    const url = this.baseURL + 'rooms';
    return this.http.get<Room[]>(`${url}`);
  }

  getInvitesForBooking(bookingId : number){
    const url = this.baseURL + 'bookings/invites/' + bookingId;
    return this.http.get<Invite[]>(`${url}`);
  }
  
  getRoomByID(roomId: number){
    const url = this.baseURL + 'rooms/'; + roomId;
    return this.http.get<Room>(`${url}`);
  }

  getDesksByRoomId( roomId:number) {
    const url = this.baseURL + 'desks/room/' + roomId;
    return this.http.get<Desk[]>(`${url}`);
  }

  getAllDesks() {
    const url = this.baseURL + 'desks';
    return this.http.get(`${url}`);
  }

  getFacilitiesByDeskId(deskId: number){
    const url = this.baseURL + 'facilities/desk/' + deskId;
    return this.http.get<Facility>(`${url}`);
  }

  getBookingsByDeskId(deskId: number){
    const url = this.baseURL + 'bookings/desk/' + deskId;
    return this.http.get<Booking[]>(`${url}`);
  }

  getBookingByBookingId(bookingId: number){
    const url = this.baseURL + 'bookings/' + bookingId;
    return this.http.get<Booking>(`${url}`);
  }

  getCurrentBooking(deskId: number){
    const url = this.baseURL + 'bookings/desk/current/' + deskId;
    return this.http.get(`${url}`);
  }

  deleteBooking(bookingId: number){
    const url = this.baseURL + 'bookings/' + bookingId;
    return this.http.delete(`${url}`);
  }

  createBooking(deskId: number, userId: number, startDate: string, endDate: string){
    const url = this.baseURL + 'bookings';
    const body = {
      startsAt: startDate,
      endsAt: endDate,
      deskId: deskId,
      userId: userId,
    }
    return this.http.post<Booking>(`${url}`, body);
  }

  getAllEmployees(){
    const url = this.baseURL + 'users';
    return this.http.get<employee[]>(`${url}`);
  }

  getBookingByEmployee(userId: number){
    const url = this.baseURL + 'bookings/user/' + userId;
    return this.http.get<Booking[]>(`${url}`);
  }

  getEmployeeById(userId: number){
    const url = this.baseURL + 'users/' + userId;
    return this.http.get<employee>(`${url}`);
  }
  
  getEmployeeByEmail(email: string){
    const url = this.baseURL + 'users/email';
    const body = {
      email: email
    }
    return this.http.post<employee>(`${url}`, body);
  }

  getCompanies(){
    const url = this.baseURL + 'companies';
    return this.http.get<company[]>(`${url}`);
  }

  getCompanyIdByEmail(email: string){
    const url = this.baseURL + 'users/email';
    const body = {
      email: email
    }
    return this.http.post<employee>(`${url}`, body);
  }

  getCompanyByID(ID: number){
    const url = this.baseURL + 'companies/' + ID;
    return this.http.get<company>(`${url}`);
  }  

  createUser(name: string, companyId: number, email: string, guest: boolean) {
    const url = this.baseURL + 'users/';
    const body = {
      name: name,
      companyId: companyId,
      email: email,
      guest: guest
    } 
    console.log(body);
    return this.http.post<employee>(`${url}`, body);
  }  

  createInvite(bookingId: number, email: string){
    const url = this.baseURL + 'bookings/invites/' + bookingId;
    const body = {
      email: email
    } 
    return this.http.post<Invite>(`${url}`, body);
  } 

  deleteInvite(id: number){
    console.log(id);
    const url = this.baseURL + 'bookings/invites/delete/' + id;
    return this.http.put<Invite[]>(`${url}`, {});
  }

  getInvitesForUser(employeeId: number){
    const url = this.baseURL + 'bookings/invites/user/' + employeeId;
    return this.http.get<Invite[]>(`${url}`);
  }

  acceptInvite(id: number){
    const url = this.baseURL + 'bookings/invites/accept/' + id;
    return this.http.put<Invite[]>(`${url}`, {});
  }

  declineInvite(id: number){
    const url = this.baseURL + 'bookings/invites/decline/' + id;
    return this.http.put<Invite[]>(`${url}`, {});
  }

  updateRatings(userId: number, currentRating: number, ratingsReceived: number){
    const url = this.baseURL + 'users/ratings/' + userId;
    const body = {
      currentRating: currentRating, 
      ratingsReceived: ratingsReceived
    }
    return this.http.put<rating>(`${url}`, body);
  }

  getRatings(userId: number){
    const url = this.baseURL + 'users/ratings/' + userId;
    return this.http.get<rating>(`${url}`);
  }

  getRoomsByCompanyId(companyId: number){
    const url = this.baseURL + 'rooms/company/' + companyId;
    return this.http.get<Room[]>(`${url}`);
  }

}