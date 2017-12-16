import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {RecordPage} from '../Record/Record';
import {PlayerPage} from '../player/player';
import { Track } from '../../shared/shared';
import { PostConfirmationPage } from '../post-confirmation/post-confirmation';
@Component({
  selector: 'page-RecordPage',
  templateUrl: 'NewPost.html',
  
})

export class NewPostPage {
  directives : [PlayerPage,RecordPage, PostConfirmationPage];  
  newtrack : Track;
  //private Tracks:[Track] = [new Track("title1","https://archive.org/download/testmp3testfile/mpthreetest.mp3",100),new Track("title2","https://archive.org/download/testmp3testfile/mpthreetest.mp3",100)];  
  private CurrentTrackIndex:number = 0;
  isRecorded: boolean = false;
  recordStatus: number = 0; //0 for nothing 1 recording 2 recorded
  replayStatus: number = 0; //0 for nothing 1 replaying
  
  istyping:boolean=false;
  @ViewChild('form') form;
  @ViewChild('instructions') instructions;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.newtrack = new Track();
  }

  openrecorder(status:number ) {
    if(status)
     { this.recordStatus =status;
     }
      else{
    switch(this.recordStatus)
    {
      case 0:this.recordStatus =1;break;
      case 1:this.recordStatus =2;break; 
      case 2:this.recordStatus =0;break; 
      
    }
  }
}

replay() {
  switch(this.replayStatus)
  {
    case 0:this.replayStatus =1;break;
    case 1:this.replayStatus =0;break; 
    
  }
}
finishrecord() {
  this.recordStatus = 2;
}
gotorecord()
{
  this.navCtrl.push(RecordPage);
}
submit()
{
  this.recordStatus = 3;
}
notify(e)
{
  this.recordStatus = e;
}
typing(){this.istyping=true;
}
nottyping(){this.istyping=false;
}
get statusname():string{
  switch (this.recordStatus)
  {
    case 0: return "New Post";
    case 1: return "Record";
    case 2: return "Submit";
    case 3: return "Share your post";
    }
}
}
