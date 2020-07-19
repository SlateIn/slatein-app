import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { ToDoService } from './services/todo.service';
import { TodoListComponent } from './todo-list/todo-list.component';
import { ToDoList } from '@models/todoList';
import { ToDoItem } from '@models/todoItem';
import { NewTodoListComponent } from './new-todo-list/new-todo-list.component';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],
})
export class TodoPage implements OnInit {
  pageTitle = 'To Do';
  taskChecked = false;
  todos: ToDoItem[] = [];
  index: number;
  addingToDo = false;
  addingList = false;
  viewAllLinkDisplay = true;
  listRows: ToDoList[] = [];
  public cnt = 0;
  public listData: any = [];
  isCancelled = false;

  constructor(private toDoService: ToDoService,
              private modalController: ModalController,
              private alertController: AlertController) {}

  ngOnInit() {
    this.toDoService.getAllLists().subscribe((lists: ToDoList[]) => {
      if (lists !== null) {
          this.listRows = lists;
          this.cnt = this.listRows.length;
      }
  });

  }

  async deleteRow(row: ToDoList) {
    const alert = await this.alertController.create({
      message: `Do you really want to delete list: ${row.listName}`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Yes',
          handler: () => {
            this.toDoService.deleteToDoList(row);
          }
        }
      ]
    });
    await alert.present();
    this.isCancelled = false;
  }

  async gotoToDoListModal(list: ToDoList) {
    if (!this.isCancelled) {
      if (list.listItems === undefined) {
        list.listItems = [];
      }

      const commonToDoList = await this.modalController.create({
        component: TodoListComponent,
        componentProps: {
          isNewList: false,
          id: list.id,
          header: list.listName,
          list: list.listItems,
          cnt: this.cnt
        }
      });
      return await commonToDoList.present();
    } else {
      this.deleteRow(list);
    }
  }

  async gotoNewListModal() {
      const commonToDoList = await this.modalController.create({
      component: NewTodoListComponent,
      componentProps: {
        isNewList: true,
        cnt: this.cnt
      }
    });
      return await commonToDoList.present();
  }

  totalAndRemainingItemCount(list: ToDoList) {
    const totalCount = list.listItems.length;
    let count = 0;
    list.listItems.forEach(item => {
      if (item.completed) {
        count++;
      }
    });
    return `${count} of ${totalCount} completed`;
  }

  progressBarCount(list: ToDoList) {
    const totalCount = list.listItems.length;
    let remainingCount = 0;
    list.listItems.forEach(item => {
      if (item.completed) {
        remainingCount++;
      }
    });

    return (remainingCount / totalCount);
  }

  onCancel(cancelClicked: boolean) {
    this.isCancelled = true;
  }
}
