import { Injectable } from '@angular/core';
  
import { BaseRepository } from './base.repository';
import { ISettings } from 'src/app/models/ISettings';

@Injectable({
  providedIn: 'root'
})
export class SettingsRepository extends BaseRepository<ISettings> {
  constructor(){
    super("settings");
  }
}

export const settingsRepository = new SettingsRepository();