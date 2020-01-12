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

  constructor(public afAuth: AngularFireAuth, private navCtrl: NavController, private route: ActivatedRoute) { }
  
  ngOnInit() {
    Storage.get({ key: 'email' }).then((res) => this.email = res.value);
  }

  ionViewWillEnter() {
    this.loginErrorMsg = '';
  }

  login() {
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password)
    .then(() => {this.navCtrl.navigateRoot('/tabs/myday')})
    .catch(err => this.loginErrorMsg = err.message)
  }
  
}
