import { Component } from '@angular/core';
import { Post } from 'src/models/Post';
import { PostsService } from '../../services/posts.service';
import { UiService } from '../../services/ui.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  tempImages: string[] = [];
  post: Post = {
    message: '',
  };

  constructor(
    private postsService: PostsService,
    private uiService: UiService,
    private navCtrl: NavController
  ) {}

  async createPost(): Promise<void> {
    if (await this.postsService.createPost(this.post)) {
      this.uiService.sendToastMessage('bottom', 'Post published successfully');
      this.post = {
        message: '',
      };
      this.navCtrl.navigateRoot('/main/tabs/tab1');
    } else {
      this.uiService.sendToastMessage(
        'bottom',
        'There was an error publishing your post'
      );
    }
  }
}
