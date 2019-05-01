import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { LoadingController } from '@ionic/angular';
import { AuthService } from './../../providers/auth.service';
import { CrudService } from './../../providers/crud.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-innovations',
  templateUrl: './innovations.page.html',
  styleUrls: ['./innovations.page.scss'],
})
export class InnovationsPage implements OnInit {

  urlSafe: SafeResourceUrl;

  innovations: any;

  access: any;

  user_id: any;
  user_name: any;
  innName: string;
  innPhone: string;
  innDescription: string;

  isLoading = false;

  constructor(private crudService: CrudService,
              public userAuth: AuthService,
              private router: Router,
              private iab: InAppBrowser,
              private loading: LoadingController,
              public sanitizer: DomSanitizer) {

    this.crudService.getUserID(this.userAuth.getUserID()).then(snapshot => {

        this.access = snapshot.docs.map(doc => doc.data()['accessLevel']).toString();
        console.log('Access Level is: ' + this.access);

    });

    // display logged in user id in page
    this.user_id = this.userAuth.getUserID();

    // get current logged user email
    this.user_name = this.userAuth.getUserName();

    console.log('User ID is: ' + this.userAuth.getUserName());

   }

  ngOnInit() {

    this.present();

    // Get All Innovations //////////////////////////////////
    this.crudService.read_Innovations().subscribe(data => {

      this.innovations = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Name: e.payload.doc.data()['Name'],
          Phone: e.payload.doc.data()['Phone'],
          Description: e.payload.doc.data()['Description'],
          UserID: e.payload.doc.data()['UserID'],
          UserName: e.payload.doc.data()['UserName'],
        };
      });

      this.dismiss();
      console.log(this.innovations);

    });

  }

  addInnovation() {
      this.router.navigateByUrl('/add-innovation');
  }
 
  RemoveRecord(rowID) {
    this.crudService.delete_Innovation(rowID);
  }
 
  EditRecord(record) {
    record.isEdit = true;
    record.EditName = record.Name;
    record.EditPhone = record.Phone;
    record.EditDescription = record.Description;
  }
 
  UpdateRecord(recordRow) {
    const record = {};
    record['Name'] = recordRow.EditName;
    record['Phone'] = recordRow.EditPhone;
    record['Description'] = recordRow.EditDescription;
    this.crudService.update_Innovation(recordRow.id, record);
    recordRow.isEdit = false;
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

  // go to Paynow
  goToPaynow() {
    const pstring = btoa('search=hillaryshoniwa@gmail.com&amount=10&reference=SH10001&l=1');
    this.iab.create('https://www.paynow.co.zw/payment/link/?q=' + pstring, '_blank');
  }

}
