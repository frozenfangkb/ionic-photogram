import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/models/Post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() post: Post = {} as Post;

  constructor() {}

  ngOnInit() {}
}
