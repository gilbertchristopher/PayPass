import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Geolocation } from '@ionic-native/geolocation';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ShopPage } from '../pages/shop/shop';
import { ProfilePage } from '../pages/profile/profile';
import { LoginPage } from '../pages/login/login';
import { HistoryPage } from '../pages/history/history';
import { ScanConfirmationPage } from '../pages/scan-confirmation/scan-confirmation'

import { StoreDetailPage } from '../pages/store-detail/store-detail';
import { AddProductPage } from '../pages/add-product/add-product';
import { ProductPage } from '../pages/product/product';
import { EditProductPage } from '../pages/edit-product/edit-product';
import { RegisrolePage } from '../pages/regisrole/regisrole';
import { RegisterPage } from '../pages/register/register';
import { RegistersellerPage } from '../pages/registerseller/registerseller';
import { StoreInformationPage } from '../pages/store-information/store-information';

import { AgmCoreModule } from '@agm/core';


import { AuthService } from '../services/authService';
import { ProductService } from '../services/productService';
import { StoreService } from '../services/storeService';
import { Loc } from '../services/location';
import { HttpClientModule } from '@angular/common/http';
import { BuyerService } from '../services/buyerService';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegisrolePage,
    RegisterPage,
    RegistersellerPage,
    LoginPage,
    TabsPage,
    ShopPage,
    ProfilePage,
    HistoryPage,
    ScanConfirmationPage,
    StoreDetailPage,
    ProductPage,
    AddProductPage,
    EditProductPage,
    StoreInformationPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    // IonicModule.forRoot(MyApp)  default
    IonicModule.forRoot(MyApp, {
      scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: false,
      tabsHideOnSubPages: true,
    }),
    AgmCoreModule.forRoot({apiKey:'AIzaSyDynK315YlFfzTZyQ8ckV5Vzeg6SkomBeE'}),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RegisrolePage,
    RegisterPage,
    RegistersellerPage,
    LoginPage,
    TabsPage,
    ShopPage,
    ProfilePage,
    HistoryPage,
    ScanConfirmationPage,
    StoreDetailPage,
    ProductPage,
    AddProductPage,
    EditProductPage,
    StoreInformationPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    ProductService,
    StoreService,
    BuyerService,
    Loc,
    BarcodeScanner,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

