import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { HttpClient } from '@angular/common/http';
import { makeUrl } from './utils';
import { Observable } from 'rxjs';


const API_PATH = "https://www.strava.com/api/v3/";

@Injectable({
  providedIn: 'root'
})
export class StravaAPIService {

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
  ) { }

  getLoggedInAthleteActivities(params: any): Observable<any[]> {
    return <Observable<any[]>> this.http.get(
      makeUrl(API_PATH + "athlete/activities", params),
      { headers: { Authorization: `Bearer ${this.tokenService.accessToken}` } }
    );
  }
}
