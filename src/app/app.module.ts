import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ShopPage } from '../pages/shop/shop';
import { ProfilePage } from '../pages/profile/profile';
import { LoginPage } from '../pages/login/login';

import { AuthService } from '../services/authService';
import { StoreDetailPage } from '../pages/store-detail/store-detail';
import { AddProductPage } from '../pages/add-product/add-product';
import { ProductPage } from '../pages/product/product';
import { EditProductPage } from '../pages/edit-product/edit-product';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    TabsPage,
    ShopPage,
    ProfilePage,
    StoreDetailPage,
    ProductPage,
    AddProductPage,
    EditProductPage
  ],
  imports: [
    BrowserModule,
    // IonicModule.forRoot(MyApp)  default
    IonicModule.forRoot(MyApp, {
      scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: false,
      tabsHideOnSubPages: true,
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    TabsPage,
    ShopPage,
    ProfilePage,
    StoreDetailPage,
    ProductPage,
    AddProductPage,
    EditProductPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
