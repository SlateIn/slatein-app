import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { TodoItemPage } from '@app/todo/todo-item/todo-item.page';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
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
    this.todos = this.toDoService.getAllToDos();
    this.cnt = this.todos.length;
    this.viewAllLinkDisplay = this.todos.length > 0 ? true : false;
    this.listRows = this.toDoService.getAllLists();
  }

  addTodo() {
    this.addingToDo = true;
  }

  toDoEntered(value: any) {
    console.log(value);
    if (value.target.value !== '') {
      this.cnt++;
      const todo: ToDoItem = {id: this.cnt, title: value.target.value, completed: false};
      this.toDoService.addToDoInCommonList(todo);
      this.viewAllLinkDisplay = true;
    } else {
      this.addingToDo = false;
    }
    this.addingToDo = false;
  }

  todoClicked(todo: any) {
    if (!todo.completed) {
      todo.completed = true;
    } else {
      todo.completed = false;
    }
  }

  addList() {
    this.addingList = true;
  }

  deleteRow(row: any) {
    console.log(row);
    this.toDoService.deleteToDoList(row);
  }

  newlistEntered(value: any) {
    console.log(value);
    if (value.target.value !== '') {
      this.cnt++;
      const listToDos: ToDoItem[] = [];
      const newList: ToDoList = {id: this.cnt, listName: value.target.value, listItems: listToDos};
      this.toDoService.addNewList(newList);
    } else {
      this.addingList = false;
    }
    this.addingList = false;
  }

  async gotoToDoModal() {
    const commonToDoPage = await this.modalController.create({
      component: TodoItemPage,
      componentProps: {
        header: 'ToDo',
        cnt: this.cnt,
        list: this.toDoService.getAllToDos()
      }
    });
    return await commonToDoPage.present();
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
