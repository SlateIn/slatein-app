import { async } from '@angular/core/testing';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective } from '@angular/forms';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalController, PickerController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';
import { collectExternalReferences } from '@angular/compiler';
import { AlertReminderService } from '../services/alert-reminder.service';


@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
})
export class NewTaskComponent implements OnInit {
  updateNewTaskForm: FormGroup;
  repetationPicker = '';
  endRepetationPicker = '';
  repetationPickerValue = '';
  updateTitle = '';
  @ViewChild('documentEditForm') documentEditForm: FormGroupDirective;
  @Input() taskData: any;

  constructor(private modalController: ModalController,
              private pickerController: PickerController,
              private fb: FormBuilder,
              private alertReminderService: AlertReminderService) { }

  ngOnInit() {
    this.updateTitle = 'New Task';
    this.updateNewTaskForm = this.fb.group(
      {
        title: ['', Validators.compose([Validators.required])],
        description: ['', Validators.compose([Validators.pattern('[a-zA-Z]*'), Validators.required])],
        startDate: new FormControl('', Validators.required),
        startTime: new FormControl('', Validators.required),
        endDate: new FormControl('', Validators.required),
        endTime: new FormControl('', Validators.required),
        repetationPicker: new FormControl('', Validators.required),
        endRepetationPicker: new FormControl('', Validators.required)
      },
    );

    if (this.taskData !== undefined) {
      console.log('This is TaskData');
      console.log(this.taskData);
      this.updateTitle = 'Update Task';
      this.updateNewTaskForm.patchValue({
        title: this.taskData.title,
        description: this.taskData.desc,
        startDate: this.taskData.startTimePeriod,
        startTime: this.taskData.startTimePeriod,
        endDate : this.taskData.endTimePeriod,
        endTime : this.taskData.endTimePeriod,
      });

      this.repetationPicker = this.taskData.repeat;
    }
  }

  async backClicked() {
    await this.modalController.dismiss();
  }

  async openEndRepeationPicker() {
    const opts: PickerOptions = {
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
          name: 'endRepetationPicker',
          options: [
            { text: 'Never', value: 'year' },
            { text: 'Ondate', value: 'Ondate' }
          ]
        }
      ]
    };

    const picker = await this.pickerController.create(opts);
    picker.present();
    picker.onDidDismiss().then(async data => {
      const endCol = await picker.getColumn('endRepetationPicker');
      this.endRepetationPicker = endCol.options[endCol.selectedIndex].text;
      this.updateNewTaskForm.get('endRepetationPicker').setValue(endCol.options[endCol.selectedIndex].value);
    });
  }


  async openRepeationPicker() {
    const opts: PickerOptions = {
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
            { text: 'Never', value: 'year' },
            { text: 'Daily', value: 'day' },
            { text: 'Weekly', value: 'week' },
            { text: 'BiWeekly', value: 'two-weeks' },
            { text: 'Monthly', value: 'month' },
            { text: 'Yearly', value: 'year' }
          ]
        }
      ]
    };

    const picker = await this.pickerController.create(opts);
    picker.present();
    picker.onDidDismiss().then(async data => {
      const col = await picker.getColumn('repetationPicker');
      this.repetationPicker = col.options[col.selectedIndex].text;
      this.repetationPickerValue = col.options[col.selectedIndex].value;
      this.updateNewTaskForm.get('repetationPicker').setValue(col.options[col.selectedIndex].value);
    });
  }

  register() {
    // const type = this.taskData !== undefined ? 'update' : 'add' ;
    if (this.taskData !== undefined) {
      this.alertReminderService.onSubmit(this.updateNewTaskForm.value, this.repetationPickerValue, this.taskData.id);
    } else {
      this.alertReminderService.onSubmit(this.updateNewTaskForm.value, this.repetationPickerValue, null);
    }
    this.modalController.dismiss();
  }

}
