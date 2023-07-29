import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';
import { Observable, Subscription, debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs';
import { IpInfoService } from 'src/app/services/ip-info.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SettingsService } from 'src/app/services/settings.service';


@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.scss']
})
export class MainScreenComponent implements OnInit,OnDestroy {
  currentWeather: any;
  fiveDayForecast: any;
  cityControl = new FormControl();
  filteredCities!: Observable<any[]>;
  dateNameToday: string = '';
  cityName: string = '';
  unit: string = '';
  subscriptions: Subscription[] = [];

  constructor(private weatherService: WeatherService,
    private snackBar: MatSnackBar,
    private ipInfoService: IpInfoService,
    private settingsService: SettingsService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.initializeUnit();
    this.checkIpInfo();
    this.setupAutocomplete();
  }

  setupAutocomplete() {
    this.filteredCities = this.cityControl.valueChanges.pipe(
      filter(res => res !== null && res?.trim() !== ''),
      distinctUntilChanged(),
      debounceTime(1000),
      switchMap(value => this.weatherService.getAutoComplete(value.toLowerCase()).pipe(
        map((res: any) => res)
      ))
    );
  }

  checkIpInfo() {
    const subscription = this.ipInfoService.getIpInfo().subscribe({
      next: (data: any) => {
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
      error:
        (error) => {
          this.cityControl.setValue('Tel Aviv');
          this.searchWeather();
        }
    }
    );

    this.subscriptions.push(subscription);
  }

  searchWeather(): void {
    const selectedCity = this.cityControl.value;
    if (selectedCity.trim() !== '') {
      const autoCompleteSubscription = this.weatherService.getAutoComplete(selectedCity).subscribe(
        {
          next: (data: any) => {
            if (data.length > 0) {
              const locationKey = data[0].Key;

              const currentWeatherSubscription = this.weatherService.getCurrentWeather(locationKey).subscribe(
                (weatherData: any) => {
                  this.currentWeather = weatherData[0];
                }
              );
              this.subscriptions.push(currentWeatherSubscription);

              const forecastSubscription = this.weatherService.getFiveDayForecast(locationKey).subscribe(
                (forecastData: any) => {
                  this.fiveDayForecast = forecastData.DailyForecasts;
                }
              );
              this.subscriptions.push(forecastSubscription);

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

      this.subscriptions.push(autoCompleteSubscription);
    }
  }

  private unsubscribeAll(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  ngOnDestroy(): void {
    this.unsubscribeAll();
  }

  initializeUnit() {
    this.unit = this.settingsService.getTemperatureUnit();
  }

  toggleUnit() {
    this.unit = this.settingsService.changeTempUnit(this.unit);
  }

  private showSnackbar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
    });
  }
}
