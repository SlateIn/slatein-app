import { Component, OnInit } from '@angular/core';
import { AlertReminderService } from '@app/myday/services/alert-reminder.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  constructor(private alertReminderService: AlertReminderService) {}

  setReminder() {
    this.alertReminderService.presentAlertPrompt('Add');
  }
}
