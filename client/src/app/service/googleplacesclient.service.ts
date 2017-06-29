import { Http } from '@angular/http';
import { RESTClientBase, BaseUrl, GET, Query } from '../util/RESTClientBase';
import { Restaurant } from '../model/restaurant';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

@BaseUrl("https://maps.googleapis.com/maps/api/place/")
@Injectable()
export class GooglePlacesClient extends RESTClientBase {
    constructor(protected http: Http) {
        super(http);
    }
    
    @GET("nearbysearch/json")
    public nearbySearch( @Query('location') location: string, @Query('radius') radius: number, @Query('type') type: string, @Query('key') apikey: string): Observable<Restaurant[]> { return null; };
}