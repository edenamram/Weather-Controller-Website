import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { IWishlistItem } from 'src/app/models/IWeatherItem.models';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-detailed-weather',
  templateUrl: './detailed-weather.component.html',
  styleUrls: ['./detailed-weather.component.scss']
})
export class DetailedWeatherComponent implements OnInit {

  @Input() currentWeather: any;
  @Input() selectedCity: any;
  @Input() unit: string = '';
  isFavorite: boolean = false;
  dateNameToday: string = '';
  temperature: number = 30;

  constructor(private wishlistService: WishlistService) { }

  ngOnInit(): void {
    // this.temperature = this.currentWeather.Temperature.Metric.Value;
    console.log(this.unit)
    this.getDayName();
  }

  getDayName(date = new Date(), locale = 'en-US') {
    this.dateNameToday = date.toLocaleDateString(locale, { weekday: 'long' });
  }

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
    const newFavorite: IWishlistItem = {
      id: this.currentWeather.EpochTime, name: this.selectedCity, currentWeather: this.
        currentWeather.WeatherText, tempWeather: this.currentWeather.Temperature.Metric.Value
    }
    if (this.isFavorite) {
      this.wishlistService.addItem(newFavorite)
    }
    else {
      this.wishlistService.deleteItem(this.currentWeather.EpochTime)
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['unit']) {
      this.unit = changes['unit'].currentValue;
    }
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
