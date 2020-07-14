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
  title;
  updateNewTaskForm: FormGroup;
  repetationPicker = '';
  endRepetationPicker = '';
  repetationPickerValue = '';
  updatedRepetationPickerValue = '';
  updateTitle = '';
  @ViewChild('documentEditForm') documentEditForm: FormGroupDirective;
  @Input() taskData: any;

  repetationPickerColumn = [
    {
      name: 'repetationPicker',
      options: [
        { text: 'Never', value: 'never' },
        { text: 'Daily', value: 'day' },
        { text: 'Weekly', value: 'week' },
        { text: 'BiWeekly', value: 'two-weeks' },
        { text: 'Monthly', value: 'month' },
        { text: 'Yearly', value: 'year' }
      ]
    }
  ];

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
      this.updateTitle = 'Update Task';
      this.updateNewTaskForm.patchValue({
        title: this.taskData.title,
        description: this.taskData.desc,
        startDate: this.taskData.startTimePeriod,
        startTime: this.taskData.startTimePeriod,
        endDate : this.taskData.endTimePeriod,
        endTime : this.taskData.endTimePeriod,
        repetationPicker: this.taskData.repeat
      });

      this.updatedRepetationPickerValue = this.taskData.repeat;
      // tslint:disable-next-line:triple-equals
      // tslint:disable-next-line:max-line-length
      this.repetationPicker = this.repetationPickerColumn.map(item => item.options.filter(rep => rep.value === this.taskData.repeat))[0][0].text;
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
      columns: this.repetationPickerColumn
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
      // tslint:disable-next-line:max-line-length
      this.alertReminderService.onSubmit(this.updateNewTaskForm.value, (!this.updatedRepetationPickerValue || this.updatedRepetationPickerValue === null) ? 'never' : this.updatedRepetationPickerValue, this.taskData.id);
    } else {
      // tslint:disable-next-line:max-line-length
      this.alertReminderService.onSubmit(this.updateNewTaskForm.value, (!this.repetationPickerValue || this.repetationPickerValue === null) ? 'never' : this.repetationPickerValue, null);
    }
    this.modalController.dismiss();
  }

}
