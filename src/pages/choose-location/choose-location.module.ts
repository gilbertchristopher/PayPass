import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChooseLocationPage } from './choose-location';

@NgModule({
  declarations: [
    ChooseLocationPage,
  ],
  imports: [
    IonicPageModule.forChild(ChooseLocationPage),
  ],
})
export class ChooseLocationPageModule {}
