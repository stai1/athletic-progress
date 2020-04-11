import { Injectable } from '@angular/core';
import { RouterEvent, NavigationEnd, ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { TokenService } from '../token.service';
import { map, take, filter, switchMap, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public authorized = false;
  public needAuthorization = false;
  redirectUrl: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tokenService: TokenService,
    
  ) { }

  public authorize() {
    return this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd),
      take(1),
      switchMap(
        (event: RouterEvent) => {
          if(this.authorized)
            return of(true);
          if(this.route.snapshot.queryParams.code)
            return this.tokenService.token(this.route.snapshot.queryParams.code);
          return of(false);
  
        }
      ),
      catchError(e => {
        this.needAuthorization = true;
        alert("Unable to authorize");
        return of(false);
      }),
      tap(
        authorized => {
          if(authorized) {
            this.authorized = true;
            this.needAuthorization = false
          }
          else {
            this.needAuthorization = true; // not authorized and no code
          }
        }
      )
    );
  }
  
}
