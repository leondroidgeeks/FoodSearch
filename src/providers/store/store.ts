import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '../../models/store';
import { map } from 'rxjs/operators';

/*
  Generated class for the StoreProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StoreProvider {

  private serverurl: string = "http://food-search-leonschmid.eu-de.mybluemix.net";

  constructor(public http: HttpClient) {
    console.log('Hello StoreProvider Provider');
  }

  loadStores(): Observable<Store[]> {
    return this.http.get(this.serverurl + "/stores").pipe(
      map(res => res as Store[]))
  }

  public uploadStore(store: Store): Observable<any> {
    return this.http.post(this.serverurl + '/stores', store)
  }

}
