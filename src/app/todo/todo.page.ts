import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { TodoItemPage } from '@app/todo/todo-item/todo-item.page';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToDoService } from './services/todo.service';
import { TodoListComponent } from './todo-list/todo-list.component';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],
})
export class TodoPage implements OnInit {
  taskChecked = false;
  todos = [];
  index: number;
  addingToDo = false;
  viewAllLinkDisplay = true;
  listRow: {id: number,
            title: string,
            todos: []};
  public listRows = [];
  public cnt = 0;
  public listData: any = [];
  public toDoForm: FormGroup;

  constructor(private toDoService: ToDoService,
              public router: Router,
              public fb: FormBuilder,
              private route: ActivatedRoute,
              private modalController: ModalController) {
                this.route.queryParams.subscribe(params => {
                  if (this.router.getCurrentNavigation().extras) {
                    this.listData = this.router.getCurrentNavigation().extras;
                    console.log('reverse1111', this.listData);
                  }
                });
  }

  ngOnInit() {
    this.todos = this.toDoService.getToDoList();
    this.cnt = this.todos.length;
    this.viewAllLinkDisplay = this.todos.length > 0 ? true : false;

    this.toDoForm = this.fb.group ({
      todoInput: new FormControl('',  Validators.required)
    });

    this.listRows =  [
      {id: 1, title: '1st List', todos: []},
      {id: 2, title: '2st List', todos: []},
      {id: 3, title: '3st List', todos: []}
    ];
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
      //this.todos.unshift(todo);
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

  async gotoToDoModal() {
    const commonToDoPage = await this.modalController.create({
      component: TodoItemPage,
      componentProps: {
        header: 'ToDo',
        cnt: this.cnt,
        list: this.toDoService.getToDoList()
      }
    });
    return await commonToDoPage.present();
  }

  async gotoToDoListModal(list: any) {
    const commonToDoList = await this.modalController.create({
      component: TodoListComponent,
      componentProps: {
        header: list.title,
        list: list.todos
      }
    });
    return await commonToDoList.present();
  }

  async addItem() {
    this.listRows.push(this.cnt++);
  }

  async addDetails(headerName) {
    const navigationExtras: NavigationExtras = {
      state: {
        header: headerName.header
      }
    };
    this.router.navigate(['/todo/view'], navigationExtras);
  }
}
