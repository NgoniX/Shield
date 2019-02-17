import { AuthService } from './providers/auth.service';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Contact Us',
      url: '/home',
      icon: 'contact'
    },
    {
      title: 'Billing',
      url: '/home',
      icon: 'card'
    },
    {
      title: 'Share',
      url: '/home',
      icon: 'share-alt'
    },
    {
      title: 'Lawyers Forum',
      url: '/home',
      icon: 'information-circle'
    },
    {
      title: 'Feedback',
      url: '/home',
      icon: 'chatboxes'
    },
    {
      title: 'Client Testimonials',
      url: '/home',
      icon: 'quote'
    },
    {
      title: 'Legal Resources',
      url: '/home',
      icon: 'clipboard'
    },
    {
      title: 'Newsletter',
      url: '/home',
      icon: 'contacts'
    },
    {
      title: 'Disclaimer',
      url: '/home',
      icon: 'folder'
    },
    {
      title: 'Privacy Policy',
      url: '/home',
      icon: 'document'
    },
    {
      title: 'Website',
      url: '/home',
      icon: 'globe'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    public auth: AuthService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  // logout
    logout() {
      this.auth.logout();
      this.router.navigate(['home']);
    }

}
