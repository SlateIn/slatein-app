import { Component, OnInit } from '@angular/core';
import { ToDoListItem } from '@models/todoListItem';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],
})
export class TodoPage implements OnInit {
  taskChecked = false;
  toDoList: ToDoListItem[] = [
  { title: 'ToDo1', description: 'Desc1', completed: false},
  { title: 'ToDo2', description: 'Desc2', completed: false},
  { title: 'ToDo3', description: 'Desc3', completed: false}
];

  constructor() { }

  ngOnInit() {
    console.log(this.taskChecked);
  }

  onTaskClicked() {
    this.taskChecked = !this.taskChecked;
  }
}
