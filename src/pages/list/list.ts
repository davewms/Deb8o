import { Component,QueryList,ViewChildren} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PlayListPage} from '../play-list/play-list';
import { PlayerPage} from '../Player/Player';

import { TrackController} from '../../shared/Data';
import { Track, TrackResult } from '../../shared/shared';
import { Navbar } from 'ionic-angular/components/toolbar/navbar';
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  directives : [PlayerPage];  
  @ViewChildren('cmp') components:QueryList<PlayerPage>;
  name: string = '';
  searchquery: string;
  _timeout: any = null;
  title:string = "Posts";
  
  selectedItem: any;
  icons: string[];

  trackresult:TrackResult;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.name = navParams.get("searchquery");
    this.loadlist();
 
  }
   
  stopall(): void {
    //this.myService.myHTTPCall().subscribe((event) => {
      this.components.forEach((child) => {
        console.log('stopping'+child.CurrentTrack.title);
        child.stop(); })
    //})
  }
  loadlist(page:number=1){
    this.searchquery = this.name;
    
  if(this.searchquery!=null&& this.searchquery.length>0)
  { 
    let tr = new TrackResult(7,page);
    let tc = new TrackController();
    this.trackresult = tc.getPosts(tr);
  }
  }

  displayName() {
    
    if(this._timeout){ //if there is already a timeout in process cancel it
      window.clearTimeout(this._timeout);
    }
    this._timeout = window.setTimeout(() => {
       this._timeout = null;
        this.loadlist();
    },3000);
 }

 openplayer(track) {
   //demo should use trackifd
  let trackindex = this.trackresult.tracks.findIndex(
    mytrack => mytrack.title === track.title
  );
  this.navCtrl.push(PlayListPage,{tracks:this.trackresult.tracks, current:trackindex});
}

getindex(track) : Number{
  let trackindex = this.trackresult.tracks.findIndex(
    mytrack => mytrack.title === track.title
  );
  return trackindex;
}

notify(e)
{ this.stopall();
}
}
