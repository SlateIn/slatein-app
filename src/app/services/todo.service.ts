import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { ToDoList } from './../models/todoList';
import { ToDoItem } from './../models/todoItem';

@Injectable({
    providedIn: 'root'
})
export class ToDoService {

    constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) { }

    createToDoList(toDoList: ToDoList) {
        return this.db.object(`/users/${this.afAuth.auth.currentUser.uid}/todos/${toDoList.id}`).set(toDoList);
    }
    updateToDoList(toDoList: ToDoList) {
        return this.db.object(`/users/${this.afAuth.auth.currentUser.uid}/todos/${toDoList.id}`).update(toDoList);
    }
    deleteToDoList(toDoList: ToDoList) {
        return this.db.object(`/users/${this.afAuth.auth.currentUser.uid}/todos/${toDoList.id}`).remove();
    }


    createToDoItem(listId: number, toDoItem: ToDoItem) {
        return this.db.object(`/users/${this.afAuth.auth.currentUser.uid}/todos/${listId}/listItems/${toDoItem.id}`).set(toDoItem);
    }
    updateToDoitem(listId: number, toDoItem: ToDoItem) {
        return this.db.object(`/users/${this.afAuth.auth.currentUser.uid}/todos/${listId}/listItems/${toDoItem.id}`).update(toDoItem);
    }
    deleteToDoItem(listId: number, toDoItem: ToDoItem) {
        return this.db.object(`/users/${this.afAuth.auth.currentUser.uid}/todos/${listId}/listItems/${toDoItem.id}`).remove();
    }
}