import { Injectable } from '@angular/core';
import { PluginListenerHandle, Plugins } from '@capacitor/core';
import { ModalController } from '@ionic/angular';
import { OfflineModePage } from '@app/offline-mode/offline-mode.page';

const { Network } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  networkStatusChangeListener: PluginListenerHandle;
  offlineModePage: HTMLIonModalElement;
  isNetworkOff = false;
  
  constructor(private modalController: ModalController,) { }

  
  async offlineModal() {
    this.isNetworkOff = true;
    this.offlineModePage = await this.modalController.create({
      component: OfflineModePage
    });
    await this.offlineModePage.present();
  }

  async checkNetworkConnection () {
    this.offlineModePage = await this.modalController.create({
      component: OfflineModePage
    });
    
    let status = await Network.getStatus();
    if(!status.connected) {
        this.offlineModal();
    }
    this.networkStatusChangeListener = Network.addListener('networkStatusChange', (status) => {
      if(!status.connected) {
        this.offlineModal();
      } else {
        setTimeout(() => {
          this.offlineModePage && this.offlineModePage.dismiss();
          this.isNetworkOff = false;
        }, 100);
      }
    });
  }

  destroy(): void {
    this.offlineModePage && this.offlineModePage.dismiss();
    this.networkStatusChangeListener && this.networkStatusChangeListener.remove()
  }


}
