import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookingServiceService {

  constructor(private http: HttpClient) { }

  getAllRooms() {
    const url = 'http://localhost:3333/api/rooms';
    return this.http.get(`${url}`);
  }
}
