import { Pipe, PipeTransform } from '@angular/core';
import { SettingsService } from '../services/settings.service';

@Pipe({
  name: 'convertTemp',
  pure : false
})
export class TemperatureConversionPipe implements PipeTransform {
  constructor(private settingsService : SettingsService){
  }

  transform(value: number): string {    
    return this.settingsService.tranformTemperature(value);    
  }
}
