import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../model/post';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  url: string = 'http://localhost:3000/post';
  constructor(private http: HttpClient) {}

  //get all posts
  getAllPost(): Observable<Post[]> {
    return this.http.get<Post[]>(this.url);
  }

  // get post by id
  getPostById(id: string): Observable<Post> {
    return this.http.get<Post>(this.url + '/' + id);
  }
  //delete post by id
  deletePostById(id: string): Observable<Post> {
    return this.http.delete<Post>(this.url + '/' + id);
  }

  //update post
  updatePost(post: Post): Observable<Post> {
    return this.http.put<Post>(this.url + '/' + post._id, post);
  }

  //create post

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.url, post);
  }
}
