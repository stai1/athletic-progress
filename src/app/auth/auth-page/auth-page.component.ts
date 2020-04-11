import { Component, OnInit } from '@angular/core';
import { makeUrl, pathjoin } from '../../utils';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit {

  constructor(
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
  }

  public get authUrl() {
    return makeUrl(
      'https://www.strava.com/oauth/authorize',
      {
        client_id: 36433,
        response_type: 'code',
        redirect_uri: pathjoin(document.baseURI, this.authService.redirectUrl),
        approval_prompt: 'force',
        scope:"activity:read,activity:read_all"
      }
    );
  }

}
