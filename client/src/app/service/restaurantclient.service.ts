import { Http } from '@angular/http';
import { RESTClientBase, BaseUrl, GET, Query } from '../util/restclientbase';
import { Restaurant } from '../model/restaurant';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

/**
 * RestaurantClient communicates with server side
 */
@Injectable()
export class RestaurantClient extends RESTClientBase {
    constructor(protected http: Http) {
        super(http);
    }

    // get place detailed info by id
    @GET("places")
    public getRestaurants( @Query('id') id: string): Observable<Restaurant[]> { return null; };

    // // search nearby endpoint
    // @GET("search")
    // public nearbySearch( @Query('location') location: string, @Query('radius') radius: number, @Query('keyword') keyword: string): Observable<Restaurant[]> { return null; };
}