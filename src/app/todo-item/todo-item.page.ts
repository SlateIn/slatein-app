import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.page.html',
  styleUrls: ['./todo-item.page.scss'],
})
export class TodoItemPage implements OnInit {

  header: string;
  title: string;
  description: string;

  @ViewChild('todoDetail', {static: false}) todoDetail: ElementRef;

  constructor(private modalController: ModalController,
              private renderer: Renderer2) { }

  ngOnInit() {
  }

  async close() {
    await this.modalController.dismiss();
  }

  async saveItem() {
    const newItem = {
      title: this.title,
      description: this.description
    };
    await this.modalController.dismiss(newItem);

  }

}
