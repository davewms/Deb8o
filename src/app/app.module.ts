import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { NewPostPage } from '../pages/NewPost/NewPost';
import { RecordPage } from '../pages/Record/Record';
import { PlayerPage } from '../pages/player/player';
import { PlayListPage } from '../pages/play-list/play-list';
import { PostConfirmationPage } from '../pages/post-confirmation/post-confirmation';

import { Track } from '../shared/shared';
import { TrackController } from '../shared/Data';

import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    NewPostPage,
    RecordPage,
    PostConfirmationPage,
    PlayerPage,
    PlayListPage,
    Track,
    TrackController,
    ListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    NewPostPage,
    RecordPage,
    PlayerPage,
    PlayListPage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})

export class AppModule {}
