import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '@prisma/client';
import { stringify } from 'querystring';

export interface Room {
  id: number;
  name: string;
}

export interface Desk {
  id: number,
  roomId: number,
  LocationRow: number,
  LocationCol: number,
  booking: boolean,
  bookings: Booking[],
  isMeetingRoom: boolean,
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
  deskId: number

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

  getAllRooms(): Observable<Room[]> {
    const url = 'http://localhost:3333/api/rooms';
    return this.http.get<Room[]>(`${url}`);
  }
  
  getRoomByID(roomId: number){
    const url = 'http://localhost:3333/api/rooms/' + roomId;
    return this.http.get<Room>(`${url}`);
  }

  getDesksByRoomId( roomId:number) {
    const url = 'http://localhost:3333/api/desks/room/' + roomId;
    return this.http.get<Desk[]>(`${url}`);
  }

  getAllDesks() {
    const url = 'http://localhost:3333/api/desks';
    return this.http.get(`${url}`);
  }

  getFacilitiesByDeskId(deskId: number){
    const url = 'http://localhost:3333/api/facilities/desk/' + deskId;
    return this.http.get(`${url}`);
  }

  getBookingsByDeskId(deskId: number){
    const url = 'http://localhost:3333/api/bookings/desk/' + deskId;
    return this.http.get<Booking[]>(`${url}`);
  }

  getBookingByBookingId(bookingId: number){
    const url = 'http://localhost:3333/api/bookings/' + bookingId;
    return this.http.get<Booking>(`${url}`);
  }

  getCurrentBooking(deskId: number){
    const url = 'http://localhost:3333/api/bookings/desk/current/' + deskId;
    return this.http.get(`${url}`);
  }

  deleteBooking(bookingId: number){
    const url = 'http://localhost:3333/api/bookings/' + bookingId;
    return this.http.delete(`${url}`);
  }

  createBooking(deskId: number, userId: number, startDate: string, endDate: string){
    const url = 'http://localhost:3333/api/bookings';
    const body = {
      startsAt: startDate,
      endsAt: endDate,
      deskId: deskId,
      userId: userId,
    }
    return this.http.post<Booking>(`${url}`, body);
  }

  getAllEmployees(){
    const url = 'http://localhost:3333/api/users';
    return this.http.get<employee[]>(`${url}`);
  }

  getBookingByEmployee(userId: number){
    const url = 'http://localhost:3333/api/bookings/user/' + userId;
    return this.http.get<Booking[]>(`${url}`);
  }

  getEmployeeById(userId: number){
    const url = 'http://localhost:3333/api/users/' + userId;
    return this.http.get<employee>(`${url}`);
  }
  
  getEmployeeByEmail(email: string){
    const url = 'http://localhost:3333/api/users/email';
    const body = {
      email: email
    }
    return this.http.post<employee>(`${url}`, body);
  }

  getCompanies(){
    const url = 'http://localhost:3333/api/companies';
    return this.http.get<company[]>(`${url}`);
  }

  getCompanyIdByEmail(email: string){
    const url = 'http://localhost:3333/api/users/email';
    const body = {
      email: email
    }
    return this.http.post<employee>(`${url}`, body);
  }

  getCompanyByID(ID: number){
    const url = 'http://localhost:3333/api/companies/' + ID;
    return this.http.get<company>(`${url}`);
  }  

  createUser(name: string, companyId: number, email: string, guest: boolean) {
    const url = 'http://localhost:3333/api/users/';
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
    const url = 'http://localhost:3333/api/bookings/invites/' + bookingId;
    const body = {
      email: email
    } 
    console.log(body);
    return this.http.post<Invite>(`${url}`, body);
  } 

  getInvitesForUser(employeeId: number){
    const url = 'http://localhost:3333/api/bookings/invites/user/' + employeeId;
    return this.http.get<Invite[]>(`${url}`);
  }

  acceptInvite(id: number){
    const url = 'http://localhost:3333/api/bookings/invites/accept/' + id;
    return this.http.put<Invite[]>(`${url}`, {});
  }

  declineInvite(id: number){
    const url = 'http://localhost:3333/api/bookings/invites/decline/' + id;
    return this.http.put<Invite[]>(`${url}`, {});
  }

  updateRatings(userId: number, currentRating: number, ratingsReceived: number){
    const url = 'http://localhost:3333/api/users/ratings/' + userId;
    const body = {
      currentRating: currentRating, 
      ratingsReceived: ratingsReceived
    }
    return this.http.put<rating>(`${url}`, body);
  }

  getRatings(userId: number){
    const url = 'http://localhost:3333/api/users/ratings/' + userId;
    return this.http.get<rating>(`${url}`);
  }
}