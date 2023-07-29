import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';
import { Observable, debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs';
import { IpInfoService } from 'src/app/services/ip-info.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.scss']
})
export class MainScreenComponent implements OnInit {
  currentWeather: any;
  fiveDayForecast: any;
  cityControl = new FormControl();
  filteredCities!: Observable<any[]>;
  dateNameToday: string = '';
  cityName: string = '';
  unit: string = '';

  constructor(private weatherService: WeatherService,
    private snackBar: MatSnackBar,
    private ipInfoService: IpInfoService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.checkIpInfo();
    this.setupAutocomplete();
  }

  setupAutocomplete() {
    this.filteredCities = this.cityControl.valueChanges.pipe(
      filter(res => res !== null && res.trim() !== ''),
      distinctUntilChanged(),
      debounceTime(1000),
      switchMap(value => this.weatherService.getAutoComplete(value.toLowerCase()).pipe(
        map((res: any) => res)
      ))
    );
  }

  checkIpInfo() {
    this.ipInfoService.getIpInfo().subscribe(
      (data: any) => {
        this.route.params.subscribe(params => {
          if (params['cityName'] == data.city) {
            this.cityName = data.city;
          } else {
            this.cityName = params['cityName'];
          }
          this.cityControl.setValue(this.cityName);
          this.searchWeather();
        });
      },
      (error) => {
        this.cityControl.setValue('Tel Aviv');
        this.searchWeather();
      }
    );
  }


  searchWeather(): void {
    const selectedCity = this.cityControl.value;
    if (selectedCity.trim() !== '') {
      this.weatherService.getAutoComplete(selectedCity).subscribe(
        {
          next: (data: any) => {
            if (data.length > 0) {
              const locationKey = data[0].Key;
              this.weatherService.getCurrentWeather(locationKey).subscribe(
                (weatherData: any) => {
                  this.currentWeather = weatherData[0];
                }
              );
              this.weatherService.getFiveDayForecast(locationKey).subscribe(
                (forecastData: any) => {
                  this.fiveDayForecast = forecastData.DailyForecasts;
                }
              );

              this.cityName = data[0].LocalizedName;
              this.cityControl.setValue(data[0].LocalizedName);

              this.router.navigate(['./'], { relativeTo: this.route, queryParams: { cityName: this.cityName } });
            } else {
              this.showSnackbar('Location not found. Please try again.');
            }
          },
          error: (error: any) => {
            this.showSnackbar(error.message);
          }
        }
      );
    }
  }

  toggleUnit() {
    this.unit = this.unit === 'C' ? 'F' : 'C';
  }



  private showSnackbar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
    });
  }


}
