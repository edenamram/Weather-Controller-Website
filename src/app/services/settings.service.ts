import { SettingsRepository, settingsRepository } from './state/settings.repository';
import { ISettings as ISettingItem } from '../models/ISettings';
import { Injectable } from '@angular/core';

const TemperatureUnitKey = "TEMPERATURE_UNIT";
const DefaultTemperatureUnit = "C";
const FahrenheitTemperatureUnit = "F";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  constructor(
    settingsRepository : SettingsRepository
  ) { }

  setTemperatureUnit(unitValue : string){
    let settingItem : ISettingItem = {
      id : TemperatureUnitKey,
      value : unitValue
    };

     settingsRepository.addOrUpdate(settingItem);
  }   
  
  getTemperatureUnit(){    
    let item = settingsRepository.getById(TemperatureUnitKey);
    if(item != null)
      return item.value;

    return DefaultTemperatureUnit;
  } 
  

  tranformTemperature(value: number): string {
    const unit = this.getTemperatureUnit();

    let result = null;
    if (unit == null) {
      result = value.toString();
    }
    else if (unit === DefaultTemperatureUnit) {
      result = value.toFixed(1);
    } else {
      const fahrenheitValue = (value * 9) / 5 + 32;
      result = fahrenheitValue.toFixed(1);
    }    
    result = `${result} °${unit}`;
    return result;
  }

  changeTempUnit(unitValue : string){
    const unit = unitValue === DefaultTemperatureUnit ? FahrenheitTemperatureUnit : DefaultTemperatureUnit;

    this.setTemperatureUnit(unit);

    return unit;
  }

}
