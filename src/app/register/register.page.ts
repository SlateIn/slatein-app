import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NavController, LoadingController } from '@ionic/angular';
import { AuthService } from '@services/auth.service';

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

  @ViewChild('profilePic', { static: false }) profilePicRef: ElementRef;

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private auth: AuthService,
    private loadingController: LoadingController) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
      confirmPassword: new FormControl('', Validators.required)
    }, {
      validator: this.mustMatch('password', 'confirmPassword')
    });
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
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

    this.auth.signUp(this.registerForm.value, this.profilePicFile).then(() => {
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
  
}
