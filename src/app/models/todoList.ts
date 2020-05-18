import { ToDoItem } from './todoItem';

export interface ToDoList {
    id?: number;
    listName: string;
    listItems: ToDoItem [];
}
