import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../services/user-info.service';
import { Observable } from 'rxjs';
import { UserInfo } from '@models/userInfo';


@Component({
  selector: 'app-myday',
  templateUrl: './myday.page.html',
  styleUrls: ['./myday.page.scss'],
})
export class MydayPage implements OnInit {
  info$: Observable<UserInfo>;
  

  constructor(private user: UserService) {
   }

  ngOnInit() {
    this.info$ = this.user.info;
  }
}
