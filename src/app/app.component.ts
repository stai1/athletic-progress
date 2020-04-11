import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterEvent, NavigationEnd } from '@angular/router';
import { makeUrl } from './utils';
import { TokenService } from './token.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tokenService: TokenService,
    public authService: AuthService,
  ) {
  }
  ngOnInit(): void {
  }

}
