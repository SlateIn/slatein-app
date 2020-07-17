import { Component, OnInit, ViewChild } from '@angular/core';
import { ToDoList } from '@models/todoList';
import { ToDoItem } from '@models/todoItem';
import { IonReorderGroup, ModalController, AlertController } from '@ionic/angular';
import { ToDoService } from '../services/todo.service';

@Component({
  selector: 'app-new-todo-list',
  templateUrl: './new-todo-list.component.html',
  styleUrls: ['./new-todo-list.component.scss'],
})
export class NewTodoListComponent implements OnInit {
  isNewList: boolean;
  newList: ToDoList;
  id = 0;
  header: string;
  list: ToDoItem[] = [];
  cnt: number;
  listItemAdded = false;
  isCurrentDataChanged = false;
  addingToDo = false;
  inputValue = '';

  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;

  constructor(private toDoService: ToDoService,
              private modalController: ModalController,
              private alertController: AlertController) {}

  ngOnInit() {
    if (this.isNewList) {
      this.header = '';
      this.list = [];
      this.newList = {id: new Date().getTime(), listName: this.header, listItems: this.list};
    }
  }

  async close() {

    if (this.isNewList && (this.header !== '' || this.list.length > 0)) {

      if (this.header === '') {
        const todo = this.list[0];
        this.newList.listName =  todo.title;
      } else {
        this.newList.listName = this.header;
      }
      this.newList.listItems = this.list;

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
              this.toDoService.addNewList(this.newList);
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
    if (this.header === '') {
      const todo = this.list[0];
      this.newList.listName =  todo.title;
    } else {
      this.newList.listName = this.header;
    }

    this.newList.listItems = this.list;
    this.toDoService.addNewList(this.newList);
    await this.modalController.dismiss();
  }

  deleteToDo(todo: any) {
    console.log(todo);
    const index: number = this.list.indexOf(todo);
    if (index !== -1) {
          this.list.splice(index, 1);
    }

    if(this.list.length <= 0) {
      this.listItemAdded = false;
    }
  }

  toDoEntered() {
    if (this.inputValue !== '') {
      this.cnt++;
      const todo = {id: new Date().getTime(), title: this.inputValue, completed: false};
      this.list.push(todo);
      this.listItemAdded = true;
      this.inputValue = '';
    } else {
      this.addingToDo = false;
    }
    this.addingToDo = false;
  }

  todoCompleted(todo: any) {
      this.list.forEach(item => {
        if (item === todo) {
          if (!todo.completed) {
            item.completed = true;
          } else {
            item.completed = false;
          }
        }
      });
  }
}
