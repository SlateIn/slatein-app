import { Component, OnInit } from '@angular/core';
import { ToDoList } from '@models/todoList';
import { ToDoService } from '@services/todo.service';
import { ToDoItem } from '@models/todoItem';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.page.html',
  styleUrls: ['./planner.page.scss'],
})
export class PlannerPage implements OnInit {
  item1: ToDoItem;
  item2: ToDoItem;
  item3: ToDoItem;

  public toDoList: ToDoList = {
    id: undefined,
    listName: undefined,
    listItems: undefined
  };

  constructor(private toDoService: ToDoService) { }

  ngOnInit() {
    this.item1 = {
      id: 1,
      title: 'First List',
      completed: false
    };

    this.item2 = {
      id: 1,
      title: 'Second List',
      completed: false
    };

    this.item3 = {
      id: 1,
      title: 'Third List',
      completed: false
    };

    this.toDoList.id = 123;
    this.toDoList.listName = "My First List";
    this.toDoList.listItems = [this.item1, this.item2];

    console.log(this.toDoList);
  }

  onAddList() {
    console.log(this.toDoList);
    this.toDoService.createToDoList(this.toDoList).then(list => {
      console.log(list);
    });

  }

  onUpdateList() {
    this.toDoList.listItems.push(this.item3)

    console.log(this.toDoList);
    this.toDoService.updateToDoList(this.toDoList).then(list => {
      console.log(list);
    });
  }

  onDeleteList() {
    console.log(this.toDoList);
    this.toDoService.deleteToDoList(this.toDoList);
  }
}
