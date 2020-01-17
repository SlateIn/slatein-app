import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user-info.service';
import { Observable } from 'rxjs';
import { UserInfo } from '@models/userInfo';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.page.html',
  styleUrls: ['./personal-information.page.scss'],
})
export class PersonalInformationPage implements OnInit {

  info$: Observable<UserInfo>;
  constructor(private user: UserService, public datepipe: DatePipe) { }

  formatDate(date: string){
    return this.datepipe.transform(date, 'MM-dd-yyyy');
   }

  ngOnInit() {
    this.info$ = this.user.info;
  }

}
