import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

const POKE_INTERVAL_MINUTES = 25;

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private serverPath = environment.authServer;
  private _accessToken: string;
  private _refreshToken: string;
  constructor(
    private http: HttpClient,
  ) {
    timer(0, POKE_INTERVAL_MINUTES * 60000).subscribe(
      () => this.poke()
    );
  }

  public get accessToken() {
    return this._accessToken;
  }

  public get refreshToken() {
    return this._refreshToken;
  }

  /**
   * Poke the server to keep it running for Heroku
   */
  private poke() {
    this.http.get(this.serverPath).subscribe();
  }

  token(code: string): Observable<any> {
    return this.http.post(this.serverPath+'token', { code: code }).pipe(
      tap(
        data => {
          this.setTokens(data);
        }
      )
    );
  }

  refresh(refresh?: string): Observable<any> {
    refresh = refresh || this._refreshToken || "";
    return this.http.post(this.serverPath+'refresh', { refresh_token: refresh }).pipe(
      tap(
        data => {
          this.setTokens(data);
        }
      )
    );
  }

  private setTokens(data) {
    this._accessToken = data.access_token;
    this._refreshToken = data.refreshToken;
  }
}
