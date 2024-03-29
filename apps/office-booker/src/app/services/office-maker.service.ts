import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Desk {
  id: number,
  roomId: number,
  LocationRow: number,
  LocationCol: number,
  Height: number,
  Width: number,
  isMeetingRoom: boolean,
}

export interface company {
  id: number,
  name: string,
}

export interface Wall {
  id: number,
  roomId: number,
  Pos1X: number,
  Pos1Y: number,
  Pos2X: number,
  Pos2Y: number,
}

export interface Room {
  id: number;
  name: string;
  companyId: number;
}


@Injectable({
  providedIn: 'root'
})
export class OfficeMakerService {

  constructor(private http: HttpClient) {}

  private baseURL = environment.API_URL + "/api/";

  createDesk(roomId: number, LocationRow: number, LocationCol: number, Height: number, Width: number, isMeetingRoom: boolean, capacity: number){
    const url = this.baseURL + 'desks';
    const body = {
      roomId: roomId,
      LocationRow: LocationRow,
      LocationCol: LocationCol,
      Height: Height,
      Width: Width,
      isMeetingRoom: isMeetingRoom,
      capacity: capacity,
    }
    return this.http.post<Desk>(`${url}`, body);
  }

  createDeskWithFacilities(roomId: number, LocationRow: number, LocationCol: number, Height: number, Width: number, isMeetingRoom: boolean, capacity: number, plugs: number, monitors:number, projectors: number){
    const url = this.baseURL + 'desks/withAttributes';
    const body = {
      roomId: roomId,
      LocationRow: LocationRow,
      LocationCol: LocationCol,
      Height: Height,
      Width: Width,
      isMeetingRoom: isMeetingRoom,
      capacity: capacity,
      plugs: plugs,
      monitors: monitors,
      projectors: projectors,
    }
    return this.http.post<Desk>(`${url}`, body);
  }

  getCompanies(){
    const url = this.baseURL + 'companies';
    return this.http.get<company[]>(`${url}`);
  }

  createWall(roomId: number, Pos1X: number, Pos1Y: number, Pos2X: number, Pos2Y: number){
    const url = this.baseURL + 'walls';
    const body = {
      roomId: roomId,
      Pos1X: Pos1X,
      Pos1Y: Pos1Y,
      Pos2X: Pos2X,
      Pos2Y: Pos2Y,
    }
    return this.http.post<Wall>(`${url}`, body);
  }

  createRoom(name: string, companyId: string){
    const url = this.baseURL + "rooms/" + companyId;
    const body = {
      name: name,
    }
    return this.http.post<Room>(`${url}`, body);
  }

  getWallsByRoomId(roomId: number){
    const url = this.baseURL + 'walls/room/' + roomId;
    return this.http.get<Wall[]>(`${url}`);
  }

  deleteDeskById(deskId: number){
    const url = this.baseURL + 'desks/'+ deskId;
    return this.http.delete(`${url}`);
  }

  deleteWallById(wallId: number){
    const url = this.baseURL + 'walls/wall/'+ wallId;
    return this.http.delete(`${url}`);
  }
}
