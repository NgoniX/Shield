import { Platform, LoadingController } from '@ionic/angular';
import { Component } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Router } from '@angular/router';

// declare var cordova;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  constructor(public platform: Platform,
              public loadingCtrl: LoadingController,
              public socialSharing: SocialSharing,
              private router: Router,
              public fb: Facebook,
              private callNumber: CallNumber) {}

  // liveChat() {

  //   this.platform.ready().then(() => {

  //     cordova.plugins.Whatsapp.send('+263783187321');

  //   });

  // }

  // goToProfile () {
  //   this.router.navigateByUrl('/profile');
  // }

  // goToSubscribe () {
  //   this.router.navigateByUrl('/subscribe');
  // }

  // open call
  call() {
    this.callNumber.callNumber('+263783790230', true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }

  async openSocial(network: string, fab: HTMLIonFabElement) {

    if (network === 'Email') {
        this.socialSharing.shareViaEmail('Body', 'Subject', ['ngonimudzudzu@gmail.com']).then(() => {
          console.log('shareViaEmail: Success');
        }).catch((err) => {
          console.error('shareViaEmail: failed ' + err);
        });
    } else if (network === 'Facebook') {
        this.fb.login(['public_profile', 'user_friends', 'email'])
        .then((res: FacebookLoginResponse) => console.log('Logged into Facebook!', res))
        .catch(e => console.log('Error logging into Facebook', e));

        this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);
    } else if (network === 'Call') {
        this.callNumber.callNumber('+263783790230', true)
        .then(res => console.log('Launched dialer!', res))
        .catch(err => console.log('Error launching dialer', err));
    }

    fab.close();
  }

}
