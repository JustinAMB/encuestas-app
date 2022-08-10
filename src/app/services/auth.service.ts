import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable ,of} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Resp } from '../models/resp';
import { User } from '../models/user';
import {catchError, map, tap} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user!:User;

  private _api= environment.api;
  get user():User{
    return {...this._user};
  }
  constructor(private _http:HttpClient ) { }
  
 //login with rxjs
  signin(email:string,password:string):Observable<Resp>{
    const url=`/api/auth/signin`;
    const body={
      email,
      password
    }
    return this._http.post<Resp>(url,body).pipe(
      tap( (resp:Resp)=>{
        if(resp.status===1){
          this.setToken(resp.data.token);
          this._user=resp.data as User;
        }
      }),
      catchError( (resp:Resp)=>{
          return of(resp);
      })
    );

  }
  get headers(){
    return{
      headers:{
        'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods' : 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers' : 'Origin, Content-Type, Accept, X-Custom-Header, Upgrade-Insecure-Requests',
    
      }
    }
  }
  //register with rxjs
  signup(name:string,email:string,password:string):Observable<Resp>{
    
    const url=`/api/auth/signup`;
    const body={
      name,
      email,
      password
    }
    return this._http.post<Resp>(url,body,this.headers).pipe(
      map( (resp:Resp)=>{
        if(resp.status===1){

          this._user=resp.data;
        }
        return resp;
      })
    );

  }
  //logout with rxjs
  logout():Observable<Resp>{
    const url=`${this._api}auth/logout`;
    return this._http.get<Resp>(url).pipe(
      map( (resp:Resp)=>{
        if(resp.status===1){

          this._user={
            id:0,
            name:'',
            email:'',
            password:'',
            token:''
          };
        }
        return resp;
      })
    );

  }
  // set localStorages
  setToken(token:string){
    localStorage.setItem('token',token);
  }
  // get localStorages
  getToken():string{
    const token=localStorage.getItem('token')!;
    return token;
  }
}
