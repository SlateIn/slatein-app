import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from '@services/user-info.service';
import { take } from 'rxjs/operators';
import { UserInfo } from '@models/userInfo';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { PasswordValidatorService } from '@services/password-validator.service';
import { AuthService } from '@services/auth.service';
import { ToastController, NavController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-security-password',
  templateUrl: './security-password.page.html',
  styleUrls: ['./security-password.page.scss'],
})
export class SecurityPasswordPage implements OnInit {

  userInfo: UserInfo;
  updatePwdForm: FormGroup;
  updatePwdErrorMsg: string;

  constructor(
    private auth: AuthService,
    private user: UserService,
    private fb: FormBuilder,
    private pwdValidator: PasswordValidatorService,
    private toastController: ToastController,
    private navCtrl: NavController,
    private modalController: ModalController) { }

  ngOnInit() {
    this.user.info.pipe(take(1)).subscribe((userInfo) => {
      this.userInfo = userInfo;
    });

    this.updatePwdForm = this.fb.group({
      currentPassword: new FormControl('', Validators.required),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
      confirmPassword: new FormControl('', Validators.required)
    }, {
      validator: this.pwdValidator.mustMatch('password', 'confirmPassword')
    });
  }

  get controls() { return this.updatePwdForm.controls; }

  async validateAndUpdatePwd() {
    this.auth.signInWithEmail(this.userInfo.email, this.updatePwdForm.value.currentPassword)
    .then(() => this.updatePwd())
    .catch(err => this.updatePwdErrorMsg = err.message)
  }

  updatePwd() {
    this.auth.updatePwd(this.updatePwdForm.value.password).then(async () => {
      const toast = await this.toastController.create({
        message: 'Successfully updated password',
        duration: 5000,
        color: 'success'
      });
      toast.present();
      this.navCtrl.navigateBack('/tabs/profile');
    }).catch((err) => this.updatePwdErrorMsg = err.message)
  }

  async backClicked() {
    await this.modalController.dismiss();
  }
}
