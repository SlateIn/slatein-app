import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import { AuthService } from '@services/auth.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TaskService } from '@services/task.service';
import { AppLabels } from '@services/app-labels.service';
import { LoaderService } from '@services/loader.service';

const { Storage } = Plugins;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  email: string;
  password: string;
  loginErrorMsg: string;
  loginForm: FormGroup;
  showPassword: boolean;
  formValueChangesSubscription: Subscription;

  constructor(
    private auth: AuthService,
    private navCtrl: NavController,
    private fb: FormBuilder,
    private taskService: TaskService,
    private appLabels: AppLabels,
    private loader: LoaderService
  ) {}

  ngOnInit() {
    this.loader.present('Loading...');
    this.appLabels.getComponentContent('login').subscribe(labels => {
      setTimeout(()=>{
        console.log(labels);
        this.loader.dismiss();
      }, 0);
      
      
    });
    this.showPassword = false;
    this.loginForm = this.fb.group({
      email: new FormControl('', Validators.compose([Validators.required])),
      password: new FormControl('', Validators.compose([Validators.required])),
      canRemember: new FormControl(false)
    });

    Storage.get({ key: 'email' }).then((res) => {
      if (res.value) {
        this.loginForm.setValue({ email: res.value, password: '', canRemember: true });
      }
    });
  }

  get controls() {
    return this.loginForm.controls;
  }

  ionViewWillEnter() {
    this.loginErrorMsg = '';
  }

  ionViewWillLeave() {
    this.formValueChangesSubscription && this.formValueChangesSubscription.unsubscribe();
  }

  login() {
    this.loginErrorMsg = '';
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.loginForm.value.email)) {
      this.loginErrorMsg = 'Email must be valid formmats';
    } else if (this.loginForm.value.password.length < 6) {
      this.loginErrorMsg = 'Password must be at least 6 characters long.';
    } else {
      this.auth
        .signInWithEmail(this.loginForm.value.email, this.loginForm.value.password)
        .then(() => {
          if (this.loginForm.value.canRemember) {
            Storage.set({
              key: 'email',
              value: this.loginForm.value.email
            });
          } else {
            Storage.remove({ key: 'email' });
          }
          this.taskService.getAllTasks();
          this.navCtrl.navigateRoot('/tabs/myday');
        })
        .catch((err) => (this.loginErrorMsg = err.message));
    }
  }
  toggleShowPassowrd() {
    this.showPassword = !this.showPassword;
  }
  loginWithGoogle() {
    this.auth
      .logInWithGoogle()
      .then(() => {
        if (this.loginForm.value.canRemember) {
          Storage.set({
            key: 'email',
            value: this.loginForm.value.email
          });
        } else {
          Storage.remove({ key: 'email' });
        }
        this.taskService.getAllTasks();
        this.navCtrl.navigateRoot('/tabs/myday');
      })
      .catch((err) => (this.loginErrorMsg = err.message));
  }

  // loginWithFb() {
  //   this.auth
  //     .logInWithFacebook()
  //     .then(() => {
  //       if (this.loginForm.value.canRemember) {
  //         Storage.set({
  //           key: 'email',
  //           value: this.loginForm.value.email
  //         });
  //       } else {
  //         Storage.remove({ key: 'email' });
  //       }
  //       this.taskService.getAllTasks();
  //       this.navCtrl.navigateRoot('/tabs/myday');
  //     })
  //     .catch((err) => (this.loginErrorMsg = err.message));
  // }
}
