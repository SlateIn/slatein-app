import { Injectable } from '@angular/core';
import { ToDoItem } from '@models/todoItem';
import { ToDoList } from '@models/todoList';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { take, map } from 'rxjs/operators';

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
        return this.db.list<ToDoList>(`/users/${this.afAuth.auth.currentUser.uid}/todo`).valueChanges().pipe(map((lists: ToDoList[]) => {
            lists.forEach(list => {
              if (list.listItems === null) {
                console.log(list);
                list.listItems = [];
                console.log(list);
              }
            });
            return lists;
          }));
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
        return this.getAllLists().pipe(take(1), map(lists => {
            return lists.find(list => list.id === +id);
        }));
    }

    getTotoalItemCount(list: ToDoList) {
        if (list.listItems !== undefined && list.listItems !== null) {
            return list.listItems.length;
        } else {
            return 0;
        }
    }

    getCompletedItemCount(list: ToDoList) {
        let totalCount = 0;
        if (list.listItems !== undefined && list.listItems !== null) {
            totalCount = list.listItems.length;
        } else {
            return 0;
        }

        let count = 0;
        if (totalCount > 0) {
          list.listItems.forEach(item => {
            if (item.completed) {
              count++;
            }
          });
          return count;
        } else {
          return 0;
        }
    }

    getProgressBarCount(list: ToDoList) {
        let totalCount = 0;
        if (list.listItems !== undefined && list.listItems !== null) {
            totalCount = list.listItems.length;
        } else {
            return 0;
        }
        let remainingCount = 0;
        if (list.listItems.length > 0) {
          list.listItems.forEach(item => {
            if (item.completed) {
              remainingCount++;
            }
          });

          return (remainingCount / totalCount);
        } else {
          return 0;
        }
    }
}
