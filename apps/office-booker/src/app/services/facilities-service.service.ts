import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Facility {
  id: number;
  desk: Desk;
  deskId: number;
  plugs: number;
  monitors: number;
  projectors: number;
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

@Injectable({
  providedIn: 'root'
})
export class FacilitiesServiceService {

  constructor(private http: HttpClient) { }

  private baseURL = environment.API_URL + "/api/";

  getFacilitiesByDeskId(deskId: number): Observable<Facility[]> {
    const url = this.baseURL + "facilities/desk/" + deskId;
    return this.http.get<Facility[]>(`${url}`);
  }
}
