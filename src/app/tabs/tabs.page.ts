import { Component, OnInit } from '@angular/core';
import { AlertReminderService } from '@app/myday/services/alert-reminder.service';
import { ModalController } from '@ionic/angular';
import { NewTaskComponent } from '@app/myday/new-task/new-task.component';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  constructor(private modalController: ModalController) {}

  async setReminder() {
    // this.alertReminderService.presentAlertPrompt('Add');
    const myDayNewTask = await this.modalController.create({
      component: NewTaskComponent
    });
    return await myDayNewTask.present();
  }
}
