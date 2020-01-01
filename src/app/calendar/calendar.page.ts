import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
 
import { Ionic4DatepickerModalComponent } from '@logisticinfotech/ionic4-datepicker';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

  datePickerObj: any = {};
  selectedDate;

  constructor(
    public modalCtrl: ModalController
  ) { }
  

  ngOnInit() {
    this.datePickerObj = {
      dateFormat: 'YYYY-MM-DD'
    };
  }

  async openDatePicker() {
    const datePickerModal = await this.modalCtrl.create({
      component: Ionic4DatepickerModalComponent,
      cssClass: 'li-ionic4-datePicker',
      componentProps: { 
         'objConfig': this.datePickerObj, 
         'selectedDate': this.selectedDate 
      }
    });
    await datePickerModal.present();
 
    datePickerModal.onDidDismiss()
      .then((data) => {
        console.log(data);
        this.selectedDate = data.data.date;
      });
  }

}
