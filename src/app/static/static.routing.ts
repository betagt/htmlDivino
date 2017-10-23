import {Routes, RouterModule} from '@angular/router';

import {TemplateComponent} from '../shared/template/template.component';
import {HomeComponent} from './home/home.component';
import {CanActivateViaOAuthGuard} from "../../core/guard/oAuth.guard";

const STAIC_ROUTES: Routes = [
    {
        path: 'home', component: TemplateComponent, canActivate: [CanActivateViaOAuthGuard], children: [
            {path: '', component: HomeComponent},
        ]
    },

];

export const StaticRouting = RouterModule.forChild(STAIC_ROUTES);
