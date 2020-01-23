import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../services/user-info.service';
import { Observable } from 'rxjs';
import { UserInfo } from '@models/userInfo';
import { LocalNotificationsService } from '@services/local-notifications.service';

@Component({
  selector: 'app-myday',
  templateUrl: './myday.page.html',
  styleUrls: ['./myday.page.scss'],
})
export class MydayPage implements OnInit {
  info$: Observable<UserInfo>;
  constructor(private user: UserService, private notification: LocalNotificationsService) { }

  async ngOnInit() {
    this.info$ = this.user.info;
        this.notification.scheduleAt('First Schedule Reminder', 'Successful pop-up one time notification.', 1, new Date(Date.now() + 1000 * 5));

        this.notification.scheduleRepeatingEvery('Second Schedule Reminder', 'Successful pop-up one every minute notification.', 2, 'minute');
  }

}
