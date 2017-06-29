import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { PositionService } from '../service/position.service';
import { RestaurantClient } from '../service/restaurantclient.service';
import { GooglePlacesClient } from '../service/googleplacesclient.service';
import { Restaurant } from '../model/restaurant';
import { Position as Pos } from '../model/position';
import { Config } from 'configs';
import { BaseComponent } from '../base.component';
import { ActivatedRoute } from '@angular/router';

// Import rxjs map operator
import 'rxjs/add/operator/map';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})

export class HomeComponent extends BaseComponent implements OnInit {
    // Declare empty list of restaurant
    private restaurants: Restaurant[] = [];
    private currentPosition: Pos = new Pos();
    private errormsg: string = '';

    constructor(protected activatedRoute: ActivatedRoute, private http: Http, private positionService: PositionService, private restaurantClient: RestaurantClient, private googlePlacesClient: GooglePlacesClient) {
        super(activatedRoute);
    }

    ngOnInit() {
        this.getCurrentPosition();
    }

    // Get current latitude & longitude for google places API
    getCurrentPosition() {
        let result = this.positionService.getCurrentPosition(
            (position) => {
                this.currentPosition.latitude = position.coords.latitude;
                this.currentPosition.longitude = position.coords.longitude;
            },
            (err) => {
                this.errormsg = err.message;
            },
        );

        if (!result) {
            this.errormsg = 'Sorry your browser does not support geolocation API';
        }
    }

    // search near by 

    // todo: CORS issue when using google place API https://stackoverflow.com/questions/15847623/googles-places-api-and-jquery-request-origin-http-localhost-is-not-allowed
    // change my mind: move it to server side~
    search(radius: number) {
        radius = radius || 500;
        let location: string = this.resolveLocation();
        this.googlePlacesClient.nearbySearch(location, radius, 'restaurant', Config.GooglePlacesAPIKey).subscribe(
            (res: any[]) => {
                if (res) {
                    this.restaurants = res.map(data => {
                        console.log(data);
                        return data;
                    });
                }
            },
            (err) => {
                this.LogError(err);
            },
            () => {
                this.LogComplete("Search completed");
            },
        );
    }

    resolveLocation(): string {
        // format: <latitude>,<longtitude>
        return `${this.currentPosition.latitude},${this.currentPosition.longitude}`;
    }
}