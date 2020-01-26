import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import { AuthService } from '@services/auth.service';

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

  constructor(private auth: AuthService, private navCtrl: NavController) { }
  
  ngOnInit() {
    Storage.get({ key: 'email' }).then((res) => this.email = res.value);
  }

  ionViewWillEnter() {
    this.loginErrorMsg = '';
  }

  login() {
<<<<<<< HEAD
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password)
    .then(() => {this.navCtrl.navigateRoot('/tabs/myday'); })
    .catch(err => this.loginErrorMsg = err.message);
=======
    this.auth.signInWithEmail(this.email, this.password)
    .then(() => {this.navCtrl.navigateRoot('/tabs/myday')})
    .catch(err => this.loginErrorMsg = err.message)
>>>>>>> develop
  }
}
