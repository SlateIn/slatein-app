import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;
  loginErrorMsg: string;

  constructor(public afAuth: AngularFireAuth, private navCtrl: NavController, private route: ActivatedRoute, private toastController: ToastController) { }
  
  ngOnInit() {
    Storage.get({ key: 'email' }).then((res) => this.email = res.value);
  }

  async ionViewWillEnter() {
    this.loginErrorMsg = '';
    if(this.route.snapshot.queryParams.resetedPwdSuccess) {
      const toast = await this.toastController.create({
        message: 'Reset Password email have been sent. Please check your email.',
        duration: 5000,
        color: 'dark'
      });
      toast.present();
    }
  }

  login() {
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password)
    .then(() => {this.navCtrl.navigateForward('/tabs/myday')})
    .catch(err => this.loginErrorMsg = err.message)
  }

  register(){
    this.navCtrl.navigateForward('/register');
  }
  
}
