import { async } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ModalController, PickerController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';
import { collectExternalReferences } from '@angular/compiler';


@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
})
export class NewTaskComponent implements OnInit {
  updateNewTaskForm: FormGroup;
  repetationPicker = '';

  constructor(private modalController: ModalController,
              private pickerController: PickerController ) { }

  ngOnInit() {}

  async backClicked() {
    await this.modalController.dismiss();
  }

  async openRepeationPicker() {
    let opts: PickerOptions = {
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Confirm'
        }
      ],
      columns: [
        {
          name: 'repetationPicker',
          options: [
            {text: 'Never'},
            {text: 'Daily'},
            {text: 'Weekly'},
            {text: 'BiWeekly'},
            {text: 'Monthly'},
            {text: 'Yearly'}
          ]
        }
      ]
    };

    let picker = await this.pickerController.create(opts);
    picker.present();
    picker.onDidDismiss().then(async data => {
      let col = await picker.getColumn('repetationPicker');
      console.log('Col: ', col);
      this.repetationPicker = col.options[col.selectedIndex].text;
    });
  }
}
