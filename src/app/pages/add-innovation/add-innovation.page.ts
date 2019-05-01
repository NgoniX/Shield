import { AlertController } from '@ionic/angular';
import { AuthService } from './../../providers/auth.service';
import { CrudService } from './../../providers/crud.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-add-innovation',
  templateUrl: './add-innovation.page.html',
  styleUrls: ['./add-innovation.page.scss'],
})
export class AddInnovationPage implements OnInit {

  userID: any;
  userName: any;
  innName: string;
  innPhone: string;
  innDescription: string;

  isLoading = false;


  constructor(private crudService: CrudService,
              private userAuth: AuthService,
              private router: Router,
              private alert: AlertController,
              private loading: LoadingController) { }

  ngOnInit() {
  }

  CreateRecord() {

    const names_arr = ['Radio Cap', 'WhatsApp', 'radio', 'phone', 'ecocash', 'water bike'];

    const record = {};
    const userID = this.userAuth.getUserID(); // get logged in user id
    const userName = this.userAuth.getUserName(); // get logged in user name
    record['UserID'] = userID;
    record['UserName'] = userName;
    record['Name'] = this.innName;
    record['Phone'] = this.innPhone;
    record['Description'] = this.innDescription;

    if (names_arr.includes(this.innName)) {
      this.presentAlert();
    } else {

    this.present();

    this.crudService.create_NewInnovation(record).then(resp => {
      this.userID = '';
      this.userName = '';
      this.innName = '';
      this.innPhone = '';
      this.innDescription = '';
      console.log(resp);
      this.dismiss();
      this.router.navigateByUrl('/innovations');
    })
      .catch(error => {
        console.log(error);
        this.dismiss();
      });
    }

  }

   // show alert message
   async presentAlert() {

    const alert = await this.alert.create({
      header: 'Notice',
      message: 'This Innovation is already registered',
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
