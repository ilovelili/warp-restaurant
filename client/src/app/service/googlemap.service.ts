import { Injectable } from '@angular/core';
import { Position as Pos } from '../model/position';
import { RestaurantClient } from './restaurantclient.service';

@Injectable()
export class GoogleMapService {
    constructor(private restaurantClient: RestaurantClient) { }

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
                /**
                * zoom level:
                    1: World
                    5: Landmass/continent
                    10: City
                    15: Streets
                    20: Buildings
                */
                zoom: 15,
            };

            this.map = this.createMap(mapElement, mapOptions);
            let service: google.maps.places.PlacesService = new google.maps.places.PlacesService(this.map);

            service.nearbySearch(request, callback);
        });
    }

    // set marker on map
    setMarker = (place: google.maps.places.PlaceResult, currentPosition: Pos) => {
        // check map inited or not just in case
        if (!this.map) {
            throw 'map is not initialized';
        }

        this.onGoogleMapLibLoadComplete(() => {
            let placeLoc = place.geometry.location,
                placeId = place.place_id,
                mapOptions = {
                    center: new google.maps.LatLng(currentPosition.latitude, currentPosition.longitude),
                    zoom: 15,
                },
                marker = new google.maps.Marker({
                    map: this.map,
                    position: place.geometry.location
                }),
                infowindow = new google.maps.InfoWindow(),
                service = new google.maps.places.PlacesService(this.map),
                self = this;

            // add click event on marker
            google.maps.event.addListener(marker, 'click', function () {
                // if placeResult saved in server side, fetch it. Otherwise, call google places API
                self.restaurantClient.getPlaceResult(placeId).subscribe((res) => {
                    // data found in database
                    if (res && res.placeResult) {
                        infowindow = self.setInfoWindow(res.placeResult, infowindow);
                        infowindow.open(this.map, this);
                    } else {
                        // not found in database, call googla api
                        service.getDetails({
                            placeId: placeId,
                        }, (place, status) => {
                            if (status === google.maps.places.PlacesServiceStatus.OK) {
                                // save to database (async)
                                self.restaurantClient.createPlaceResult(place).subscribe((res) => {
                                    infowindow = self.setInfoWindow(place, infowindow);
                                    infowindow.open(this.map, this);
                                }, (err) => {
                                    console.error('Create placeResult failed. Please check server side API and database connection');
                                });
                            }
                        });
                    }
                }, (err) => {
                    console.error('Get placeResult failed. Please check server side API and database connection');
                });
            });
        });
    }

    /**
     * set info window for marker
     */
    private setInfoWindow = (place: google.maps.places.PlaceResult, infowindow: google.maps.InfoWindow): google.maps.InfoWindow => {
        let container = '<ul>';
        if (place.reviews && place.reviews.length) {
            place.reviews.forEach(review => {
                container += `
                <li>
                    <i class="fa fa-user"></i><strong>${review.author_name} </strong> 
                    <i class="fa fa-star"></i><strong>${(<any>review).rating} </strong>
                    <i class="fa fa-comment"></i>${review.text}
                </li>`;
            });
        }
        container += '</ul>'

        // website (anchor or pure text)
        let website = place.website ? `<a href="${place.website}" target="_blank"><strong>${place.name}</strong></a><br>` : `<strong>${place.name}</strong><br>`,
            rating = place.rating ? `<i class="fa fa-star"></i> ${place.rating}<br>` : '',
            address = place.formatted_address ? `<i class="fa fa-address-card-o"></i> ${place.formatted_address}<br>` : '',
            phone = place.formatted_phone_number ? `<i class="fa fa-phone"></i> ${place.formatted_phone_number}<br>` : '';

        // https://support.google.com/business/answer/7035772?hl=en
        infowindow.setContent(`
            <div>${website}${rating}${address}${phone}</div>
            <div>
                <i class="fa fa-users"></i> ${container}                                
            </div>
            <div>
                <a class="btn btn-primary" href="https://search.google.com/local/writereview?placeid=${place.place_id}" target="_blank">Write review</a>
            </div>`);

        return infowindow;
    };

    /**
     * Method template
     * wait for google map js lib load completed since async loading
     */
    private onGoogleMapLibLoadComplete = (func: Function) => {
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