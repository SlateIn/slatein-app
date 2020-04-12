import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import { AuthService } from '@services/auth.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

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
  formValueChangesSubscription: Subscription;
  
  constructor(private auth: AuthService, 
              private navCtrl: NavController,
              private fb: FormBuilder,
              private changeDetectionRef: ChangeDetectorRef,) { }

  ngOnInit() {
    Storage.get({ key: 'email' }).then((res) => this.email = res.value);
    this.loginForm = this.fb.group({
      email: new FormControl('', Validators.compose([
        Validators.required
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });

  }

  get controls() {
    return this.loginForm.controls;
  }

  ionViewWillEnter() {
    this.loginErrorMsg = '';
    this.formValueChangesSubscription = this.loginForm.valueChanges.subscribe(() => {
      this.changeDetectionRef.detectChanges();
    });
  }

  ionViewWillLeave() {
    this.formValueChangesSubscription && this.formValueChangesSubscription.unsubscribe();
  }

  login() { 
    if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.loginForm.value.email))) {
      this.loginErrorMsg = 'Email must be valid formmats';
    }else if(this.loginForm.value.password.length < 6) {
      this.loginErrorMsg = 'Password must be at least 6 characters';
    } else {
      this.auth.signInWithEmail(this.loginForm.value.email, this.loginForm.value.password)
      .then(() => {this.navCtrl.navigateRoot('/tabs/myday')})
      .catch(err => this.loginErrorMsg = err.message);
    }
    
  }
}
