import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage} from '../home/home';
import { ListPage } from '../list/list';
@IonicPage()
@Component({
  selector: 'postconfirmation',
  templateUrl: 'post-confirmation.html',
})
export class PostConfirmationPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostConfirmationPage');
  }
  navigate(target) {
    if(target == 'List')
      this.navCtrl.push(ListPage);
      if(target == 'Home')
      this.navCtrl.push(HomePage);
      if(target == 'Post')
      this.navCtrl.push(ListPage);
}
}
