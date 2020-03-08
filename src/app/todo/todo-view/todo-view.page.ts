import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-todo-view',
  templateUrl: './todo-view.page.html',
  styleUrls: ['./todo-view.page.scss'],
})
export class TodoViewPage implements OnInit {
  todos;
  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      if(this.router.getCurrentNavigation().extras.state) {
        this.todos = this.router.getCurrentNavigation().extras.state.todo;
      }
    });
   }

  ngOnInit() {
    console.log('todo', this.todos.data.title);
  }

}
