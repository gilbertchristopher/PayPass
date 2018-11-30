import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScanConfirmationPage } from './scan-confirmation';

@NgModule({
  declarations: [
    ScanConfirmationPage,
  ],
  imports: [
    IonicPageModule.forChild(ScanConfirmationPage),
  ],
})
export class ScanConfirmationPageModule {}
