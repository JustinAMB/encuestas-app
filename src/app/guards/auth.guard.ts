import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private router: Router , private auth:AuthService) { }

  canLoad(route: Route, segments: UrlSegment[]): boolean | Observable<boolean>  {
    return this.auth.validate().pipe(
      tap((resp)=>{

        if(!resp){
          this.router.navigate(['/auth']);
        }
      })
    );
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  Observable<boolean> | boolean {
      return this.auth.validate().pipe(
        tap((resp)=>{
  
          if(!resp){
            this.router.navigate(['/auth']);
          }
        })
      );
  }
  
}
