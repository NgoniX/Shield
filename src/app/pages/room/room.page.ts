import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router, ActivatedRoute } from '@angular/router';

export const snapshotToArray = snapshot => {
  const returnArr = [];

  snapshot.forEach(childSnapshot => {
      const item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
  });

  return returnArr;
};

@Component({
  selector: 'app-room',
  templateUrl: './room.page.html',
  styleUrls: ['./room.page.scss'],
})

export class RoomPage implements OnInit {

  rooms = [];
  ref = firebase.database().ref('chatrooms/');

  constructor(private router: Router, private route: ActivatedRoute) {

    this.ref.on('value', resp => {
      this.rooms = [];
      this.rooms = snapshotToArray(resp);
    });

  }

  ngOnInit() {
  }

  addRoom() {
    this.router.navigateByUrl('/add-room');
  }

  joinRoom(key) {
    this.router.navigate(['/chat', {
      key: key,
      nickname: this.route.snapshot.paramMap.get('nickname')
    }]);
  }

  delete(room) {
    firebase.database().ref('chatrooms/' + room.key).remove();
  }

}
