import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-todo-view',
  templateUrl: './todo-view.page.html',
  styleUrls: ['./todo-view.page.scss'],
})
export class TodoViewPage implements OnInit {
  todo;
  public toDoForm: FormGroup;

  @ViewChild('inputFocus', { static: false }) inputFocus: ElementRef;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.todo = this.router.getCurrentNavigation().extras.state.header;
      }
    });
   }

  ngOnInit() {
    this.toDoForm = this.fb.group({
      new_tasks: this.fb.array([this.fb.group({task: ''})])
    });
  }

  get newTasks() {
    return this.toDoForm.get('new_tasks') as FormArray;
  }

  addNewTask(): void {
    this.newTasks.push(this.fb.group({task: ''}));
  }

  deleteTask(index): void {
    this.newTasks.removeAt(index);
  }

  back() {
   const newObj = {
    key: this.todo,
    ... this.toDoForm.value,
    };
   console.log('new obj is', newObj);
   this.router.navigate(['todo'], this.toDoForm.value);
  }

}
