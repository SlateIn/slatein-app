import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { CameraService } from '@services/camera.service';
import { SafeResourceUrl } from '@angular/platform-browser';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss', '../login.page.scss'],
})
export class CreateProfileComponent implements OnInit {
  isProfileContentAdded = false;
  name: string;
  dateofBirth: string;
  addLocation: string;
  timeZone: string;
  photo: SafeResourceUrl;
  photoBase64: string;
  createProfile: FormGroup;
  currentDate = this.datepipe.transform(new Date().toLocaleDateString(), 'yyyy-MM-dd');

  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private photoService: CameraService,
              private navCtrl: NavController,
              public datepipe: DatePipe) { }

  ngOnInit() {
    this.createProfile = this.fb.group(
      {
        fullname: new FormControl(''),
        dateofBirth: new FormControl(''),
      }
    );
    this.currentDate = this.datepipe.transform(this.currentDate, 'yyyy-MM-dd');
  }

  onUploadImage() {
    this.photoService
    .getPhoto()
    .then((photo) => {
      this.photo = photo;
      this.photoBase64 = photo.replace('data:image/jpeg;base64,', '');
    })
    .catch((error) => {
      console.log(`Error occure when trying get the photo.`);
    });
  }

  onAddBirthDate(updatedBirthdate: string) {
    console.log(updatedBirthdate);
  }

  onSaveProfile() {
    this.auth.updateUserInfo(this.createProfile.value, this.photoBase64);
    this.navCtrl.navigateRoot('/tabs/myday');
  }

  onSkip() {
    this.auth.updateUserInfo(this.createProfile.value, this.photoBase64);
    this.navCtrl.navigateRoot('/tabs/myday');
  }
}

