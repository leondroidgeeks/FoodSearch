import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { InfoPageModule } from '../pages/info/info.module';
import { StoreProvider } from '../providers/store/store';
import { AddStorePageModule } from '../pages/add-store/add-store.module';
import { MapProvider } from '../providers/map/map';
import { AddCommentPageModule } from '../pages/add-comment/add-comment.module';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    InfoPageModule,
    HttpClientModule,
    AddStorePageModule,
    AddCommentPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    StoreProvider,
    MapProvider
  ]
})
export class AppModule { }
