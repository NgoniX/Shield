import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.page.html',
  styleUrls: ['./add-room.page.scss'],
})
export class AddRoomPage implements OnInit {

  data = { roomname: '' };
  ref = firebase.database().ref('chatrooms/');

  constructor(private router: Router) { }

  ngOnInit() {
  }

  addRoom() {
    const newData = this.ref.push();
    newData.set({
      roomname: this.data.roomname
    });
    this.router.navigate(['/room']);
  }

}
