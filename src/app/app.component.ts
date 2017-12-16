import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { NewPostPage } from '../pages/NewPost/NewPost';
import { RecordPage } from '../pages/Record/Record';
import { PlayerPage } from '../pages/player/player';
import { ListPage } from '../pages/list/list';

import { Keyboard } from '@ionic-native/keyboard';

@Component({
  templateUrl: 'app.html',
  providers: [Keyboard]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,public keyboard:Keyboard) {
    this.initializeApp();

    
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Posts', component: ListPage },
      { title: 'New Post', component: NewPostPage }
      
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.keyboard.onKeyboardShow().subscribe(data => {
        document.body.classList.add('keyboard-is-open');        
     }); 
     this.keyboard.onKeyboardHide().subscribe(data => {
      document.body.classList.remove('keyboard-is-open');        
   }); 
   
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
