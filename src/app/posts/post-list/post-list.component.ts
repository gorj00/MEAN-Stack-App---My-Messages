import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  // posts = [
  //   { title: '1st post', content: 'This is the 1st post\'s content' },
  //   { title: '2ndt post', content: 'This is the 2nd post\'s content' },
  //   { title: '3rd post', content: 'This is the 3rd post\'s content' }
  // ];
  posts: Post[] = [];
  private postsSub: Subscription;

  constructor(public postsService: PostsService) { }

  ngOnInit() {
    this.posts = this.postsService.getPosts();
    this.postsSub = this.postsService
      .getPostUpdateListener()
      .subscribe(
        (posts: Post[]) => {
          this.posts = posts;
        }
      );
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }


}
