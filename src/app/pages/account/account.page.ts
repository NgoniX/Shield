import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  accounts = [];

  constructor(private router: Router) {

    firebase.database().ref('acounts/').on('value', resp => {
      this.accounts = [];
      // Percore os registros e seta no array de visualização
      resp.forEach(it => {
        const item = it.val();
        item.key = it.key;
        this.accounts.push(item);
      });
    });

   }

  ngOnInit() {
  }

  addAcount() {
    this.router.navigateByUrl('/account-add');
  }

  edtAcount(key) {
    this.router.navigate(['/account-add', {
      'key': key
    }]);
  }

  delete(acount) {
    firebase.database().ref('acounts/' + acount.key).remove();
  }

}
