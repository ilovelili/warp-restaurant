import { IConfig } from './';

export class Config implements IConfig {
    // baseURI to call server side API (overwriteable)
    get BaseURI() {
        return "http://localhost:3000/api/";
    } 

    // Google places API key
    get GooglePlacesAPIKey() {
        return "AIzaSyBNFF56h-R0Op9gcaTWmR9pVL2qCI3jJ6c";
    } 
};