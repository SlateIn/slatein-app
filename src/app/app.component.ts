import { Component, OnDestroy } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from '@services/auth.service';

import { Plugins, PluginListenerHandle } from '@capacitor/core';

const { Network } = Plugins;


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnDestroy {
  networkStatusChangeListener: PluginListenerHandle;
  isNetworkOff = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private navCtrl: NavController,
    private auth: AuthService
  ) {
    this.initializeApp();
  }
  
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.checkNetworkConnection();
      this.auth.initializeIdleTimeOut();
      this.navCtrl.navigateRoot('/login');
    });
  }

  async offlinePage() {
    this.isNetworkOff = true;
    this.navCtrl.navigateForward('/offline-mode');
  }

  async checkNetworkConnection () {
    let status = await Network.getStatus();
    if(!status.connected) {
        this.offlinePage();
    }
    this.networkStatusChangeListener = Network.addListener('networkStatusChange', (status) => {
      if(!status.connected) {
        this.offlinePage();
      } else {
        setTimeout(() => {
          if(this.isNetworkOff) {
            this.navCtrl.pop();
          }
          this.isNetworkOff = false;
        }, 1500);
      }
    });
  }

  ngOnDestroy(): void {
    this.networkStatusChangeListener && this.networkStatusChangeListener.remove()
  }
}
