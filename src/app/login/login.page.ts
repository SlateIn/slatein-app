import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import { AuthService } from '@services/auth.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

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
  loginForm: FormGroup;

  constructor(private auth: AuthService, 
              private navCtrl: NavController,
              private fb: FormBuilder) { }

  ngOnInit() {
    Storage.get({ key: 'email' }).then((res) => this.email = res.value);
    this.loginForm = this.fb.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ]))
    });

  }

  get controls() {
    return this.loginForm.controls;
  }

  ionViewWillEnter() {
    this.loginErrorMsg = '';
  }

  login() {
    this.auth.signInWithEmail(this.loginForm.value.email, this.loginForm.value.password)
    .then(() => {this.navCtrl.navigateRoot('/tabs/myday')})
    .catch(err => this.loginErrorMsg = err.message)
  }
}
