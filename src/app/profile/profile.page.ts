import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  avatarSrc = '../../assets/icon/default_profile.svg';
  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  goToPersonalInfo(){
    this.navCtrl.navigateForward('/tabs/profile/personal-information')
  }

  goToPasswordAndSecurity(){
    this.navCtrl.navigateForward('/tabs/profile/security-password')
  }

}
