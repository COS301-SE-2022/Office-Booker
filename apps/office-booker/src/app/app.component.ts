import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@office-booker/api-interfaces';
import { RouterModule } from '@angular/router';
import { environment } from '../environments/environment';


@Component({
  selector: 'office-booker-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  hello$ = this.http.get<Message>('/api/hello');
  constructor(private http: HttpClient) {}
}
