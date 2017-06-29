import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
        <div id="page-wrapper">
            <main>
                <router-outlet></router-outlet>
            </main>
        </div>`,
})

export class AppComponent {
}