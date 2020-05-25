import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-page-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  // title of the page
  @Input() pageTitle: string;
  // back button is required ot not
  @Input() backButton: boolean;
  // what type component is going to use the header to determine what type of back button action required
  @Input() typeOfComponent: string;
  constructor(private navCtrl: NavController, private modalController: ModalController) { }

  ngOnInit() {
  }

  /**
   * close the modal if typeOfComponent = modal
   */
  async backClicked() {
    await this.modalController.dismiss();
  }
}
