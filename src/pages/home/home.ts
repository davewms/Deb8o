import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {NewPostPage} from '../NewPost/NewPost';
import {ListPage} from '../list/list';
import { NgZone } from '@angular/core';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {
  slideroptions: {
    initialSlide: 0,
    direction: 'horizontal', //or vertical
    speed: 300, //0.3s transition
    autoplay: 2000,
    pager: true
  };

  name: string = '';
  public searchquery: string = '';
  _timeout: any = null;
  title:string = "Home";

  constructor(public navCtrl: NavController,public lc: NgZone) {
 
  };
 
 opennewpost() {
      this.navCtrl.push(NewPostPage);
  }
  openlist() {
    this.searchquery = this.name;
    window.setTimeout(() => {
      this.navCtrl.push(ListPage,{searchquery:this.searchquery});
   },200);
    
}

  displayName() {
    
    if(this._timeout){ //if there is already a timeout in process cancel it
      window.clearTimeout(this._timeout);
    }
    this._timeout = window.setTimeout(() => {
       this._timeout = null;
       this.lc.run(() => this.openlist());
    },3000);
 }
}
