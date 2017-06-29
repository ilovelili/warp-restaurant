import { Injectable } from '@angular/core';

// Provides position related service
@Injectable()
export class PositionService {
    getCurrentPosition = (onSuccess: PositionCallback, onError: PositionErrorCallback): boolean => {
        let options: PositionOptions = {
            enableHighAccuracy: true,
            // timeout: 5000,
            maximumAge: 0
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
            return true;
        }
        else {
            // browser unsupported
            return false;
        }
    };
}