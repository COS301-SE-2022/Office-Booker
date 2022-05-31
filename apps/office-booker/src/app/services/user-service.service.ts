import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})

export class UserServiceService {

  constructor(private http: HttpClient) { }


  createUser(userId: string){
    const url = 'http://localhost:3333/api/employee' + userId;
    const body = {
      
    }
    return this.http.post<User>(`${url}`, body);
  }
}
