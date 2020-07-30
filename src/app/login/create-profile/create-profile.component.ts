import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss', '../login.page.scss'],
})
export class CreateProfileComponent implements OnInit {
  name: string;
  dateofBirth: string;
  addLocation: string;
  timeZone: string;
  createProfile: FormGroup;
  constructor(private fb: FormBuilder, private navCtrl: NavController) { }

  ngOnInit() {
    this.createProfile = this.fb.group(
      {
        name: new FormControl(''),
        dateofBirth: new FormControl(''),
        addLocation: new FormControl(''),
        timeZone: new FormControl('')
      }
    );
  }
}

