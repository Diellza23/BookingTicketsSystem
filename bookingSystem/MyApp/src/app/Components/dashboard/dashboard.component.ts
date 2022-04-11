import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/model/post';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  post: Post = {
    _id: '',
    title: '',
    content: '',
    username: '',
  };
  _id: string = '';
  title: string = '';
  content: string = '';
  username: string = '';

  allPosts: Post[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this._id = '';
    this.title = '';
    this.content = '';
    this.username = '';
    this.allPosts = [];
    this.getAllPost();
  }

  getAllPost() {
    this.dataService.getAllPost().subscribe((res) => {
      this.allPosts = res;
    }),
      (err) => {
        console.log(err);
      };
  }

  getPostById(post: Post) {
    this.dataService.getPostById(post._id).subscribe(
      (res) => {
        post = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deletePostById(post: Post) {
    if (
      window.confirm(
        'Are you sure you want to delete post with id: ' + post._id
      )
    ) {
      this.dataService.deletePostById(post._id).subscribe(
        (res) => {
          this.allPosts = [];
          this.getAllPost();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  createPost(post: Post) {
    this.post.username = this.username;
    this.post.title = this.title;
    this.post.content = this.content;
    this.dataService.createPost(this.post).subscribe(
      (res) => {
        this.ngOnInit();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  editPost(post: Post) {
    this.getPostById(post);
    this._id = post._id;
    this.title = post.title;
    this.content = post.content;
    this.username = post.username;
  }

  updatePost() {
    if (this.title == '' || this.content == '' || this.username == '') {
      alert('Please fill all the values');
      return;
    }
    this.post._id = this._id;
    this.post.title = this.title;
    this.post.content = this.content;
    this.post.username = this.username;

    this.dataService.updatePost(this.post).subscribe(
      (res) => {
        this.ngOnInit();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
