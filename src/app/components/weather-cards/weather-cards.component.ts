import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather-cards',
  templateUrl: './weather-cards.component.html',
  styleUrls: ['./weather-cards.component.scss']
})
export class WeatherCardsComponent implements OnInit {

  @Input() fiveDayForecast: any;

  constructor() { }

  ngOnInit(): void {
  }

}
