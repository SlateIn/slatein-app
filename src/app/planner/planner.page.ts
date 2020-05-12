import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.page.html',
  styleUrls: ['./planner.page.scss']
})
export class PlannerPage implements OnInit {
  allList = [{
    category: 'todo',
    title : 'grocery',
    items : ['okra', 'brinjal', 'ghiloda', 'cabbage', 'tuver frozen', 'meggie']
  },
  {
    category: 'todo',
    title : 'Walmart',
    items : ['okra', 'brinjal', 'ghiloda', 'cabbage', 'tuver frozen', 'meggie']
  },
  {
    category: 'todo',
    title : 'Canadian tire',
    items : ['okra', 'brinjal', 'ghiloda', 'cabbage', 'tuver frozen', 'meggie']
  },
  {
    category: 'todo',
    title : 'Costco',
    items : ['okra', 'brinjal', 'ghiloda', 'cabbage', 'tuver frozen', 'meggie']
  },
  {
    category: 'todo',
    title : 'LCBO',
    items : ['okra', 'brinjal', 'ghiloda', 'cabbage', 'tuver frozen', 'meggie']
  }];
 
  constructor() {}

  ngOnInit() {}
}
