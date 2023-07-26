import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private readonly baseUrl = 'http://dataservice.accuweather.com';
  private readonly apiKey = environment.apiKey;

  constructor(private http: HttpClient,
  ) { }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, body was:`, error.error);
    }
    throw 'An error occurred. Please try again later.';
  }

  getAutoComplete(q: string): Observable<any> {
    const url = `${this.baseUrl}/locations/v1/cities/autocomplete`;
    return this.http.get(`${url}?apikey=${this.apiKey}&q=${q}`).pipe(
      catchError(this.handleError)
    );
  }

  getCurrentWeather(locationKey: string): Observable<any> {
    const url = `${this.baseUrl}/currentconditions/v1/`
    return this.http.get(`${url}${locationKey}?apikey=${this.apiKey}`).pipe(
      catchError(this.handleError)
    );
  }

  getFiveDayForecast(locationKey: string): Observable<any> {
    const url = `${this.baseUrl}/forecasts/v1/daily/5day/`
    return this.http.get(`${url}${locationKey}?apikey=${this.apiKey}&metric=true`).pipe(
      catchError(this.handleError)
    );
  }
}
