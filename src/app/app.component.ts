import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterEvent, NavigationEnd } from '@angular/router';
import { makeUrl } from './utils';
import { TokenService } from './token.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public authenticated = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tokenService: TokenService,
  ) {
    this.router.events.subscribe(
      (event: RouterEvent) => {
        if (event instanceof NavigationEnd) {
          if(this.route.snapshot.queryParams.code) {
            this.tokenService.token(this.route.snapshot.queryParams.code).subscribe(
              () => this.authenticated = true,
              (error: HttpErrorResponse) => {
                if(error.status === 400)
                  this.goToAuthorizationPage();
                else
                  alert("Unable to authorize");
              }
            );
          }
          else
            this.goToAuthorizationPage();
        }

      }
    );
  }
  ngOnInit(): void {
  }

  goToAuthorizationPage(): void {
    window.location.href = makeUrl(
      'https://www.strava.com/oauth/authorize',
      {
        client_id: 36433,
        response_type: 'code',
        redirect_uri: `${location.protocol}//${location.host}${location.pathname}`,
        approval_prompt: 'force',
        scope:"activity:read,activity:read_all"
      }
    );
  }

}
