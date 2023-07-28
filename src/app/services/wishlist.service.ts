import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { WishlistItemsRepository, wishlistItemsRepository } from './state/wishlist.repository';
import { IWishlistItem } from '../models/IWeatherItem.models';

@Injectable({
  providedIn: 'root'
})

export class WishlistService {
  private readonly baseUrl = 'http://dataservice.accuweather.com';
  private readonly apiKey = environment.apiKey;

  constructor(
    wishlistRepository : WishlistItemsRepository
  ) { }

  addItem(item : IWishlistItem){
    wishlistItemsRepository.addOrUpdate(item);
  }
  
  deleteItem(id : string){
    wishlistItemsRepository.deleteById(id);
  }

  getAllItems() : Observable<IWishlistItem[]>{
    return wishlistItemsRepository.getAll();
  }
}
