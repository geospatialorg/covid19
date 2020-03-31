import {Injectable} from '@angular/core';

import {Platform} from '@angular/cdk/platform';
import {timer} from 'rxjs';
import {take} from 'rxjs/operators';
import {InstallPromptComponent} from '../components/install-prompt/install-prompt.component';
import {NotificationsService} from './notifications.service';
import {environment as appConfig} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PwaService {
  private promptEvent: any;

  constructor(
    private platform: Platform,
    private notificationsService: NotificationsService
  ) {
  }

  initService() {
    this.iniNotificationPrompt();
    this.initInstallPrompt();
  }

  public iniNotificationPrompt() {
    if (this.notificationsService.canRequestPermission()) {
      timer(appConfig.notification_request_delay)
        .pipe(take(1))
        .subscribe(() => {
          this.notificationsService.requestPermission();
        });
    }
  }

  public initInstallPrompt() {
    // disable install for the moment
    window.addEventListener('beforeinstallprompt', (event: any) => {
      event.preventDefault();
      return;
    });
    // console.log(this.platform);
    // if (this.platform.ANDROID) {
    //   window.addEventListener('beforeinstallprompt', (event: any) => {
    //     event.preventDefault();
    //     this.promptEvent = event;
    //     this.openPromptComponent('android');
    //   });
    // }
    // if (this.platform.IOS) {
    //   const isInStandaloneMode = ('standalone' in window.navigator) && (window.navigator['standalone']);
    //   if (!isInStandaloneMode) {
    //     this.openPromptComponent('ios');
    //   }
    // }
  }

  private openPromptComponent(mobileType: 'ios' | 'android') {
    // timer(3000)
    //   .pipe(take(1))
    //   .subscribe(() => this.promptComponent.openModal({}));
    // open(PromptComponent, { data: { mobileType, promptEvent: this.promptEvent } }));
  }
}
