import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperatureConversion'
})
export class TemperatureConversionPipe implements PipeTransform {
  transform(value: number, unit: string): string {
    if (unit ==='') {
      return value.toString();
    }

    if (unit === 'C') {
      const celsiusValue = (value - 32) * (5 / 9);
      return celsiusValue.toFixed(1);
    } else if (unit === 'F') {
      const fahrenheitValue = (value * 9) / 5 + 32;
      return fahrenheitValue.toFixed(1);
    }
    return value.toFixed(1);
  }
}
