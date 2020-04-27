import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user-info.service';
import { Observable, Subscription } from 'rxjs';
import { UserInfo } from '@models/userInfo';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { MaxLengthValidator } from '@angular/forms';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { ToastController, ModalController } from '@ionic/angular';
import { AuthService } from '@services/auth.service';
import { CameraService } from '@services/camera.service';
import { SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.page.html',
  styleUrls: ['./personal-information.page.scss']
})
export class PersonalInformationPage implements OnInit, OnDestroy {
  upgateButtonClicked = false;
  currentUser = {} as UserInfo;
  userInfo = {} as UserInfo;

  itemRef: AngularFireObject<UserInfo>;
  item: Observable<UserInfo>;
  info$: Observable<UserInfo>;
  profileUpdated: boolean;
  avatarSrc = 'assets/icon/default_profile.svg';
  isProfilePicSelected = false;
  profilePicFile: File;
  profilePicChanged = false;
  photo: SafeResourceUrl;
  photoBase64: string;
  userSubscription: Subscription;
  currentDate = new Date().toLocaleDateString();

  @ViewChild('profilePic', { static: false }) profilePicRef: ElementRef;

  constructor(
    private user: UserService,
    private photoService: CameraService,
    public datepipe: DatePipe,
    public db: AngularFireDatabase,
    private toastController: ToastController,
    private modalController: ModalController,
    private titleCase: TitleCasePipe,
    private authService: AuthService
  ) {
    this.itemRef = db.object('item');
    this.item = this.itemRef.valueChanges();
  }

  ngOnInit() {
    this.info$ = this.user.info;

    this.userSubscription = this.info$.subscribe((user) => {
      this.currentUser = user;
      this.userInfo.fname = this.titleCase.transform(user.fname);
      this.userInfo.lname = user.lname;
      this.userInfo.birthdate = user.birthdate;
      this.userInfo.gender = user.gender;
      this.userInfo.email = user.email;
      this.userInfo.photoURL = user.photoURL;
      this.photo = user.photoURL;
    });
    this.currentDate = this.datepipe.transform(this.currentDate, 'yyyy-MM-dd');
  }

  formatDate(date: string) {
    const newDate = new Date(date).getTime();
    return this.datepipe.transform(newDate, 'MM/dd/yyyy');
  }

  upDateBirthDate(updatedBirthdate: string) {
    this.userInfo.birthdate = updatedBirthdate;
  }

  onUpdateInfoClick() {
    this.upgateButtonClicked = true;
  }

  onSaveInfoClicked() {
    this.upgateButtonClicked = false;

    if (
      this.currentUser.fname !== this.userInfo.fname ||
      this.currentUser.lname !== this.userInfo.lname ||
      this.currentUser.birthdate !== this.userInfo.birthdate ||
      this.currentUser.gender !== this.userInfo.gender ||
      this.profilePicChanged
    ) {
      this.user.updateUserInfo(this.userInfo).then(async () => {
        this.authService.updatePhotoString(this.photoBase64);
        this.profilePicChanged = false;

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

  onProfilePicClick() {
    this.photoService
      .getPhoto()
      .then((photo) => {
        this.photo = photo;
        this.photoBase64 = photo.replace('data:image/jpeg;base64,', '');
        this.profilePicChanged = true;
      })
      .catch((error) => {
        console.log(`Error occure when trying get the photo.`);
      });
  }

  ngOnDestroy(): void {
    this.userSubscription && this.userSubscription.unsubscribe();
  }
}
