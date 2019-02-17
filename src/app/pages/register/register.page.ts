import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../providers/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public credential = {
    displayName: '',
    email: '',
    password: ''
  };

  submitted = false;
  isLoading = false;

  constructor(public auth: AuthService,
    private router: Router,
    private loading: LoadingController,
    private alert: AlertController) { }

  ngOnInit() {
  }

  register(form: NgForm) {

    this.submitted = true;

    if (form.valid) {

        this.present();

        this.auth.doRegister(this.credential)
        .then(res => {
          console.log(res);
          this.dismiss();
          this.router.navigateByUrl('/home');
        }, err => {
          console.log(err);
          this.dismiss();
          // present alert
          this.presentAlert();
        });

  }
}

// show alert message
async presentAlert() {

  const alert = await this.alert.create({
    header: 'Error',
    message: 'Login Failed. Please Try Again',
    buttons: ['OK']
  });
  return await alert.present();

}

// show loading icon
async present() {
  this.isLoading = true;
  return await this.loading.create({
    duration: 3000,
  }).then(a => {
    a.present().then(() => {
      console.log('presented');
      if (!this.isLoading) {
        a.dismiss().then(() => console.log('abort presenting'));
      }
    });
  });
}

// dismiss loading icon
async dismiss() {
  this.isLoading = false;
  return await this.loading.dismiss().then(() => console.log('dismissed'));
}

}
