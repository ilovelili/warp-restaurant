import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';

import { AppComponent } from './app.component';
import { HomeComponent } from './component/home.component';
import { PositionService } from './service/position.service';
import { RestaurantClient } from './service/restaurantclient.service';
import { GoogleMapService } from './service/googlemap.service';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(rootRouterConfig, { useHash: true }),
    ],
    providers: [
        PositionService,
        RestaurantClient,
        GoogleMapService,
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
