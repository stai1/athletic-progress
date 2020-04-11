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
  public needAuthentication = false;
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
                this.needAuthentication = true;
                alert("Unable to authorize");
              }
            );
          }
          else
            this.needAuthentication = true;
        }

      }
    );
  }
  ngOnInit(): void {
  }

  public get authUrl() {
    return makeUrl(
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
