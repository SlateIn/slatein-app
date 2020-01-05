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
  avatarSrc = '../../assets/icon/default_profile.svg';
  info$: Observable<UserInfo>;
  isProfilePicSelected = false;
  profilePicFile: File;

  constructor(private navCtrl: NavController,
              private user: UserService) { }

  ngOnInit() {
    this.info$ = this.user.info;
  }

  goToPersonalInfo(){
    this.navCtrl.navigateForward('/tabs/profile/personal-information')
  }

  goToPasswordAndSecurity(){
    this.navCtrl.navigateForward('/tabs/profile/security-password')
  }

  // changeProfilePic(){

  // }

}
