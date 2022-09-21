import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  constructor(
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  async infoAlert(message: string) {
    const alert = await this.alertController.create({
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async sendToastMessage(
    position: 'top' | 'middle' | 'bottom',
    message: string
  ) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position,
    });

    await toast.present();
  }
}
