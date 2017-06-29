// config factory
import { environment } from '../environments/environment';
import { Config as DevConfig } from './config.dev';
import { Config as ProdConfig } from './config.prod';

var Config: IConfig;
if (environment.production) {
    Config = new ProdConfig();
} else {
    Config = new DevConfig();
}

// IConfig: client side config interface
export interface IConfig {
    BaseURI: string;
    GooglePlacesAPIKey: string;
}

export { Config };