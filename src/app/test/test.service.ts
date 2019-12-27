import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private database: AngularFireDatabase) { 
    this.getAdmin();
  }

  getAdmin(){
    return this.database.object('admin').valueChanges().subscribe((data) => {
      console.log(data) },(err)=>{ console.log("probleme : ", err) 
    })
  }
}
