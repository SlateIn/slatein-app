import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user-info.service';
import { Observable } from 'rxjs';
import { UserInfo } from '@models/userInfo';
import { DatePipe } from '@angular/common';
import { MaxLengthValidator } from '@angular/forms';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.page.html',
  styleUrls: ['./personal-information.page.scss'],
})
export class PersonalInformationPage implements OnInit {
  upgateButtonClicked = false;
  userInfo = {} as UserInfo;

  itemRef: AngularFireObject<UserInfo>;
  item: Observable<UserInfo>;
  info$: Observable<UserInfo>;

  constructor(private user: UserService, public datepipe: DatePipe, public db: AngularFireDatabase) {
    this.itemRef = db.object('item');
    this.item = this.itemRef.valueChanges();
   }

  ngOnInit() {
    this.info$ = this.user.info;

    this.user.info.subscribe( user => {
      this.userInfo.fname = user.fname;
      this.userInfo.lname = user.lname;
      this.userInfo.birthdate = this.formatDate(user.birthdate);
      this.userInfo.gender = user.gender;
      this.userInfo.email = user.email;
      this.userInfo.photoURL = user.photoURL;
    });
  }

  formatDate(date: string) {
    return this.datepipe.transform(date, 'MM-dd-yyyy');
  }

  onUpdateInfoClick() {
    this.upgateButtonClicked = true;
  }

  onSaveInfoClicked() {
    this.upgateButtonClicked = false;

    // this.userInfo = {
    //   fname: this.firstName,
    //   lname: this.lastName,
    //   birthdate: this.birthDate,
    //   gender: this.gender,
    //   email: this.email,
    //   photoURL: this.photoURL
    // };
    this.user.updateUserInfo(this.userInfo);
  }

}
