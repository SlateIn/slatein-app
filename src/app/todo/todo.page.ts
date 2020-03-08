import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { TodoItemPage } from '@app/todo-item/todo-item.page';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],
})
export class TodoPage implements OnInit {
  taskChecked = false;
  public items: any = [];
  constructor(private modalController: ModalController,
              public router: Router) { }

  ngOnInit() {
    
  }

  async addItem() {
      const addModal =  await this.modalController.create({component: TodoItemPage});
      addModal.onDidDismiss()
      .then((item) => {
        if (item) {
          console.log('item is', item);
          this.saveItem(item);
        }
      });
      return await addModal.present();
  }

  async viewItem(todo) {
    const navigationExtras: NavigationExtras = {
      state: {
        todo
      }
    };
    this.router.navigate(['/todo/view'], navigationExtras);
  }

  saveItem(item: any) {
    this.items.push(item);
  }

}
