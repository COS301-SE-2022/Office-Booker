import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Room {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookingServiceService {

  constructor(private http: HttpClient) { }

  getAllRooms() {
    const url = 'http://localhost:3333/api/rooms';
    return this.http.get<Room[]>(`${url}`);
  }
  
  getRoomByID(roomId: number){
    const url = 'http://localhost:3333/api/rooms/' + roomId;
    return this.http.get<Room>(`${url}`);
  }

  getDesksByRoomId( roomId:number) {
    const url = 'http://localhost:3333/api/desks/room/' + roomId;
    return this.http.get(`${url}`);
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
    return this.http.get(`${url}`);
  }

  getBookingByBookingId(bookingId: number){
    const url = 'http://localhost:3333/api/bookings/' + bookingId;
    return this.http.get(`${url}`);
  }

  getCurrentBooking(deskId: number){
    const url = 'http://localhost:3333/api/bookings/desk/current/' + deskId;
    return this.http.get(`${url}`);
  }

  /*deleteBooking(bookingId: number){
    const url = 'http://localhost:3333/api/bookings/' + bookingId;
    return this.http.delete(`${url}`);
  }*/

  /*setDesk(deskId: number){
    const url = 'http://localhost:3333/api/desk/' + deskId;
    return this.http.post(`${url}`, deskId);
  }*/
}