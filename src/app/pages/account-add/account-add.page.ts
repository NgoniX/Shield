import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-account-add',
  templateUrl: './account-add.page.html',
  styleUrls: ['./account-add.page.scss'],
})
export class AccountAddPage implements OnInit {

  key = null;
  account = { description: '' };

  constructor(private route: ActivatedRoute, private router: Router) {

    this.key = this.route.snapshot.paramMap.get('key') as string;
    if (this.key != null) {
      firebase.database().ref('acounts/' + this.key).on('value', resp => {
        this.account = resp.val();
      });
    } else {
      this.account.description = '';
    }

  }

  save() {
    if (this.key != null) {
      firebase.database().ref('acounts/' + this.key).set({description: this.account.description});
    } else {
      firebase.database().ref('acounts/').push().set({
        description: this.account.description
      });
    }
    this.router.navigate(['/account']);
  }

  ngOnInit() {
  }

}
