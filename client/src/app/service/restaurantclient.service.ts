import { Http } from '@angular/http';
import { RESTClientBase, BaseUrl, GET, Query } from '../util/RESTClientBase';
import { Restaurant } from '../model/restaurant';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

/**
 * RestaurantClient communicates with cache server, trying to get the restaurant info saved in database. If no data found, we call google place api instead
 */
@Injectable()
export class RestaurantClient extends RESTClientBase {
    constructor(protected http: Http) {
        super(http);
    }

    @GET("places")
    public getRestaurants( @Query('id') id: string): Observable<Restaurant[]> { return null; };
}