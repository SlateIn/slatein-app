import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NavController, LoadingController } from '@ionic/angular';
import { AuthService } from '@services/auth.service';
import { Plugins } from '@capacitor/core';
import { PasswordValidatorService } from '@services/password-validator.service';
import { Subscription } from 'rxjs';

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
  formValueChangesSubscription: Subscription;

  @ViewChild('profilePic', { static: false }) profilePicRef: ElementRef;

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private auth: AuthService,
    private loadingController: LoadingController,
    private pwdValidator: PasswordValidatorService,
    private changeDetectionRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      fname: new FormControl('', Validators.required),
      lname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.email
      ])),
      gender: new FormControl('', Validators.required),
      birthdate: new FormControl('', Validators.required),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5)
      ])),
      confirmPassword: new FormControl('')
    }, {
      validator: this.pwdValidator.mustMatch('password', 'confirmPassword')
    });
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
