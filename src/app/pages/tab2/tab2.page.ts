import { Component } from '@angular/core';
import { Post } from 'src/models/Post';
import { PostsService } from '../../services/posts.service';
import { UiService } from '../../services/ui.service';
import { NavController } from '@ionic/angular';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';

declare const window: any;

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
    private geoLocation: Geolocation,
    private camera: Camera
  ) {}

  async createPost(): Promise<void> {
    if (await this.postsService.createPost(this.post)) {
      this.uiService.sendToastMessage('bottom', 'Post published successfully');
      this.post = {
        message: '',
      };
      this.tempImages = [];
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

  takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA,
    };
    this.processImage(options);
  }

  library() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    };
    this.processImage(options);
  }

  processImage(options: CameraOptions) {
    this.camera.getPicture(options).then(
      (imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        const img = window.Ionic.WebView.convertFileSrc(imageData);
        this.tempImages.push(img);
        this.postsService.uploadImage(imageData);
      },
      (err) => {
        // Handle error
      }
    );
  }
}
