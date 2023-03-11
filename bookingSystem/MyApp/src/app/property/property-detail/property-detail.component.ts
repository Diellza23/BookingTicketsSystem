import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  NgxGalleryImage,
  NgxGalleryOptions,
  NgxGalleryAnimation,
} from '@kolkov/ngx-gallery';
import { Property } from 'src/app/model/property';
import { HousingService } from 'src/app/services/housing.service';
import { Constants } from 'src/app/Helper/constants';
import { User } from 'src/app/Models/user';
import { CheckoutService } from 'src/app/checkout.service';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.scss'],
})
export class PropertyDetailComponent implements OnInit {
  public propertyId: number;
  public mainPhotoUrl: string = null;
  property = new Property();
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  success: boolean = false;

  amount: Property['price'];
  failure: boolean = false;
  paymentHandler: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private housingService: HousingService,
    private checkout: CheckoutService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.propertyId = +this.route.snapshot.params['id'];
    this.route.data.subscribe((data: Property) => {
      this.property = data['prp'];
      console.log(this.property.photos);
      this.invokeStripe();
    });

    this.property.age = this.housingService.getPropertyAge(
      this.property.estPossessionOn
    );

    // this.route.params.subscribe((params) => {
    //   this.propertyId = +params['id'];
    //   this.housingService.getProperty(this.propertyId).subscribe(
    //     (data: Property) => {
    //       this.property = data;
    //      }
    //   )
    // });

    this.galleryOptions = [
      {
        width: '100%',
        height: '465px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: true,
      },
    ];

    this.galleryImages = this.getPropertyPhotos();
  }

  get isUserlogin() {
    const user = localStorage.getItem(Constants.USER_KEY);
    return user && user.length > 0;
  }

  get user(): User {
    return JSON.parse(localStorage.getItem(Constants.USER_KEY)) as User;
  }
  get isAdmin(): boolean {
    return this.user.roles.indexOf('Admin') > -1;
  }

  changePrimaryPhoto(mainPhotoUrl: string) {
    this.mainPhotoUrl = mainPhotoUrl;
  }

  getPropertyPhotos(): NgxGalleryImage[] {
    const photoUrls: NgxGalleryImage[] = [];
    for (const photo of this.property.photos) {
      if (photo.isPrimary) {
        this.mainPhotoUrl = photo.imageUrl;
      } else {
        photoUrls.push({
          small: photo.imageUrl,
          medium: photo.imageUrl,
          big: photo.imageUrl,
        });
      }
    }
    return photoUrls;
  }

  deleteProperty(id) {
    if (confirm('Do you want to delete this user with this id?' + id)) {
      // return this.http
      //   .delete(`https://localhost:5001/api/user/deleteUser/` + id)
      //   .subscribe();
      // }

      this.housingService.deleteProperty(id).subscribe((result) => {
        console.warn('deleted?', result);
      });
      window.location.reload();
    }
  }

  makePayment(amount) {
    console.log(amount);
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51KT96rDvrPmUXctBJDCqbVugABZ4qrvQfME0eL84GYtx5StvLIM5ocVM4IQDaZXO1gOSgY0cIElzmPktAdIwEtNY00ihZjIULP',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken);
        paymentstripe(stripeToken);
      },
    });

    const paymentstripe = (stripeToken: any) => {
      this.checkout.makePayment(stripeToken).subscribe((data: any) => {
        console.log(data);
        if (data.data === 'success') {
          this.success = true;
          this.alertify.success(
            'Payment completed successfully, you will be redirected to the homepage!'
          );
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 3500);
        } else {
          this.alertify.error("Payment couldn't be completed, try again later");
          this.failure = true;
        }
      });
    };

    paymentHandler.open({
      name: 'Pay through this form',
      description: 'Make this your property, rent or sell!',
      amount: amount,
    });
  }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51KT96rDvrPmUXctBJDCqbVugABZ4qrvQfME0eL84GYtx5StvLIM5ocVM4IQDaZXO1gOSgY0cIElzmPktAdIwEtNY00ihZjIULP',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken);
          },
        });
      };
      window.document.body.appendChild(script);
    }
  }
}
