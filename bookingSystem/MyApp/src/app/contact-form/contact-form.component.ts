import { Component, OnInit } from '@angular/core';
import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ResponseCode } from '../enums/responseCode';
import { ConfirmModalComponent } from '../modal-components/confirm-modal/confirm-modal.component';
import { Post } from '../model/post';
import { AlertifyService } from '../services/alertify.service';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit {
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

  constructor(
    private dataService: DataService,
    private alertify: AlertifyService,
    private modalService: BsModalService
  ) {}

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

  // deletePostById(post: Post) {
  //   if (
  //     window.confirm(
  //       'Are you sure you want to delete post with id: ' + post._id
  //     )
  //   ) {
  //     this.dataService.deletePostById(post._id).subscribe(
  //       (res) => {
  //         this.allPosts = [];
  //         this.getAllPost();
  //       },
  //       (err) => {
  //         console.log(err);
  //       }
  //     );
  //   }
  // }

  deletePostById(post: Post) {
    const initialState: ModalOptions = {
      initialState: {
        message: 'Do you want to delete?',
        confirmTitle: 'Yes',
        declineTitle: 'No',
      },
    };
    const bsModalRef = this.modalService.show(
      ConfirmModalComponent,
      initialState
    );
    bsModalRef.content.modalResponse.subscribe((result) => {
      if (result) {
        this.dataService.deletePostById(post._id).subscribe(
          (res) => {
            this.alertify.success('Contact message deleted successfully!');
            this.allPosts = [];
            this.getAllPost();
          },
          (err) => {
            this.alertify.error('Contact message could not be deleted');
          }
        );
      }
    });
  }

  createPost() {
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
