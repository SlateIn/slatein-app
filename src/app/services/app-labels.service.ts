import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { LoaderService } from './loader.service';

@Injectable({
    providedIn: 'root'
})
export class AppLabels {
    constructor(
        private db: AngularFireDatabase
        ) {}

    getComponentContent(name: string) {
        return this.db.object(`/admin/appLabels/${name}`).valueChanges();
    }
}
