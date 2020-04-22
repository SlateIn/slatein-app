import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NavController, LoadingController } from '@ionic/angular';
import { AuthService } from '@services/auth.service';
import { Plugins } from '@capacitor/core';
import { PasswordValidatorService } from '@services/password-validator.service';
import { Subscription } from 'rxjs';
import { CameraService } from '@services/camera.service';
import { DatePipe } from '@angular/common';

const { Storage } = Plugins;

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  email: string;
  password: string;
  cpassword: string; 
  registerForm: FormGroup;
  avatarSrc = 'assets/icon/default_profile.svg';
  isProfilePicSelected = false;
  singUpFailedErrorMsg: string;
  formValueChangesSubscription: Subscription;
  photoBase64: string;
  currentDate = new Date().toLocaleDateString();

  @ViewChild('profilePic', { static: false }) profilePicRef: ElementRef;

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private auth: AuthService,
    private loadingController: LoadingController,
    private pwdValidator: PasswordValidatorService,
    private changeDetectionRef: ChangeDetectorRef,
    private datepipe: DatePipe,
    private photoService: CameraService ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      fname: ['', Validators.compose([Validators.pattern('[a-zA-Z]*'), Validators.required])],
      lname: ['', Validators.compose([Validators.pattern('[a-zA-Z]*'), Validators.required])],
      email: ['', Validators.compose([Validators.email, Validators.required])],
      gender: new FormControl('', Validators.required),
      birthdate: new FormControl('', Validators.required),
      password: new FormControl('', Validators.compose([Validators.minLength(6)])),
      confirmPassword: new FormControl('')
    }, {
      validator: this.pwdValidator.mustMatch('password', 'confirmPassword')
    });
    this.currentDate = this.datepipe.transform(this.currentDate, 'yyyy-MM-dd');
  }

  ionViewWillEnter() {
    this.formValueChangesSubscription = this.registerForm.valueChanges.subscribe(() => {
      this.changeDetectionRef.detectChanges();
    });
  }

  ionViewWillLeave() {
    this.formValueChangesSubscription && this.formValueChangesSubscription.unsubscribe();
  }

  get controls() { return this.registerForm.controls; }

  onProfilePicClick() {
    this.photoService.getPhoto().then(photo => {
      this.profilePicRef.nativeElement.src = photo;
      this.photoBase64 = photo.replace('data:image/jpeg;base64,', '');
      this.isProfilePicSelected = true;
    }).catch(error => {
      console.log(`Error occure when trying get the photo.`);
    });
  }

  async register() {
    const loading = await this.createLoadingAlert();
    await loading.present();
    console.log(this.registerForm.value);
    this.auth.signUp(this.registerForm.value, this.photoBase64).then(async () => {
      await Storage.set({
        key: 'email',
        value: this.registerForm.value.email
      });
      loading.dismiss();
      this.navCtrl.navigateRoot('/tabs/myday');
    }).catch(err => {
      loading.dismiss();
      this.singUpFailedErrorMsg = err.message;
    });
  }

  createLoadingAlert(): Promise<HTMLIonLoadingElement> {
    return this.loadingController.create({
      message: 'Signing Up',
      mode: 'ios',
      animated: true,
      showBackdrop: true
    })
  }

  goBack() {
    this.navCtrl.navigateBack('/login');
  }
}
