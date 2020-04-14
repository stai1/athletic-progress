import { Injectable } from '@angular/core';
import { Activity } from './activity';
import { StravaAPIService } from './strava-api.service';
import { Observable, of, Subject } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
const PER_PAGE = 200;

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  public activities: Activity[] = [];

  public newActivities = new Subject<Activity[]>();

  constructor(
    private stravaAPI : StravaAPIService,
  ) { }

  loadAllActivities(): Observable<boolean> {
    return this.recursiveLoadActivities();
  }

  private recursiveLoadActivities(page = 1): Observable<boolean> {
    return this.stravaAPI.getLoggedInAthleteActivities({ page: page, per_page: PER_PAGE}).pipe(
      switchMap(
        activities => {
          if(activities.length > 0) {
            activities = activities.filter(
              item => item.map && item.map.summary_polyline
            ).map(i =>
              { return { id: i.id, name: i.name, distance: i.distance, type: i.type, start_date: i.start_date, polyline: i.map.summary_polyline } }
            );
            this.activities = this.activities.concat(activities);
            this.newActivities.next(activities);
            return this.recursiveLoadActivities(page + 1);
          }
          else
            return of(true);
        }
      ),
      catchError(
        (e) => of(false)
      )
    );
  }
}
