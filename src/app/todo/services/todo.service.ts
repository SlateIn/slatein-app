import { Injectable } from '@angular/core';
import { ToDoItem } from '@models/todoItem';
import { ToDoList } from '@models/todoList';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
    providedIn: 'root'
})
export class ToDoService {

    toDo: ToDoItem;
    toDos: ToDoItem[] = [];

    listRows: ToDoList[] =  [];
    constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) { }

    getAllLists() {
        console.log(this.listRows);
        return this.listRows;
    }

    addToDoInList(id: number, todo: ToDoItem) {
        this.listRows.forEach(row => {
            if (row.id === id) {
                row.listItems.unshift(todo);
            }
        });

        console.log(this.listRows);
        return this.listRows;
    }

    addNewList(list: ToDoList) {
        this.listRows.unshift(list);

        console.log(this.listRows);
        return this.listRows;

    }

    updateToDoList() {
        console.log(this.toDos);
    }

    deleteToDoList(row: ToDoList) {
        const index: number = this.listRows.indexOf(row);
        if (index !== -1) {
            this.listRows.splice(index, 1);
        }
    }
}