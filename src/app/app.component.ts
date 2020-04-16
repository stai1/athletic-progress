import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterEvent, NavigationEnd } from '@angular/router';
import { makeUrl } from './utils';
import { TokenService } from './token.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth/auth.service';

const DROPDOWN_DEFAULT_TITLE = "Tools";

interface MenuItem {
  path: string,
  title: string, 
  disabled?: boolean
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  dropdownActive: boolean = false;
  dropdownTitle = DROPDOWN_DEFAULT_TITLE;

  menuItems: MenuItem[] = [
    {
      path: "everywhere-ive-been",
      title: "Everywhere I've Been"
    },
    {
      path: "race-pace",
      title: "Race Pace",
      disabled: true
    }
  ]
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tokenService: TokenService,
    public authService: AuthService,
  ) {
    this.router.events.subscribe(
      event => {
        let path = this.router.url.split('?')[0].split('/')[1];
        let item = this.menuItems.find(item => item.path === path);
        if(item)
          this.dropdownTitle = item.title;
        else
          this.dropdownTitle = DROPDOWN_DEFAULT_TITLE;
      }
    )
  }
  ngOnInit(): void {
  }

  toggleDropdown(toggle=true) {
    if(toggle)
      this.dropdownActive = !this.dropdownActive;
  }

  setDropdown(active: boolean) {
    this.dropdownActive = active;
  }

  onNavigate(item: MenuItem) {
    this.dropdownTitle = item.title;
    this.toggleDropdown(!item.disabled)
  }

  onHome() {
    this.dropdownTitle = DROPDOWN_DEFAULT_TITLE;
  }

}
