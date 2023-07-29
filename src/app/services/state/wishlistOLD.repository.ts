import { EventEmitter, Injectable } from '@angular/core';
import { createStore, Store } from '@ngneat/elf';
import { withEntities, selectAllEntities, setEntities, hasEntity, updateEntities, upsertEntities, getAllEntities, getEntity, deleteEntities } from '@ngneat/elf-entities';
import {
    persistState,
    localStorageStrategy,
    sessionStorageStrategy,
  } from '@ngneat/elf-persist-state';
import { Observable } from 'rxjs';

  
import { IWishlistItem } from 'src/app/models/IWeatherItem.models';

const store = createStore(
  { name: 'wishlistItems' },  
  withEntities<IWishlistItem>()
);

export const persist = persistState(store, {
    key: 'wishlist',
    storage: localStorageStrategy,
  });

export const wishlistItems$ = store.pipe(selectAllEntities());

export function setwishlistItems(wishlistItems: IWishlistItem[]) {
  store.update(setEntities(wishlistItems));
}

@Injectable({
  providedIn: 'root'
})
export class WishlistItemsRepository {

  wishlistItems$ = store.pipe(selectAllEntities());

  getStore() : Store{
    return store;
  }

  getAll() : Observable<IWishlistItem[]>{
    return wishlistItems$;
  }  
  
  getById(wishlistItemId : string){
    return store.query(getEntity(wishlistItemId));
  }

  addOrUpdate(wishlistItem : IWishlistItem) : void{
    store.update(upsertEntities(wishlistItem));
  }

  deleteById(id : string){
    store.update(deleteEntities(id));
  }

  setAll(wishlistItems: IWishlistItem[]) : void {
    store.update(setEntities(wishlistItems));
  }    
}

export const wishlistItemsRepository = new WishlistItemsRepository();