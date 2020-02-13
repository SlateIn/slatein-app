import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AngularFireModule} from '@angular/fire';
import { AngularFireDatabaseModule} from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment} from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgCalendarModule  } from 'ionic2-calendar';
import { SettingsPage } from './profile/settings/settings.page';
import { PersonalInformationPage } from './profile/personal-information/personal-information.page';
import { SecurityPasswordPage } from './profile/security-password/security-password.page';

// ionic4-datepicker
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';



@NgModule({
  declarations: [AppComponent, SettingsPage, PersonalInformationPage, SecurityPasswordPage],
  entryComponents: [SettingsPage, PersonalInformationPage, SecurityPasswordPage],
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
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
