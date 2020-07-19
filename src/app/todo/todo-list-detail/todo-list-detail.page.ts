import { Component, OnInit, ViewChild } from '@angular/core';
import { ToDoList } from '@models/todoList';
import { ToDoItem } from '@models/todoItem';
import { IonReorderGroup, ModalController, NavController } from '@ionic/angular';
import { ToDoService } from '../services/todo.service';
import { EditTodoListComponent } from '../edit-todo-list/edit-todo-list.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todo-list-detail',
  templateUrl: './todo-list-detail.page.html',
  styleUrls: ['./todo-list-detail.page.scss'],
})
export class TodoListDetailPage implements OnInit {

  isNewList: boolean;
  newList: ToDoList;
  id = 0;
  header: string;
  list: ToDoItem[] = [];
  cnt: number;
  previousTotalList: number;
  isCurrentDataChanged = false;
  addingToDo = false;
  inputValue = '';

  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;

  constructor(private toDoService: ToDoService,
              private modalController: ModalController,
              private route: ActivatedRoute,
              private navCtrl: NavController) {}

  ngOnInit() {
    this.route.paramMap.subscribe( paramMap => {
      if (!paramMap.has('listId')) {
        this.navCtrl.navigateBack('tabs/todo');
        return;
      } else {
        
      }
    })
    // this.previousTotalList = this.cnt;
    // if (this.isNewList) {
    //   this.header = '';
    //   this.list = [];
    //   this.newList = {id: new Date().getTime(), listName: this.header, listItems: this.list};
    // }
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
          } else {
            item.completed = false;
          }
          this.isCurrentDataChanged = true;
        }
      });
  }

  headerChanged() {
    this.isCurrentDataChanged = true;
  }

  createChecklistAndClose() {

  }

  async gotoEditToDoListModal() {
      const editToDoList = await this.modalController.create({
        component: EditTodoListComponent,
        componentProps: {
          id: this.id,
          header: this.header,
          list: this.list,
          cnt: this.cnt
        }
      });
      return await editToDoList.present();
  }
}
