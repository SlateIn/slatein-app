import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss']
})
export class SettingsPage implements OnInit {
  touchId: boolean;
  darkMode: boolean;

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  async backClicked() {
    await this.modalController.dismiss();
  }
}
