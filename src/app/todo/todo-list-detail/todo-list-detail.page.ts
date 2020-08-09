import { Component, OnInit, ViewChild } from '@angular/core';
import { ToDoList } from '@models/todoList';
import { ToDoItem } from '@models/todoItem';
import { IonReorderGroup, ModalController, NavController, LoadingController } from '@ionic/angular';
import { ToDoService } from '../services/todo.service';
import { EditTodoListComponent } from '../edit-todo-list/edit-todo-list.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-todo-list-detail',
  templateUrl: './todo-list-detail.page.html',
  styleUrls: ['./todo-list-detail.page.scss'],
})
export class TodoListDetailPage implements OnInit {
  isNewList: boolean;
  cuttentList = {} as ToDoList;
  // id = 0;
  // header: string;
  // listItems: ToDoItem[] = [];
  cnt: number;
  totalCount: number;
  completedCount: number;
  progressBarCount: number;
  isCurrentDataChanged = false;
  addingToDo = false;
  inputValue = '';

  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;

  constructor(private toDoService: ToDoService,
              private modalController: ModalController,
              private route: ActivatedRoute,
              private navCtrl: NavController,
              private loadingCtrl: LoadingController) {}

  ngOnInit() {
    this.route.paramMap.subscribe( paramMap => {
      if (!paramMap.has('listId')) {
        this.navCtrl.navigateBack('tabs/todo');
        return;
      } else {
        this.toDoService.getList(paramMap.get('listId')).subscribe(list => {
          this.cuttentList = list;
          // this.id = list.id;
          // this.header = list.listName;
          // this.listItems = list.listItems;
          this.totalCount = this.toDoService.getTotoalItemCount(this.cuttentList);
          this.completedCount = this.toDoService.getCompletedItemCount(this.cuttentList);
          this.progressBarCount = this.toDoService.getProgressBarCount(this.cuttentList);
        });
      }
    });
  }

  close() {

    if (this.isCurrentDataChanged) {
      this.toDoService.updateToDoList(this.cuttentList.id, this.cuttentList.listName, this.cuttentList.listItems);
    }

    this.navCtrl.navigateBack('tabs/todo');
  }

  todoCompleted(todo: any) {
    this.cuttentList.listItems.forEach(item => {
        if (item === todo) {
          if (!todo.completed) {
            item.completed = true;
            this.completedCount++;
          } else {
            item.completed = false;
            this.completedCount--;
          }
          this.progressBarCount = (this.completedCount / this.totalCount);
          this.isCurrentDataChanged = true;
        }
      });
  }

  headerChanged() {
    this.isCurrentDataChanged = true;
  }

  async gotoEditToDoListModal() {
    if (this.cuttentList.listItems === undefined || this.cuttentList.listItems === null) {
      this.cuttentList.listItems = [];
    }

    this.modalController.create({
      component: EditTodoListComponent,
      componentProps: {
        id: this.cuttentList.id,
        header: this.cuttentList.listName,
        list: this.cuttentList.listItems,
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
          this.cuttentList.listName = resultData.data.header;
          this.cuttentList.listItems = resultData.data.list;
          this.totalCount = this.toDoService.getTotoalItemCount(this.cuttentList);
          this.completedCount = this.toDoService.getCompletedItemCount(this.cuttentList);
          this.progressBarCount = this.toDoService.getProgressBarCount(this.cuttentList);
          loadingEl.dismiss();
        });
      }
    });
  }

  totalAndRemainingItemCount() {
    if (this.totalCount > 0) {
      return `${this.completedCount} of ${this.totalCount} completed`;
    } else {
      return `No item is added to this list`;
    }
  }

  getProgressBarCount() {
    return this.progressBarCount;
  }
}
