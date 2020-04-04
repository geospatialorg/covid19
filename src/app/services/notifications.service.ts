import {Injectable} from '@angular/core';
import {environment as appConfig, environment} from '../../environments/environment';
import {timer} from 'rxjs';
import {take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private notificationTitle = 'COVID19 România';
  private notificationIcon = '/favicon.ico';

  // notification options
  private notificationDefaultOptions = {
    // "Visual Options",
    body: '',
    icon: this.notificationIcon,
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

  constructor() {
  }

  init() {
    if (this.enabled()) {
      // do magic
      this.promptPermissionGrant();
    }
  }

  promptPermissionGrant() {
    if (this.canRequestPermission()) {
      timer(appConfig.notification_prompt_delay)
        .pipe(take(1))
        .subscribe(() => {
          this.requestPermission();
        });
    }
  }

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
    return (
      this.enabled()
      && this.isNotificationApiAvailable()
      && !this.isNotificationPermissionDenied()
    );
  }

  enabled() {
    return environment.enable_notifications;
  }

  showNotification(message) {
    if (!this.enabled() || !this.isNotificationPermissionGranted()) {
      return;
    }
    // delay the trigger a little bit to allow browser to change ui before the sending the notification
    setTimeout(() => {
      this.notificationDefaultOptions.body = message;
      return new Notification(this.notificationTitle, this.notificationDefaultOptions);
    }, 5000);
  }
}
