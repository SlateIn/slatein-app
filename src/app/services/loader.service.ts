import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  isLoading = false;

  constructor(public loadingController: LoadingController) { }

  async present(msg: string) {
    this.isLoading = true;
    return await this.loadingController.create({
      message: msg,
      duration: 5000,
    }).then(a => {
      a.present().then(() => {
        if (!this.isLoading) {
          a.dismiss().then(() => 'Dissmiss Loader');
        }
      });
    });
  }

  async dismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => 'Dissmiss Loader');
  }
}