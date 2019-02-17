import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  data = { nickname: '' };

  constructor(private router: Router) { }

  ngOnInit() {
  }

  enterNickname() {
    console.log(this.data.nickname);
    this.router.navigate(['/room', {
      nickname: this.data.nickname
    }]);
  }

}
