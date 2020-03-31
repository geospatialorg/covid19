import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor() { }

  isNotificationApiAvailable(): boolean {
    return 'Notification' in window;
  }

  isNotificationPermissionGranted(): boolean {
    if (this.isNotificationApiAvailable()) {
      return Notification.permission === 'granted';
    }
    return false;
  }

  isNotificationPermissionDenied(): boolean {
    if (this.isNotificationApiAvailable()) {
      return Notification.permission === 'denied';
    }
    return false;
  }

  /**
   * Prompt user for permission
   */
  requestPermission(): void {
    if (this.canRequestPermission()) {
      Notification.requestPermission((status) => {
        console.log('Notification permission status:', status);
      });
    }
  }

  canRequestPermission(): boolean {
    return (this.isNotificationApiAvailable() && !this.isNotificationPermissionDenied() && !this.isNotificationPermissionDenied());
  }

  showNotification(message) {
    if (!this.isNotificationPermissionGranted()) {
      return;
    }
    const options = {
      // "Visual Options",
      body: message,
      icon: '/favicon.ico',
      // image: '<URL String>',
      // badge: '<URL String>',
      // vibrate: '<Array of Integers>',
      // sound: '<URL String>',
      // dir: '<String of \'auto\' | \'ltr\' | \'rtl\'>',
      //
      // // "Behavioral Options",
      // tag: '<String>',
      // data: '<Anything>',
      // requireInteraction: '<boolean>',
      // renotify: '<Boolean>',
      // silent: '<Boolean>',
      //
      // // "Both visual & behavioral options",
      // actions: '<Array of Strings>',
      //
      // // "Information Option. No visual affect.",
      // timestamp: '<Long>'
    };
    console.log('notify');
    return new Notification('COVID19 România', options);
  }
}
