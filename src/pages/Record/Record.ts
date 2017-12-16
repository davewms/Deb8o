import { Input, Output, Component,EventEmitter } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import { Platform } from 'ionic-angular';
import {PlayerPage} from '../player/player';
import { Track, getposition } from '../../shared/shared';
import { AlertController } from 'ionic-angular';
@Component({
  selector: 'recorder',
  templateUrl: 'Record.html',
  providers: [ Media, File ]
})

export class RecordPage {
  directives : [PlayerPage];  
  @Output() notify: EventEmitter<number> = new EventEmitter<number>();
  private Tracks:[Track] ;
  private CurrentTrackIndex:number = 0;

  isRecorded: boolean = false;
  recordStatus: number = 0; //0 for nothing 1 recording 2 recorded
  duration:number=0;
  
  m:any;
  media:Media;
  file:File;
  filename:string= "TempRecordingDeb8o.mp3"
  constructor(platform: Platform, media: Media, file: File,private alertCtrl: AlertController) {
    
    this.media= media;
    this.file = file;
    // platform.ready()
    //   .then(() => {
    //     let stopCount = 0;
    //   });
  }
  openrecorder(status:number ) {
    if(status)
     { this.recordStatus =status;
     }
      else{
    switch(this.recordStatus)
    {
      case 0:this.startrecord();break;
      case 1:this.stoprecord();;break;
      case 2:
      let alert = this.alertCtrl.create({
        title: 'Cancel Recording',
        message: 'Delete recording and start over?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              
            }
          },
          {
            text: 'Yes, Delete',
            handler: () => {
              this.recordStatus =0;this.Tracks=null;this.duration=0;
            }
          }
        ]
      });
      alert.present();
      break;
    }
    this.notify.emit(this.recordStatus);
  }
}
addtimer(){
  if(this.recordStatus !=1)
  return;
  this.duration+=1;
  setTimeout(() => {
    this.addtimer();
  }, 1000);

}
startrecord(){
try{
  //demo web
  //this.recordStatus =1;
  //  

  this.recordStatus =1;
    this.addtimer();
    this.m = this.media.create(this.filename);
    this.m.startRecord();
    //setTimeout(() => {
    //   if(this.recordStatus ==1)
    //   {this.duration+=1;}
    // }, 1000);
  //alert('started');
}catch(e){alert(e);}
}

stoprecord(){
try{
  //demo web
  // this.recordStatus =2;
  // this.addtrack('http://www.');
  // this.notify.emit(this.recordStatus);
  //
  this.m.stopRecord();
  this.m.release();
  //alert('stopped');
  this.file.resolveLocalFilesystemUrl(this.file.externalRootDirectory + this.filename)
  .then(r => this.addtrack(r))
  .catch(e => alert(e));
  this.recordStatus = 2;
  this.notify.emit(this.recordStatus);
}catch(e){alert(e);} 
}

addtrack(r){
    this.Tracks = [new Track("Recorded",r.nativeURL,this.duration)];  
    
}

get durationtext(){
  return getposition(this.duration);
}

}