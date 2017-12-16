import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PlayerPage} from '../player/player';
import { Track, getposition } from '../../shared/shared';
@IonicPage()
@Component({
  selector: 'page-play-list',
  templateUrl: 'play-list.html',
})
export class PlayListPage {
  directives : [PlayerPage];  
  private Tracks:[Track] ;
  private CurrentTrackIndex:number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.Tracks =  navParams.get("tracks");
    this.CurrentTrackIndex =  navParams.get("current");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlayListPage');
  }

}
