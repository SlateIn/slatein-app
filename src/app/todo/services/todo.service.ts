import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ToDoService {

    toDo: {id: number, title: string, completed: boolean};
    toDoList: {id: number, title: string, completed: boolean}[] = [];


    getToDoList() {
        console.log(this.toDoList);
        return this.toDoList;
    }

    addToDoInList(todo: {id: number, title: string, completed: boolean}) {
        console.log(this.toDoList);
        this.toDoList.unshift(todo);
        return this.toDoList;
    }

    updateToDoList() {
        console.log(this.toDoList);
    }
}