import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, IonReorderGroup } from '@ionic/angular';
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
  id = 0;
  header: string;
  list: ToDoItem[] = [];
  completedToDos: ToDoItem[] = [];
  pendingToDos: ToDoItem[] = [];
  cnt: number;
  previousTotalList: number;
  isCurrentDataChanged = false;
  addingToDo = false;
  inputValue = '';

  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;

  constructor(private toDoService: ToDoService,
              private modalController: ModalController) {}

  ngOnInit() {
    this.previousTotalList = this.cnt;

    if (this.isNewList) {
      this.header = '';
      this.list = [];
      this.newList = {id: new Date().getTime(), listName: this.header, listItems: this.list};
    } else {
      this.list.forEach((todo: ToDoItem) => {
        if (todo.completed === true) {
          this.completedToDos.push(todo);
        } else {
          this.pendingToDos.push(todo);
        }
      });
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
    } else if (this.isCurrentDataChanged) {
      this.toDoService.updateToDoList(this.id, this.header, this.list);
    }

    await this.modalController.dismiss();
  }

  deleteToDo(todo: any) {
    console.log(todo);
    const index: number = this.list.indexOf(todo);
    if (index !== -1) {
          this.list.splice(index, 1);
          this.isCurrentDataChanged = true;
    }
  }

  toDoEntered() {
    if (this.inputValue !== '') {
      this.cnt++;
      const todo = {id: new Date().getTime(), title: this.inputValue, completed: false};
      this.list.push(todo);
      this.inputValue = '';
      this.isCurrentDataChanged = true;
    } else {
      this.addingToDo = false;
    }
    this.addingToDo = false;
  }

  todoCompleted(todo: any) {
      this.list.forEach(item => {
        if (item === todo) {
          if (!todo.completed) {
            item.completed = true;
            this.completedToDos.push(todo);
            this.pendingToDos.splice(todo, 1);
          } else {
            item.completed = false;
            this.pendingToDos.push(todo);
            this.completedToDos.splice(todo, 1);
          }
          this.isCurrentDataChanged = true;
        }
      });
      console.log(this.list);
      console.log(this.completedToDos);
      console.log(this.pendingToDos);
  }

  headerChanged() {
    this.isCurrentDataChanged = true;
  }
}
