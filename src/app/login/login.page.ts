import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = "";
  password: string = "";

  constructor( public afAuth: AngularFireAuth, private router: Router) { }

  ngOnInit() {
  }

  async login() {
    const { username, password } = this
    //console.log(this);
    try {
      const res = await this.afAuth.auth.signInWithEmailAndPassword(username, password)
      console.log("successfully login");
      this.router.navigate(['tabs/tab1']);
    } catch(err) {
      console.dir(err)
      if(err.code === "auth/user-not-found"){
        console.log("User is not authorized");
      }
    }
  }
  
}
