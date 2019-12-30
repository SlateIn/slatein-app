import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username: string = "";
  password: string = "";
  cpassword: string = "";
  constructor( public afAuth: AngularFireAuth, private router: Router) { }

  ngOnInit() {
  }

  async register() {
    const {username, password, cpassword} = this;
    console.log(this);
    if (password !== cpassword){
      return console.error("Password doesn't match!");
    }
      try{
        const res = await this.afAuth.auth.createUserWithEmailAndPassword(username,password);
        console.log(res);
        this.router.navigate(['tabs/tab1']);
      }catch(error){
        console.dir(error);
      }
  }
}
