import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { TodoItemPage } from '@app/todo-item/todo-item.page';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],
})
export class TodoPage implements OnInit {
  taskChecked = false;
  public items: any = [];
  public listRows: number[] = [];
  public cnt = 0;
  public listData: any = [];
  public toDoForm: FormGroup;

  constructor(public router: Router,
              public fb: FormBuilder,
              private route: ActivatedRoute) {
                this.route.queryParams.subscribe(params => {
                  if (this.router.getCurrentNavigation().extras) {
                    this.listData = this.router.getCurrentNavigation().extras;
                    console.log('reverse1111', this.listData);
                  }
                });
  }

  ngOnInit() {
    this.toDoForm = this.fb.group({
      header: new FormControl('',  Validators.required)
    });
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
