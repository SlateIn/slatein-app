import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ModalController, AlertController } from '@ionic/angular';
import { UserService } from '../services/user-info.service';
import { Observable } from 'rxjs';
import { UserInfo } from '@models/userInfo';
import { AuthService } from '@services/auth.service';
import { SettingsPage } from './settings/settings.page';
import { PersonalInformationPage } from './personal-information/personal-information.page';
import { SecurityPasswordPage } from './security-password/security-password.page';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  avatarSrc = '../../assets/icon/default_profile.svg';
  info$: Observable<UserInfo>;

  constructor(private navCtrl: NavController,
              private user: UserService,
              private authService: AuthService,
              private modalController: ModalController,
              public alertController: AlertController,
              private ngZone: NgZone) { }

  ngOnInit() {
    this.info$ = this.user.info;
  }

  async goToPersonalInfo() {
    const personalInfo = await this.modalController.create({
      component: PersonalInformationPage
    });
    return await personalInfo.present();
  }

  async goToPasswordAndSecurity() {
    const security = await this.modalController.create({
      component: SecurityPasswordPage
    });
    return await security.present();
  }

  async goToSettingsPage() {
    const settings = await this.modalController.create({
      component: SettingsPage
    });
    return await settings.present();
  }

  async logout() {
    const alert = await this.alertController.create({
      header: 'Logout',
      message: 'Do you really want to logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'Yes',
          handler: () => {
            this.ngZone.run(()=> {
              this.authService.logout().then(()=>this.navCtrl.navigateRoot('/login'));
            });
          }
        }
      ]
    });

    await alert.present();
  }

}

