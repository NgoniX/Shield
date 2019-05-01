import { Component, OnInit } from '@angular/core';
import { PasswordValidator } from '../../validators/password.validator';
import { AuthService } from '../../providers/auth.service';
import { Router } from '@angular/router';
import { NgForm, Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  validation_messages = {
    'displayName': [
      { type: 'required', message: 'Name is required.' }
    ],
    'accessLevel': [
      { type: 'required', message: 'Access Level is required.' }
    ],
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please wnter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number.' }
    ],
    'confirm_password': [
      { type: 'required', message: 'Confirm password is required.' }
    ],
    'matching_passwords': [
      { type: 'areEqual', message: 'Password mismatch.' }
    ]
};

  validations_form: FormGroup;
  matching_passwords_group: FormGroup;

  public credential = {
    displayName: '',
    accessLevel: '',
    email: '',
    password: ''
  };

  submitted = false;
  isLoading = false;

  constructor(public auth: AuthService,
    public formBuilder: FormBuilder,
    private router: Router,
    private loading: LoadingController,
    private alert: AlertController) { }

  ngOnInit() {

    this.matching_passwords_group = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      confirm_password: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    });

    this.validations_form = this.formBuilder.group({
      displayName: new FormControl('', Validators.required),
      accessLevel: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      matching_passwords: this.matching_passwords_group
    });


  }

  register(form: NgForm) {

    this.submitted = true;

    if (form.valid) {

        this.present();

        this.auth.doRegister(this.credential)
        .then(res => {
          console.log(res);

          this.auth.updateUserData(this.credential);

          this.dismiss();
          this.router.navigateByUrl('/innovations');
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
    duration: 9000,
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
