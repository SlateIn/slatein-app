import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, NavController } from '@ionic/angular';
import { ToDoService } from './services/todo.service';
import { TodoListComponent } from './todo-list/todo-list.component';
import { ToDoList } from '@models/todoList';
import { ToDoItem } from '@models/todoItem';
import { NewTodoListComponent } from './new-todo-list/new-todo-list.component';
import { map } from 'rxjs/operators';


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
              private alertController: AlertController,
              private navController: NavController) {}

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

  async gotoToDoLisPage(list: ToDoList) {
    if (!this.isCancelled) {
      if (list.listItems === undefined) {
        list.listItems = [];
      }
      await this.navController.navigateForward(`/tabs/todo/${list.id}`);
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

  totalAndCompletedItemCount(list: ToDoList) {
    const totalCount = this.toDoService.getTotoalItemCount(list);
    const completedCount = this.toDoService.getCompletedItemCount(list);

    if (totalCount > 0) {
      return `${completedCount} of ${totalCount} completed`;
    } else {
      return `No item is added to this list`;
    }
  }

  progressBarCount(list: ToDoList) {
    return this.toDoService.getProgressBarCount(list);
  }

  onCancel(cancelClicked: boolean) {
    this.isCancelled = true;
  }

  isAllItemCompleted(list: ToDoList) {
    const totalCount = this.toDoService.getTotoalItemCount(list);
    const completedCount = this.toDoService.getCompletedItemCount(list);

    return (totalCount > 0 && totalCount === completedCount);
  }
}
