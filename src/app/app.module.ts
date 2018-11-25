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
import { RegisrolePage } from '../pages/regisrole/regisrole';
import { RegisterPage } from '../pages/register/register';
import { RegistersellerPage } from '../pages/registerseller/registerseller';

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
    StoreDetailPage
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
    RegisrolePage,
    RegisterPage,
    RegistersellerPage,
    LoginPage,
    TabsPage,
    ShopPage,
    ProfilePage,
    StoreDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
