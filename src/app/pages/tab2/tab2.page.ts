import { Component } from '@angular/core';
import { Post } from 'src/models/Post';
import { PostsService } from '../../services/posts.service';
import { UiService } from '../../services/ui.service';
import { NavController } from '@ionic/angular';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  tempImages: string[] = [];
  position = false;
  loadingGeo = false;
  post: Post = {
    message: '',
  };

  constructor(
    private postsService: PostsService,
    private uiService: UiService,
    private navCtrl: NavController,
    private geoLocation: Geolocation
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

  getGeo() {
    if (!this.position) {
      this.post.coords = null;
      return;
    }
    this.loadingGeo = true;

    this.geoLocation
      .getCurrentPosition()
      .then((resp) => {
        this.post.coords = `${resp.coords.latitude}, ${resp.coords.longitude}`;
        this.loadingGeo = false;
      })
      .catch((error) => {
        this.loadingGeo = false;
      });
  }
}
