import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

/*
  Generated class for the MapProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MapProvider {

  apiKey: string = "";

  constructor(public http: HttpClient) {
    console.log('Hello MapProvider Provider');
  }

  geocode(address: string): Observable<any> {
    return this.http.get('https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?limit=1&access_token=' + this.apiKey).pipe(
      map(data => data as any),
      map(data => {
        var result = {};
        result['address'] = data.features[0].place_name;
        result['location'] = data.features[0].center;
        return result;
      })
    )
  }

}
