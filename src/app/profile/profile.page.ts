import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

import { UserService } from '../services/user-info.service';
import { Observable } from 'rxjs';
import { UserInfo } from '@models/userInfo';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  avatarSrc: string;
  info$: Observable<UserInfo>;

  constructor(private navCtrl: NavController, private user: UserService) { }

  ngOnInit() {
    this.info$ = this.user.info;
  }

  goToPersonalInfo(){
    this.navCtrl.navigateForward('/tabs/profile/personal-information');
  }

  goToPasswordAndSecurity(){
    this.navCtrl.navigateForward('/tabs/profile/security-password');
  }

  getAvatar(url: string) {
    console.log("this is "+url);
    if (url === '') {
      return this.avatarSrc = '../../assets/icon/default_profile.svg';
    } else {
      return this.avatarSrc = url;
    }
  }

}
