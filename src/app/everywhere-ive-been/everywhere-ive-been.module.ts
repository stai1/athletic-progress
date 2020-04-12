import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EverywhereIveBeenRoutingModule } from './everywhere-ive-been-routing.module';
import { MapComponent } from './map/map.component';


@NgModule({
  declarations: [
    MapComponent,
  ],
  imports: [
    CommonModule,
    EverywhereIveBeenRoutingModule
  ]
})
export class EverywhereIveBeenModule { }
