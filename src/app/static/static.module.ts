import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SharedModule} from '../shared/shared.module';
import {StaticRouting} from './static.routing';
import {RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    StaticRouting
  ],
  declarations: [
    HomeComponent
  ],
  exports: [
    RouterModule
  ],
})
export class StaticModule { }
