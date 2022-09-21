import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post, PostsPaginatedResponse } from '../../models/Post';
import { UserService } from './user.service';
import { ApiResponse } from '../../models/ApiResponse';
import {
  FileUploadOptions,
  FileTransfer,
  FileTransferObject,
} from '@awesome-cordova-plugins/file-transfer/ngx';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  postsPage = 0;
  newPost = new EventEmitter<Post>();

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private fileTransfer: FileTransfer
  ) {}

  getPosts(reset = false): Observable<PostsPaginatedResponse> {
    if (reset) {
      this.postsPage = 0;
    }
    this.postsPage += 1;

    return this.http.get<PostsPaginatedResponse>(
      `${apiUrl}/post/?page=${this.postsPage}`
    );
  }

  createPost(post: Post): Promise<boolean> {
    return new Promise((resolve) => {
      const headers = new HttpHeaders({
        authorization: `Bearer ${this.userService.token}`,
      });

      this.http
        .post<ApiResponse>(`${environment.apiUrl}/post`, post, { headers })
        .subscribe((res) => {
          if (!res.ok) {
            console.error(res.error);
            resolve(false);
          } else {
            this.newPost.emit(res.post);
            resolve(true);
          }
        });
    });
  }

  uploadImage(img: string) {
    const options: FileUploadOptions = {
      fileKey: 'image',
      headers: {
        authorization: `Bearer ${this.userService.token}`,
      },
    };

    const fileTransfer: FileTransferObject = this.fileTransfer.create();

    fileTransfer
      .upload(img, `${environment.apiUrl}/post/upload`, options)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.error(err));
  }
}
