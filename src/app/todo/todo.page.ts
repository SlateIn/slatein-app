import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ToDoService } from './services/todo.service';
import { TodoListComponent } from './todo-list/todo-list.component';
import { ToDoList } from '@models/todoList';
import { ToDoItem } from '@models/todoItem';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],
})
export class TodoPage implements OnInit {
  taskChecked = false;
  todos: ToDoItem[] = [];
  index: number;
  addingToDo = false;
  addingList = false;
  viewAllLinkDisplay = true;
  listRows: ToDoList[] = [];
  public cnt = 0;
  public listData: any = [];

  constructor(private toDoService: ToDoService,
              private modalController: ModalController) {}

  ngOnInit() {
    this.toDoService.getAllLists().subscribe((lists: ToDoList[]) => {
      if (lists !== null) {
          this.listRows = lists;
          this.cnt = this.listRows.length;
      }
  });

  }

  deleteRow(row: any) {
    this.toDoService.deleteToDoList(row);
  }

  async gotoToDoListModal(list: ToDoList) {
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
  }

  async gotoNewListModal() {
      const commonToDoList = await this.modalController.create({
      component: TodoListComponent,
      componentProps: {
        isNewList: true,
        cnt: this.cnt
      }
    });
      return await commonToDoList.present();
  }
}
