import { Routes } from '@angular/router';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { CountdownComponent } from './countdown/countdown.component';

export const routes: Routes = [
    {
        path: '',
        component: LandingpageComponent,
        pathMatch: 'full',
    },
];
