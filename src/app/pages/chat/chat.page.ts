import { ActivatedRoute, Router } from '@angular/router';
import { Component, ViewChild, OnInit } from '@angular/core';
import { IonContent } from '@ionic/angular';

import * as firebase from 'firebase';

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
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  @ViewChild(IonContent) content: IonContent;

  data = { type: '', nickname: '', message: '' };
  chats = [];
  roomname =  '';
  roomkey: string;
  nickname: string;
  offStatus: boolean;

  constructor(private route: ActivatedRoute, private router: Router) {

    this.roomkey = this.route.snapshot.paramMap.get('key') as string;
    this.nickname = this.route.snapshot.paramMap.get('nickname') as string;
    this.data.type = 'message';
    this.data.nickname = this.nickname;

    const joinData = firebase.database().ref('chatrooms/' + this.roomkey + '/chats').push();
    joinData.set({
      type: 'join',
      user: this.nickname,
      message: this.nickname + ' has joined this room.',
      sendDate: Date()
    });
    this.data.message = '';

    firebase.database().ref('chatrooms/' + this.roomkey).on('value', resp => {
      this.roomname = '';
      resp.forEach(childSnapshot => {
        this.roomname = childSnapshot.val();
      });
    });

    firebase.database().ref('chatrooms/' + this.roomkey + '/chats').on('value', resp => {
      this.chats = [];
      this.chats = snapshotToArray(resp);
      setTimeout(() => {
        if (this.offStatus === false) {
          this.content.scrollToBottom(300);
        }
      }, 1000);
    });

   }

  ngOnInit() {
  }

  sendMessage() {
    const newData = firebase.database().ref('chatrooms/' + this.roomkey + '/chats').push();
    newData.set({
      type: this.data.type,
      user: this.data.nickname,
      message: this.data.message,
      sendDate: Date()
    });
    this.data.message = '';
  }

  exitChat() {
    const exitData = firebase.database().ref('chatrooms/' + this.roomkey + '/chats').push();
    exitData.set({
      type: 'exit',
      user: this.nickname,
      message: this.nickname + ' has exited this room.',
      sendDate: Date()
    });

    this.offStatus = true;

    this.router.navigate(['/room', {
      nickname: this.route.snapshot.paramMap.get('nickname')
    }]);

  }

}
