import { Injectable } from '@angular/core';
import { Position as Pos } from '../model/position';

@Injectable()
export class GoogleMapService {
    static seed: number;

    // map property
    private _map: google.maps.Map;
    get map(): google.maps.Map {
        return this._map;
    }
    set map(map: google.maps.Map) {
        this._map = map;
    }

    // create google.maps.Map object
    createMap = (mapElement: HTMLElement, mapOptions?: google.maps.MapOptions): google.maps.Map => new google.maps.Map(mapElement, mapOptions);

    // nearby search
    nearbySearch = (position: Pos, radius: number, keyword: string, type: string, mapElement: HTMLElement, callback: (placeResults: google.maps.places.PlaceResult[], placeServiceStatus: google.maps.places.PlacesServiceStatus, placeSearchPagination: google.maps.places.PlaceSearchPagination) => void) => {
        this.onGoogleMapLibLoadComplete(() => {
            let pyrmont: google.maps.LatLng = new google.maps.LatLng(position.latitude, position.longitude);
            let request: google.maps.places.PlaceSearchRequest = {
                location: pyrmont,
                radius: radius,
                type: type,
                keyword: keyword,
            };

            let mapOptions = {
                center: pyrmont,
                zoom: 15, // hard code
            };

            this.map = this.createMap(mapElement, mapOptions);
            let service: google.maps.places.PlacesService = new google.maps.places.PlacesService(this.map);

            service.nearbySearch(request, callback);
        });
    }

    // set marker on map
    setMarker = (place: google.maps.places.PlaceResult, currentPosition: Pos) => {
        if (!this.map) {
            throw 'map is not initialized';
        }

        this.onGoogleMapLibLoadComplete(() => {
            let placeLoc = place.geometry.location,
                mapOptions = {
                    center: new google.maps.LatLng(currentPosition.latitude, currentPosition.longitude),
                    zoom: 15, // hard code
                },

                marker = new google.maps.Marker({
                    map: this.map,
                    position: place.geometry.location
                }),

                infowindow = new google.maps.InfoWindow();

            google.maps.event.addListener(marker, 'click', function () {
                infowindow.setContent(place.name);
                infowindow.open(this.map, this);
            });
        });
    }

    /**
     * Method template
     * wait for google map js lib load completed since async loading
     */
    onGoogleMapLibLoadComplete = (func: Function) => {
        if (google.maps && google.maps.places) {
            window.clearInterval(GoogleMapService.seed);
            // run func after loaded
            func();
        } else if (!GoogleMapService.seed) {
            // set polling interval to 1000ms
            GoogleMapService.seed = window.setInterval(this.onGoogleMapLibLoadComplete(func), 1000);
        }
    };
}