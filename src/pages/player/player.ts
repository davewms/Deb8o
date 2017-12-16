import { Component,Input,Output,Provider,EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Track, getposition } from '../../shared/shared';
import { AudioProvider } from 'ionic-audio';
import { isActivatable } from 'ionic-angular/tap-click/tap-click';

@IonicPage()
@Component({
  selector: 'player',
  templateUrl: 'player.html',
})

export class PlayerPage {
  @Output() notify: EventEmitter<number> = new EventEmitter<number>();
  @Input() Tracks:[Track] ;//= [new Track('title1','https://archive.org/download/testmp3testfile/mpthreetest.mp3',100),
  //new Track('title2','https://archive.org/download/testmp3testfile/mpthreetest.mp3',100)];
  @Input() CurrentTrackIndex;//:number=0;
  @Input() isLocal:boolean;//:number=0;
  @Input() IsMicro:boolean =false;//:number=0;
    ngOnInit() {
      this.getcurrenttrack(); 
    }
   
  isPlaying: boolean=false;
  showcomments: boolean=true;
  myaudio:any;
  playstatus:number;
  CurrentTrack : Track;
  me:any;
  
  isactive:boolean =true;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    //let active = this.navCtrl.last().instance instanceof PlayerPage;
    
  }
  deletetrack(){
    
  }
  checkisactive(){
    this.isactive= (this.navCtrl.getActive().name == "PlayListPage" || this.navCtrl.getActive().name == "NewPostPage"|| this.navCtrl.getActive().name == "ListPage");
    if(!this.isactive && this.isPlaying || !this.CurrentTrack.isPlaying)
    {
        this.stop();
    }
  }
  public getcurrenttrack()
  {
    if(this.Tracks!=null)
    {this.CurrentTrack =  this.Tracks[this.CurrentTrackIndex];
    if(!this.IsMicro)
      this.play();
    }
  }
  ionViewDidLoad() {
    
  }
  
  seek(evt){
    var self = this;
    this.myaudio.currentTime = this.myaudio.duration*evt.value/100;
  }
  next(){
    if(this.isPlaying)
        this.stop();
        window.setTimeout(()=>{
        this.CurrentTrackIndex+=1;
        this.getcurrenttrack()
        this.play();}
      ,200)

  }
  previous(){
    if(this.isPlaying)
      this.stop();
    this.CurrentTrackIndex-=1;
    this.getcurrenttrack()
    this.play();
  }
expand()
{this.showcomments=!this.showcomments;}
  play()
  {
    if(this.IsMicro)
      {
        
        this.notify.emit(1);}
    var self = this;
    if(this.myaudio !=null && this.myaudio.paused)
      {
        this.myaudio.play();
        this.isPlaying = true;
        return;}
      if(this.myaudio!=null)
        return;

    this.myaudio = new Audio(this.CurrentTrack.src);
    this.isPlaying = true;
    var readyStateInterval = null;
    this.myaudio.play();
    this.CurrentTrack.isPlaying = true;
    readyStateInterval = setInterval(function(this){
      if (this.readyState <= 2) {
        //playButton.style.display = 'none';
        //activityIndicator.style.display = 'block';
        //textPosition.innerHTML = 'loading...';
        this.playstatus=this.readyState;
      }
   },1000);
   
   this.myaudio.addEventListener("loadedmetadata", function(evt){
     self.CurrentTrack.duration = this.duration;
     self.CurrentTrack.end = getposition(self.CurrentTrack.duration);
    });
    
   this.myaudio.addEventListener("timeupdate", function(this) {
      var s = parseInt((this.currentTime % 60).toString());
      var m = parseInt(((this.currentTime / 60) % 60).toString());
      var h = parseInt((((this.currentTime / 60) / 60) % 60).toString());
      if (this.isPlaying && this.currentTime > 0) {
        //textPosition.innerHTML = pad2(h) + ':' + pad2(m) + ':' + pad2(s);
      }
      self.CurrentTrack.position = this.currentTime;
      self.CurrentTrack.start = getposition(this.currentTime);
      self.checkisactive()
   }, false);
   this.myaudio.addEventListener("error", function() {
      console.log('myaudio ERROR');
   }, false);
   this.myaudio.addEventListener("canplay", function() {
      console.log('myaudio CAN PLAY');
   }, false);
   this.myaudio.addEventListener("waiting", function() {
      //console.log('myaudio WAITING');
      this.isPlaying = false;
      //playButton.style.display = 'none';
      //stopButton.style.display = 'none';
      //activityIndicator.style.display = 'block';
   }, false);
   this.myaudio.addEventListener("playing", function() {
      this.isPlaying = true;
      //playButton.style.display = 'none';
      //activityIndicator.style.display = 'none';
      //stopButton.style.display = 'block';
   }, false);
   this.myaudio.addEventListener("ended", function() {
      self.stop();
   }, false);
  }
  pause() {
		this.isPlaying = false;
    //clearInterval(readyStateInterval);
    if(this.myaudio)
    		this.myaudio.pause();
		//stopButton.style.display = 'none';
		//activityIndicator.style.display = 'none';
		//playButton.style.display = 'block';
	}
	stop() {
		this.isPlaying = false;
    //clearInterval(readyStateInterval);
    if(this.myaudio)
    		this.myaudio.pause();
		//stopButton.style.display = 'none';
		//activityIndicator.style.display = 'none';
		//playButton.style.display = 'block';
		this.myaudio = null;
		//myaudio = new Audio(myaudioURL);
		//textPosition.innerHTML = '';
	}
}
