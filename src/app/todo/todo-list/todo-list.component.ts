import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ToDoService } from '../services/todo.service';
import { ToDoItem } from '@models/todoItem';
import { ToDoList } from '@models/todoList';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {

  isNewList: boolean;
  newList: ToDoList;
  header: string;
  toDoList: ToDoList;
  list: ToDoItem[];
  id: number;
  allowEditToDo = false;
  cnt = 0;
  addingToDo = false;
  inputValue = '';

  constructor(private toDoService: ToDoService,
              private modalController: ModalController) {}

  ngOnInit() {
    if (this.isNewList) {
      this.header = '';
      this.list = [];
      this.newList = {id: 0, listName: this.header, listItems: this.list};
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
      this.toDoService.addNewList(this.newList);
    }

    await this.modalController.dismiss();
  }

  addTodo() {
    this.addingToDo = true;
  }

  deleteToDo(todo: any) {
    console.log(todo);
    const index: number = this.list.indexOf(todo);
    if (index !== -1) {
          this.list.splice(index, 1);
    }
  }

  toDoEntered() {
    if (this.inputValue !== '') {
      this.cnt++;
      const todo = {id: this.cnt, title: this.inputValue, completed: false};
      console.log(todo);
      this.addToDoInCommonList(todo);
      this.inputValue = '';
    } else {
      this.addingToDo = false;
    }
    this.addingToDo = false;
  }

  todoCompleted(todo: any) {
    if (!todo.completed) {
      todo.completed = true;
    } else {
      todo.completed = false;
    }
  }

  toDoClicked(todo: any) {
    this.allowEditToDo = true;
  }

  
  addToDoInCommonList(todo: ToDoItem) {
    this.list.push(todo);
    console.log(this.list);
}
}
