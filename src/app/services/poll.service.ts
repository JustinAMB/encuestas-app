import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Poll } from '../models/poll';
import { Resp } from '../models/resp';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PollService {

  constructor(private http:HttpClient,private auth:AuthService) { }
  addPoll(poll:Poll):Observable<Resp> {
    const url='/api/poll/';
    poll.author=this.auth.user.id;

    return this.http.post<Resp>(url,poll).pipe(
      catchError((err:Resp)=>{
        return of(err);
      }
      )
      );

  }
}
