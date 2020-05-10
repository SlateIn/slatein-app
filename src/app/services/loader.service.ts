import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  constructor(public loadingController: LoadingController) {}

  async present(msg: string) {
    const loading = await this.loadingController.create({
      message: msg
    });
    await loading.present();
  }

  async dismiss() {
    await this.loadingController.dismiss();
  }
}
