import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, NavigationEnd, RouterEvent } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { tap, filter, switchMap, take, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthCheck implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): boolean {
    const url: string = state.url.slice(0, state.url.indexOf('?'));

    this.authService.authorize().pipe(
      tap(
        authorized => {
          if(!authorized) {
            this.authService.redirectUrl = url;
            this.router.navigate(['/auth']);
          }
        }
      )
    ).subscribe();

    return !this.authService.needAuthorization

    // return this.router.events.pipe(
    //   filter(
    //     (event: RouterEvent) => {
    //       return event instanceof NavigationEnd || route.queryParams.code
    //     }
    //   ),
    //   first(),
    //   switchMap(
    //     event => this.authService.authorize()
    //   ),
    //   tap(
    //     authorized => {
    //       if(!authorized) {
    //         this.authService.redirectUrl = url;
    //         this.router.navigate(['/auth']);
    //       }
    //     }
    //   ),
    // );
  }


}
