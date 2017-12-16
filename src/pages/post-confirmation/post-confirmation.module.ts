import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostConfirmationPage } from './post-confirmation';

@NgModule({
  declarations: [
    PostConfirmationPage,
  ],
  imports: [
    IonicPageModule.forChild(PostConfirmationPage),
  ],
})
export class PostConfirmationPageModule {}

