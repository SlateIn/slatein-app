import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage {
  email: string;
  resetPwdFailedErrorMsg: string;
  constructor(private auth: AuthService, private loadingController: LoadingController, private navCtrl: NavController) { }

  async reset() {
    const loading = await this.createLoadingAlert();
    await loading.present();
    this.auth.passwordReset(this.email).then(() => {
      loading.dismiss();
      this.navCtrl.navigateBack('/login', {
        queryParams: {
          resetedPwdSuccess: true
        }
      });
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
