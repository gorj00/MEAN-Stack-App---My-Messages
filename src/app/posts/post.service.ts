import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Post } from '../posts/post.model';

// Alternative to declaration in app.module
@Injectable({ providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated =  new Subject<Post[]>();

  getPosts() {
    // Copy of the array (even though a reference type)
    return [...this.posts];
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = { title, content };
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }
}
