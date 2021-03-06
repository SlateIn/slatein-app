import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, IonReorderGroup, LoadingController } from '@ionic/angular';
import { ToDoService } from '../services/todo.service';
import { ToDoItem } from '@models/todoItem';
import { ToDoList } from '@models/todoList';
import { EditTodoListComponent } from '../edit-todo-list/edit-todo-list.component';
import { LoaderService } from '@services/loader.service';

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
  cnt: number;
  previousTotalList: number;
  isCurrentDataChanged = false;
  addingToDo = false;
  inputValue = '';

  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;

  constructor(private toDoService: ToDoService,
              private modalController: ModalController,
              private loadingCtrl: LoadingController) {}

  ngOnInit() {
    this.previousTotalList = this.cnt;
    if (this.isNewList) {
      this.header = '';
      this.list = [];
      this.newList = {id: new Date().getTime(), listName: this.header, listItems: this.list};
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
      // const editToDoList = await this.modalController.create({
      //   component: EditTodoListComponent,
      //   componentProps: {
      //     id: this.id,
      //     header: this.header,
      //     list: this.list,
      //     cnt: this.cnt
      //   }
      // });
      // return await editToDoList.present();

      this.modalController.create({
        component: EditTodoListComponent,
        componentProps: {
          id: this.id,
          header: this.header,
          list: this.list,
          cnt: this.cnt
        }
      }).then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss();
      }).then(resultData => {
        if ('confirm' === resultData.role) {

          this.loadingCtrl.create({
            message: 'Loading list data...'
          }).then(loadingEl => {
            loadingEl.present();
            this.header = resultData.data.header;
            this.list = resultData.data.list;
            loadingEl.dismiss();
          });
        }
      });
  }
}
