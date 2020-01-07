import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { LoadingController, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage {
  email: string;
  resetPwdFailedErrorMsg: string;
  constructor(private auth: AuthService, private loadingController: LoadingController, private navCtrl: NavController, private toastController: ToastController) { }

  async reset() {
    const loading = await this.createLoadingAlert();
    await loading.present();
    this.auth.passwordReset(this.email).then(async () => {
      loading.dismiss();
      const toast = await this.toastController.create({
        message: 'Reset Password email have been sent. Please check your email.',
        duration: 5000,
        color: 'dark'
      });
      toast.present();
      this.navCtrl.navigateBack('/login');
    }).catch((err) => {
      this.resetPwdFailedErrorMsg = err.message;
      loading.dismiss();
    });
  }

  createLoadingAlert(): Promise<HTMLIonLoadingElement> {
    return this.loadingController.create({
      message: 'Sending Email',
      mode: 'ios',
      animated: true,
      showBackdrop: true
    })
  }

  goBack() {
    this.navCtrl.navigateBack('/login');
  }

}
