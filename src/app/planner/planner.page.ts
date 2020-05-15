import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.page.html',
  styleUrls: ['./planner.page.scss']
})
export class PlannerPage implements OnInit {
  /**
   * Below allTodo array is a mock data for UI purpose only
   */
  allTodo = [{
    id: 1,
    category: 'todo',
    title : 'grocery',
    items : ['okra', 'brinjal', 'ghiloda', 'cabbage', 'tuver frozen', 'meggie']
  },
  {
    id: 2,
    category: 'todo',
    title : 'Walmart',
    items : ['okra', 'brinjal', 'meggie']
  },
  {
    id: 3,
    category: 'todo',
    title : 'Canadian tire',
    items : ['okra', 'brinjal', 'ghiloda', 'cabbage', 'tuver frozen', 'meggie']
  },
  {
    id: 4,
    category: 'todo',
    title : 'Costco',
    items : ['okra', 'brinjal', 'ghiloda', 'cabbage' ]
  },
  {
    id: 5,
    category: 'todo',
    title : 'LCBO',
    items : ['okra', 'ghiloda', 'cabbage', 'tuver frozen', 'meggie']
  }];

  constructor() {}

  ngOnInit() {}
  /**
   * Todo ID, Incoming form todo-display component
   * @param id
   */
  clickedTodoId(id: number) {
    console.log('This is id of clicked Todo', id);
  }
}
