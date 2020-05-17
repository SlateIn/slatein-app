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
    this.cnt = this.todos.length;
    this.viewAllLinkDisplay = this.todos.length > 0 ? true : false;
    this.listRows = this.toDoService.getAllLists();
  }

  deleteRow(row: any) {
    console.log(row);
    this.toDoService.deleteToDoList(row);
  }

  async gotoToDoListModal(list: any) {
    const commonToDoList = await this.modalController.create({
      component: TodoListComponent,
      componentProps: {
        isNewList: false,
        todoList: list,
        header: list.listName,
        id: list.id,
        list: list.listItems
      }
    });
    return await commonToDoList.present();
  }

  async gotoNewListModal() {
      const commonToDoList = await this.modalController.create({
      component: TodoListComponent,
      componentProps: {
        isNewList: true
      }
    });
      return await commonToDoList.present();
  }
}
