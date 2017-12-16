import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Track, TrackResult,Comment } from '../shared/shared';


@Component({
  selector: 'data',
  template:''
})
export class TrackController {
 public result :TrackResult = new TrackResult();
  searchquery:string;
  constructor() {
  };
  public getPosts(query:TrackResult):TrackResult{
    for(let i=0;i<100;i++)
    {
      let file="", manager="", title, timespan="",even;
      let comments:Comment[] =[];
      let replies:Comment[]=[];
      if(i % 2 ==0)
        { 
          title="A sample audio recorded by Tom"; 
          file= "https://archive.org/download/testmp3testfile/mpthreetest.mp3";
        manager="Tom Hanks Last Name";
        timespan="10 hrs ago";
        let com = new Comment('Mat Daemon','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        'https://randomuser.me/api/portraits/men/29.jpg',
        "3 mins ago",[]);
        replies.push(com);
        comments.push(new Comment('Mat Daemon','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            'https://randomuser.me/api/portraits/men/73.jpg',
            "3 mins ago",replies));
        even =true;
      } else
       { 
        even =false;
        title="Talking about something by Al"   
         file= "https://archive.org/download/swrembel2010-03-07.tlm170.flac16/swrembel2010-03-07s1t05.mp3";
       manager="Al Pacino Last Name" ;
       timespan="2 hrs ago";

       let com = new Comment('Mostafa Ali','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
       'https://randomuser.me/api/portraits/men/13.jpg',
       "1 min ago",[]);
       replies.push(com);
       comments.push(new Comment('Bill Gates','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
           'https://randomuser.me/api/portraits/men/64.jpg',
           "1 hr ago",replies));
           comments.push(com);
      }
        let tr = new Track(i+ title ,file,null,"http://postlink.com",manager);
        tr.even = even;
        tr.comments= comments;
        tr.timespan= timespan;
        console.log('page'+query.page);
        console.log(query.pagesize);
        if(i<query.page*query.pagesize+1 && i>(query.page-1)*query.pagesize)
          query.tracks.push(tr);
    }
    this.result.total =100;
     for(let i=1;i<100/query.pagesize;i++)
     {
       query.pages.push(i);
     }
    return query;
    
  } 

  
}


