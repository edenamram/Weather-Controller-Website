import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';
import { Observable, debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs';
import { IpInfoService } from 'src/app/services/ip-info.service';

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
  loading: boolean = false;
  showSearchForm: boolean = false;

  constructor(private weatherService: WeatherService,
    private snackBar: MatSnackBar,
    private ipInfoService: IpInfoService) { }

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
        this.cityControl.setValue(data.city);
        this.searchWeather();
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
        (data: any) => {
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
          } else {
            this.showSnackbar('Location not found. Please try again.');
          }
        },
        (error) => {
          this.showSnackbar(error.message);
        }
      );
    }
  }

  searchWeatherByLocation() {
    this.showSearchForm = false;
    this.searchWeather();
  }

  private showSnackbar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
    });
  }
}
