import { Component, OnInit } from '@angular/core';
import { ToDoList } from '@models/todoList';
import { ToDoService } from '@services/todo.service';
import { ToDoItem } from '@models/todoItem';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.page.html',
  styleUrls: ['./planner.page.scss']
})
export class PlannerPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
