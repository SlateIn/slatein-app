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
    todolist: ToDoList;
    listRows: ToDoList[] =  [];
    constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) { }

    getAllLists() {
        return this.db.list(`/users/${this.afAuth.auth.currentUser.uid}/todo`).valueChanges();
    }

    addNewList(list: ToDoList) {
        return this.db.object(`/users/${this.afAuth.auth.currentUser.uid}/todo/${list.id}`).set(list);
    }

    updateToDoList(id: number, header: string, list: ToDoItem[]) {
        return this.db.object(`/users/${this.afAuth.auth.currentUser.uid}/todo/${id}`).update({listName: header, listItems: list});
    }

    deleteToDoList(list: ToDoList) {
        return this.db.object(`/users/${this.afAuth.auth.currentUser.uid}/todo/${list.id}`).remove();
    }

    getList(id: string) {
        return this.getAllLists
    }
}