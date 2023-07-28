import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-detailed-weather',
  templateUrl: './detailed-weather.component.html',
  styleUrls: ['./detailed-weather.component.scss']
})
export class DetailedWeatherComponent implements OnInit {

  dateNameToday: string = '';
  @Input() currentWeather: any;
  @Input() cityControl: any;

  constructor() { }

  ngOnInit(): void {
    this.getDayName();
  }

  getDayName(date = new Date(), locale = 'en-US') {
    this.dateNameToday = date.toLocaleDateString(locale, { weekday: 'long' });
  }

  getBackgroundImageUrl(): string {
    const currentTime = new Date().getHours();

    // Check if the current time is between 6:00 and 18:00
    if (currentTime >= 6 && currentTime < 18) {
      return 'https://images.unsplash.com/photo-1559963110-71b394e7494d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80';
    } else {
      return 'https://app1.weatherwidget.org/skin/img/bg/clear_night.jpg';
    }
  }


}
