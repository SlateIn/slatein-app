import { Component, OnInit, ViewChild } from '@angular/core';
import { ToDoList } from '@models/todoList';
import { ToDoItem } from '@models/todoItem';
import { IonReorderGroup, ModalController, AlertController } from '@ionic/angular';
import { ToDoService } from '@app/todo/services/todo.service';

@Component({
  selector: 'app-edit-todo-list',
  templateUrl: './edit-todo-list.component.html',
  styleUrls: ['./edit-todo-list.component.scss'],
})
export class EditTodoListComponent implements OnInit {
  id = 0;
  header: string;
  list: ToDoItem[] = [];
  cnt: number;
  isCurrentDataChanged = false;
  addingToDo = false;
  inputValue = '';

  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;

  constructor(private toDoService: ToDoService,
              private modalController: ModalController,
              private alertController: AlertController) {}

  ngOnInit() {
  }

  async close() {
    if (this.isCurrentDataChanged) {
      const alert = await this.alertController.create({
        header: 'Checklist not saved',
        message: 'Do you want to save checklist?',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            handler: () => {
              this.modalController.dismiss();
            }
          },
          {
            text: 'Yes',
            handler: () => {
              this.toDoService.updateToDoList(this.id, this.header, this.list);
              this.modalController.dismiss();
            }
          }
        ]
      });
      await alert.present();
    } else {
      this.modalController.dismiss();
    }
  }

  async createChecklistAndClose() {
    const updatedList: ToDoItem[] = [];
    if (this.isCurrentDataChanged) {
      this.list.forEach(item => {
        if (item.title)  {
          console.log(item.title);
          updatedList.push(item);
        }
      });
      this.toDoService.updateToDoList(this.id, this.header, updatedList);
      await this.modalController.dismiss({
        header: this.header,
        list: updatedList
      }, 'confirm');
    } else {
      await this.modalController.dismiss({
        header: this.header,
        list: this.list
      }, 'confirm');
    }
  }

  deleteToDo(todo: any) {
    console.log(todo);
    const index: number = this.list.indexOf(todo);
    if (index !== -1) {
          this.list.splice(index, 1);
          this.isCurrentDataChanged = true;
    }
  }

  toDoEntered() {
    if (this.inputValue !== '') {
      this.cnt++;
      const todo = {id: new Date().getTime(), title: this.inputValue, completed: false};
      this.list.push(todo);
      this.inputValue = '';
      this.isCurrentDataChanged = true;
    } else {
      this.addingToDo = false;
    }
    this.addingToDo = false;
  }

  valueChanged() {
    this.isCurrentDataChanged = true;
    console.log(this.isCurrentDataChanged);
  }
}
