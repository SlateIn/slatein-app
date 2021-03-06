import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe, TitleCasePipe } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgCalendarModule } from 'ionic2-calendar';
import { SettingsPage } from './profile/settings/settings.page';
import { PersonalInformationPage } from './profile/personal-information/personal-information.page';
import { SecurityPasswordPage } from './profile/security-password/security-password.page';
import { TodoListComponent } from './todo/todo-list/todo-list.component';

// ionic4-datepicker
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';


import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { MomentModule } from 'angular2-moment';
import { OfflineModePageModule } from './offline-mode/offline-mode.module';
import { SharedcomponentModule } from './components/sharedcomponent.module';
import { NewTodoListComponent } from './todo/new-todo-list/new-todo-list.component';
import { EditTodoListComponent } from './todo/edit-todo-list/edit-todo-list.component';


@NgModule({
  declarations: [
    AppComponent,
    SettingsPage,
    PersonalInformationPage,
    SecurityPasswordPage,
    TodoListComponent,
    NewTodoListComponent,
    EditTodoListComponent
  ],
  entryComponents: [
    SettingsPage,
    PersonalInformationPage,
    SecurityPasswordPage,
    TodoListComponent,
    NewTodoListComponent,
    EditTodoListComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    NgCalendarModule,
    FormsModule,
    IonicModule.forRoot({
      mode: 'ios'
    }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AppRoutingModule,
    ReactiveFormsModule,
    Ionic4DatepickerModule,
    MomentModule,
    BrowserAnimationsModule,
    NgIdleKeepaliveModule.forRoot(),
    HttpClientModule,
    SharedcomponentModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    DatePipe,
    TitleCasePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
