import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { MatButtonModule } from '@angular/material/button';
import { MainScreenComponent } from './components/main-screen/main-screen.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { DetailedWeatherComponent } from './components/detailed-weather/detailed-weather.component';
import { WeatherCardsComponent } from './components/weather-cards/weather-cards.component';
import {MatTableModule} from '@angular/material/table';
import { TemperatureConversionPipe } from './pipes/temperature-conversion.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FavoritesComponent,
    MainScreenComponent,
    DetailedWeatherComponent,
    WeatherCardsComponent,
    TemperatureConversionPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
    MatCardModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatTableModule
  ],
  providers: [TemperatureConversionPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
