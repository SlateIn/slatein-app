import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

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
  avatarSrc = '../../assets/icon/default_profile.svg';
  isProfilePicSelected = false;
  
  @ViewChild('profilePic', {static: true}) profilePic: ElementRef;

  constructor(private afAuth: AngularFireAuth, private fb: FormBuilder, private navCtrl: NavController, private router: Router) { }

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

  async register() {
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
    // try {
    //   const res = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    //   console.log(res);
    // } catch (error) {
    //   console.dir(error);
    // }
  }

  previewProfilePic(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (event) => {
      this.profilePic.nativeElement.src = event.target.result as string;
      this.isProfilePicSelected = true;
    }
      // try{
      //   const res = await this.afAuth.auth.createUserWithEmailAndPassword(username,password);
      //   console.log(res);
      //   this.router.navigate(['tabs/myday']);
      // }catch(error){
      //   console.dir(error);
      // }
  }

  picChange(event: any) {
    let file: File = event.srcElement.files[0];
    this.previewProfilePic(file);
  
    // var storageRef = firebase.storage().ref(`images/${this.afAuth.auth.currentUser.uid}.jpg`);
    // console.log(this.afAuth.auth.currentUser.uid);
    // var uploadTask = storageRef.put(file).then((snapshot) => {
    //   snapshot.ref.getDownloadURL().then((url) => {
    //     this.auth.firedata.child(`${this.afAuth.auth.currentUser.uid}`).update({
    //       'photoURL': url
    //     }).then(() => {
    //       this.setRoot();
    //     });
    //   });
    // });
  }

  loginPage() {
    this.navCtrl.pop();
  }

}
