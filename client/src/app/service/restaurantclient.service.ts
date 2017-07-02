import { Http } from '@angular/http';
import { RESTClientBase, GET, Query, POST, Body } from '../util/restclientbase';
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

    // get place info by id
    @GET("places")
    public getPlaceResult( @Query('placeId') placeId: string): Observable<{placeResult: google.maps.places.PlaceResult}> { return null; };

    // create place info
    @POST("places")
    public createPlaceResult( @Body placeResult: google.maps.places.PlaceResult): Observable<{success: boolean}> { return null; };
}