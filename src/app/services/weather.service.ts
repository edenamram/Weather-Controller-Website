import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

const mockData = {
  oneday : [
    {
        "LocalObservationDateTime": "2023-07-27T10:42:00+03:00",
        "EpochTime": 1690443720,
        "WeatherText": "Sunny",
        "WeatherIcon": 1,
        "HasPrecipitation": false,
        "PrecipitationType": null,
        "IsDayTime": true,
        "Temperature": {
            "Metric": {
                "Value": 30.3,
                "Unit": "C",
                "UnitType": 17
            },
            "Imperial": {
                "Value": 87.0,
                "Unit": "F",
                "UnitType": 18
            }
        },
        "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us",
        "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us"
    }
],
  fivedays:
  {
    "Headline": {
        "EffectiveDate": "2023-07-27T08:00:00+03:00",
        "EffectiveEpochDate": 1690434000,
        "Severity": 4,
        "Text": "Danger of dehydration and heat stroke if outside for extended periods of time Thursday",
        "Category": "heat",
        "EndDate": "2023-07-27T20:00:00+03:00",
        "EndEpochDate": 1690477200,
        "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?unit=c&lang=en-us",
        "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?unit=c&lang=en-us"
    },
    "DailyForecasts": [
        {
            "Date": "2023-07-27T07:00:00+03:00",
            "EpochDate": 1690430400,
            "Temperature": {
                "Minimum": {
                    "Value": 25.3,
                    "Unit": "C",
                    "UnitType": 17
                },
                "Maximum": {
                    "Value": 34.6,
                    "Unit": "C",
                    "UnitType": 17
                }
            },
            "Day": {
                "Icon": 1,
                "IconPhrase": "Sunny",
                "HasPrecipitation": false
            },
            "Night": {
                "Icon": 33,
                "IconPhrase": "Clear",
                "HasPrecipitation": false
            },
            "Sources": [
                "AccuWeather"
            ],
            "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&unit=c&lang=en-us",
            "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&unit=c&lang=en-us"
        },
        {
            "Date": "2023-07-28T07:00:00+03:00",
            "EpochDate": 1690516800,
            "Temperature": {
                "Minimum": {
                    "Value": 27.5,
                    "Unit": "C",
                    "UnitType": 17
                },
                "Maximum": {
                    "Value": 34.1,
                    "Unit": "C",
                    "UnitType": 17
                }
            },
            "Day": {
                "Icon": 1,
                "IconPhrase": "Sunny",
                "HasPrecipitation": false
            },
            "Night": {
                "Icon": 35,
                "IconPhrase": "Partly cloudy",
                "HasPrecipitation": false
            },
            "Sources": [
                "AccuWeather"
            ],
            "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&unit=c&lang=en-us",
            "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&unit=c&lang=en-us"
        },
        {
            "Date": "2023-07-29T07:00:00+03:00",
            "EpochDate": 1690603200,
            "Temperature": {
                "Minimum": {
                    "Value": 27.1,
                    "Unit": "C",
                    "UnitType": 17
                },
                "Maximum": {
                    "Value": 32.3,
                    "Unit": "C",
                    "UnitType": 17
                }
            },
            "Day": {
                "Icon": 1,
                "IconPhrase": "Sunny",
                "HasPrecipitation": false
            },
            "Night": {
                "Icon": 35,
                "IconPhrase": "Partly cloudy",
                "HasPrecipitation": false
            },
            "Sources": [
                "AccuWeather"
            ],
            "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&unit=c&lang=en-us",
            "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&unit=c&lang=en-us"
        },
        {
            "Date": "2023-07-30T07:00:00+03:00",
            "EpochDate": 1690689600,
            "Temperature": {
                "Minimum": {
                    "Value": 26.6,
                    "Unit": "C",
                    "UnitType": 17
                },
                "Maximum": {
                    "Value": 31.0,
                    "Unit": "C",
                    "UnitType": 17
                }
            },
            "Day": {
                "Icon": 2,
                "IconPhrase": "Mostly sunny",
                "HasPrecipitation": false
            },
            "Night": {
                "Icon": 34,
                "IconPhrase": "Mostly clear",
                "HasPrecipitation": false
            },
            "Sources": [
                "AccuWeather"
            ],
            "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&unit=c&lang=en-us",
            "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&unit=c&lang=en-us"
        },
        {
            "Date": "2023-07-31T07:00:00+03:00",
            "EpochDate": 1690776000,
            "Temperature": {
                "Minimum": {
                    "Value": 24.8,
                    "Unit": "C",
                    "UnitType": 17
                },
                "Maximum": {
                    "Value": 31.6,
                    "Unit": "C",
                    "UnitType": 17
                }
            },
            "Day": {
                "Icon": 1,
                "IconPhrase": "Sunny",
                "HasPrecipitation": false
            },
            "Night": {
                "Icon": 34,
                "IconPhrase": "Mostly clear",
                "HasPrecipitation": false
            },
            "Sources": [
                "AccuWeather"
            ],
            "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=5&unit=c&lang=en-us",
            "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=5&unit=c&lang=en-us"
        }
    ]
}
}

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

    return new Observable((observer) => { observer.next(["Tel Aviv"]); });

    const url = `${this.baseUrl}/locations/v1/cities/autocomplete`;
    return this.http.get(`${url}?apikey=${this.apiKey}&q=${q}`).pipe(
      catchError(this.handleError)
    );
  }

  getCurrentWeather(locationKey: string): Observable<any> {
    const url = `${this.baseUrl}/currentconditions/v1/`

    return new Observable((observer) => { observer.next(mockData.oneday); });

    return this.http.get(`${url}${locationKey}?apikey=${this.apiKey}`).pipe(
      catchError(this.handleError)
    );
  }

  getFiveDayForecast(locationKey: string): Observable<any> {
    const url = `${this.baseUrl}/forecasts/v1/daily/5day/`
    
    return new Observable((observer) => { observer.next(mockData.fivedays); });

    return this.http.get(`${url}${locationKey}?apikey=${this.apiKey}&metric=true`).pipe(
      catchError(this.handleError)
    );
  }
}
