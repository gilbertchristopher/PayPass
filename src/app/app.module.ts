import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Geolocation } from '@ionic-native/geolocation';
import { IonicStorageModule } from '@ionic/storage';
import { Push } from '@ionic-native/push';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ShopPage } from '../pages/shop/shop';
import { ProfilePage } from '../pages/profile/profile';
import { LoginPage } from '../pages/login/login';
import { HistoryPage } from '../pages/history/history';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { HistoryDetailsPage } from '../pages/history-details/history-details';
import { CheckoutPage } from '../pages/checkout/checkout';

import { StoreDetailPage } from '../pages/store-detail/store-detail';
import { AddProductPage } from '../pages/add-product/add-product';
import { ProductPage } from '../pages/product/product';
import { EditProductPage } from '../pages/edit-product/edit-product';
import { RegisrolePage } from '../pages/regisrole/regisrole';
import { RegisterPage } from '../pages/register/register';
import { RegistersellerPage } from '../pages/registerseller/registerseller';
import { StoreInformationPage } from '../pages/store-information/store-information';
import { RegistersellerOpenhourPage } from '../pages/registerseller-openhour/registerseller-openhour';

import { AgmCoreModule } from '@agm/core';


import { AuthService } from '../services/authService';
import { ProductService } from '../services/productService';
import { StoreService } from '../services/storeService';
import { Loc } from '../services/location';
import { HttpClientModule } from '@angular/common/http';
import { HomeSellerPage } from '../pages/home-seller/home-seller';
import { UserService } from '../services/buyerService';
import { ChooseLocationPage } from '../pages/choose-location/choose-location';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { RegisHourPage } from '../pages/regis-hour/regis-hour';
import { FcmProvider } from '../providers/fcm/fcm';
import { OneSignal } from '@ionic-native/onesignal';
import { TransactionDetailsPage } from '../pages/transaction-details/transaction-details';
import { Camera } from '@ionic-native/camera';
import { ChangePasswordPage } from '../pages/change-password/change-password';

import { IntroPage } from '../pages/intro/intro';
//import { Storage } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    HomeSellerPage,
    RegisrolePage,
    RegisterPage,
    RegistersellerPage,
    LoginPage,
    TabsPage,
    ShopPage,
    ProfilePage,
    HistoryPage,
    StoreDetailPage,
    ProductPage,
    AddProductPage,
    EditProductPage,
    StoreInformationPage,
    EditProfilePage,
    HistoryDetailsPage,
    CheckoutPage,
    ChooseLocationPage,
    RegistersellerOpenhourPage,
    TransactionDetailsPage,
    ChangePasswordPage,
    IntroPage,
    RegisHourPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    // IonicModule.forRoot(MyApp)  default
    IonicModule.forRoot(MyApp, {
      scrollPadding: false,
      scrollAssist: false,
      autoFocusAssist: false,
      tabsHideOnSubPages: true,
    }),
    AgmCoreModule.forRoot({apiKey:'AIzaSyDynK315YlFfzTZyQ8ckV5Vzeg6SkomBeE'}),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    HomeSellerPage,
    RegisrolePage,
    RegisterPage,
    RegistersellerPage,
    LoginPage,
    TabsPage,
    ShopPage,
    ProfilePage,
    HistoryPage,
    StoreDetailPage,
    ProductPage,
    AddProductPage,
    EditProductPage,
    StoreInformationPage,
    EditProfilePage,
    HistoryDetailsPage,
    CheckoutPage,
    ChooseLocationPage,
    RegistersellerOpenhourPage,
    TransactionDetailsPage,
    ChangePasswordPage,
    IntroPage,
    RegisHourPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    ProductService,
    StoreService,
    UserService,
    Loc,
    BarcodeScanner,
    Push,
    OneSignal,
    //IonicStorageModule,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation,
    NativeGeocoder,
    FcmProvider,
    Camera,
  ]
})
export class AppModule {}
