import { Injectable } from '@angular/core';
import { selectAllEntities } from '@ngneat/elf-entities';
import {
  } from '@ngneat/elf-persist-state';
import { Observable } from 'rxjs';

  
import { IWishlistItem } from 'src/app/models/IWeatherItem.models';
import { BaseRepository } from './base.repository';

@Injectable({
  providedIn: 'root'
})
export class WishlistItemsRepository extends BaseRepository<IWishlistItem> {
  wishlistItems$: Observable<IWishlistItem[]>;
  constructor(){
    super("wishlistItems");

    this.wishlistItems$ = this.getStore().pipe(selectAllEntities());
  }
}

export const wishlistItemsRepository = new WishlistItemsRepository();