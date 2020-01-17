import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
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

  @ViewChild('profilePic', { static: false }) profilePicRef: ElementRef;

  constructor(private navCtrl: NavController,
              private route:Router,
              private user: UserService) { }

  ngOnInit() {
    this.info$ = this.user.info;
  }

  goToPersonalInfo(){
    this.navCtrl.navigateForward('/tabs/profile/personal-information');
  }

  goToPasswordAndSecurity(){
    this.navCtrl.navigateForward('/tabs/profile/security-password');
  }

  logout(){
    this.route.navigateByUrl('login');
  }

  getAvatar(url: string) {
    if (url === '') {
      return this.avatarSrc = '../../assets/icon/default_profile.svg';
    } else {
      return this.avatarSrc = url;
    }
  }

  picChange(event: any) {
    this.profilePicFile = event.srcElement.files[0];
    this.previewProfilePic(this.profilePicFile);
  }


  previewProfilePic(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (event) => {
      this.profilePicRef.nativeElement.src = event.target['result'];
      this.isProfilePicSelected = true;
    }
  }


}

