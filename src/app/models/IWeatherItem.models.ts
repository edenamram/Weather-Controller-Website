import { IBaseEntity } from "./base.model";

export interface IWishlistItem extends IBaseEntity {
  name: string;
  currentWeather: string;
  tempWeather: string;
}