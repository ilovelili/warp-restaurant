import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PositionService } from '../service/position.service';
import { GoogleMapService } from '../service/googlemap.service';
import { Position as Pos } from '../model/position';
import { Config } from 'config';
import { BaseComponent } from '../base.component';
import { ActivatedRoute } from '@angular/router';

// Import rxjs map operator
import 'rxjs/add/operator/map';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})

export class HomeComponent extends BaseComponent implements OnInit, AfterViewInit {
    // Declare empty list of restaurant
    private results: google.maps.places.PlaceResult[] = [];
    private currentPosition: Pos = new Pos();
    private errormsg: string = '';
    private mapElement: HTMLElement;

    constructor(protected activatedRoute: ActivatedRoute, private positionService: PositionService, private googleMapService: GoogleMapService) {
        super(activatedRoute);
    }

    ngOnInit() {
        this.getCurrentPosition();
    }

    ngAfterViewInit() {
        this.mapElement = document.getElementById('map');
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

    // search nearby 
    search(radius: number, keyword: string) {
        radius = radius || 500;
        keyword = keyword || '';

        this.googleMapService.nearbySearch(this.currentPosition, radius, keyword, 'restaurant', this.mapElement, (placeResults, placeServiceStatus, placeSearchPagination) => {
            if (placeServiceStatus == google.maps.places.PlacesServiceStatus.OK) {
                this.results = placeResults;
                placeResults.forEach(placeResult => {
                    this.googleMapService.setMarker(placeResult, this.currentPosition);
                });

                this.LogComplete('search complete');
            }
        });
    }
}