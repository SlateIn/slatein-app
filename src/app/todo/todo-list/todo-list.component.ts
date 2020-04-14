import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ToDoService } from '../services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {

  header: string;
  list: {id: number, title: string, todos: []};
  todos: {id: number, title: string, completed: boolean} [] = [];
  public cnt: number;
  addingToDo = false;

  constructor(private toDoService: ToDoService,
              private modalController: ModalController) { }

  ngOnInit() {
    this.todos = this.list.todos;
  }

  async close() {
    await this.modalController.dismiss();
  }

  addTodo() {
    this.addingToDo = true;
  }

  toDoEntered(value: any) {
    console.log(value);
    if (value.target.value !== '') {
      this.cnt++;
      const todo = {id: this.cnt, title: value.target.value, completed: false};
      this.toDoService.addToDoInList(todo);
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

}
