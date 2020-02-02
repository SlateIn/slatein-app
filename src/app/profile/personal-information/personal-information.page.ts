import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user-info.service';
import { Observable } from 'rxjs';
import { UserInfo } from '@models/userInfo';
import { DatePipe } from '@angular/common';
import { MaxLengthValidator } from '@angular/forms';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { ToastController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.page.html',
  styleUrls: ['./personal-information.page.scss'],
})
export class PersonalInformationPage implements OnInit {
  upgateButtonClicked = false;
  currentUser = {} as UserInfo;
  userInfo = {} as UserInfo;

  itemRef: AngularFireObject<UserInfo>;
  item: Observable<UserInfo>;
  info$: Observable<UserInfo>;
  profileUpdated: boolean;

  constructor(
    private user: UserService,
    public datepipe: DatePipe,
    public db: AngularFireDatabase,
    private toastController: ToastController,
    private modalController: ModalController) {
    this.itemRef = db.object('item');
    this.item = this.itemRef.valueChanges();
   }

  ngOnInit() {
    this.info$ = this.user.info;

    this.info$.subscribe( user => {
      this.currentUser = user;
      this.userInfo.fname = user.fname;
      this.userInfo.lname = user.lname;
      this.userInfo.birthdate = user.birthdate;
      this.userInfo.gender = user.gender;
      this.userInfo.email = user.email;
      this.userInfo.photoURL = user.photoURL;
    });
  }

  formatDate(date: string) {
    const newDate = new Date(date).getTime();
    return this.datepipe.transform(newDate, 'MM-dd-yyyy');
  }

  upDateBirthDate(updatedBirthdate: string) {
    this.userInfo.birthdate = updatedBirthdate;
  }

  onUpdateInfoClick() {
    this.upgateButtonClicked = true;
  }

  onSaveInfoClicked() {
    this.upgateButtonClicked = false;

    if (this.currentUser.fname !== this.userInfo.fname ||
      this.currentUser.lname !== this.userInfo.lname ||
      this.currentUser.birthdate !== this.userInfo.birthdate ||
      this.currentUser.gender !== this.userInfo.gender) {

        this.user.updateUserInfo(this.userInfo).then(async () => {
          const toast = await this.toastController.create({
            message: 'Your Personal Information is successfully updated.',
            duration: 2000,
            color: 'success',
            position: 'middle'
          });
          toast.present();
        });
    }
  }

  async backClicked() {
    await this.modalController.dismiss();
  }
}
