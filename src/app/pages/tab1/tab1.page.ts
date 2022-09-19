import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Post, PostsPaginatedResponse } from '../../../models/Post';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  posts: Post[] = [];

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.loadMoreData();
  }

  loadMoreData(event?): void {
    this.postsService.getPosts().subscribe((res: PostsPaginatedResponse) => {
      this.posts.push(...(res.posts ?? []));
      if (event) {
        event.target.complete();
        if (res.posts.length === 0) {
          event.target.disabled = true;
        }
      }
    });
  }
}
