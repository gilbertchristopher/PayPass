import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeSellerPage } from './home-seller';

@NgModule({
  declarations: [
    HomeSellerPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeSellerPage),
  ],
})
export class HomeSellerPageModule {}
