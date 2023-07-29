import { createStore, Store } from '@ngneat/elf';
import { withEntities, setEntities, upsertEntities, getEntity, deleteEntities, selectAllEntities } from '@ngneat/elf-entities';
import {
    persistState,
    localStorageStrategy,
  } from '@ngneat/elf-persist-state';
import { Observable } from 'rxjs';
import { IBaseEntity } from 'src/app/models/base.model';

export class BaseRepository<T extends IBaseEntity> {
  store: any;
  persist: any;

  constructor(storeName : string){
    this.store = createStore(
      { name: storeName },  
      withEntities<T>()
    ); 

    this.persist = persistState(this.store , {
      key: storeName,
      storage: localStorageStrategy,
    });
  }    
  
  
    getStore() : Store{
      return this.store;
    }
    
    getAll() : Observable<T[]> {
      return this.store.pipe(selectAllEntities());
    }
    
    getById(wishlistItemId : string){
      return this.store.query(getEntity(wishlistItemId));
    }
  
    addOrUpdate(item : T) : void{
      this.store.update(upsertEntities(item));
    }
  
    deleteById(id : string){
      this.store.update(deleteEntities(id));
    }
  
    setAll(items: T[]) : void {
      this.store.update(setEntities(items));
    }    
  }

