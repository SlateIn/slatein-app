import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NavController, LoadingController } from '@ionic/angular';
import { AuthService } from '@services/auth.service';
import { Plugins } from '@capacitor/core';
import { PasswordValidatorService } from '@services/password-validator.service';
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
  profilePicFile: File;
  singUpFailedErrorMsg: string;
  currentDate = new Date().toLocaleDateString();

  @ViewChild('profilePic', { static: false }) profilePicRef: ElementRef;

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private auth: AuthService,
    private loadingController: LoadingController,
    private pwdValidator: PasswordValidatorService,
    public datepipe: DatePipe) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      fname: ['', Validators.compose([Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      lname: new FormControl('', Validators.pattern('[a-zA-Z ]*')),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      gender: new FormControl('', Validators.required),
      birthdate: new FormControl('', Validators.required),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
      confirmPassword: new FormControl('', Validators.required)
    }, {
      validator: this.pwdValidator.mustMatch('password', 'confirmPassword')
    });
    this.currentDate = this.datepipe.transform(this.currentDate, 'yyyy-MM-dd');
    console.log( this.currentDate);
  }

  get controls() { return this.registerForm.controls; }

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

  async register() {
    const loading = await this.createLoadingAlert();
    await loading.present();

    this.auth.signUp(this.registerForm.value, this.profilePicFile).then(async () => {
      await Storage.set({
        key: 'email',
        value: this.registerForm.value.email
      });
      loading.dismiss();
      this.navCtrl.navigateForward('/tabs/myday');
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
