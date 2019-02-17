import { Platform } from '@ionic/angular';
import { Component } from '@angular/core';

declare var cordova;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  constructor(public platform: Platform) {}

  liveChat() {

    this.platform.ready().then(() => {

      cordova.plugins.Whatsapp.send('+263783187321');

    });

  }

}
