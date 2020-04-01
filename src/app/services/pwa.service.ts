import {Injectable} from '@angular/core';

import {Platform} from '@angular/cdk/platform';
import {environment, environment as appConfig} from '../../environments/environment';
import {SwUpdate} from '@angular/service-worker';


@Injectable({
  providedIn: 'root'
})
export class PwaService {
  private promptEvent: any;

  constructor(
    private platform: Platform,
    private swUpdate: SwUpdate
  ) {
  }

  init() {
    if (this.enabled()) {
      // do magic
      this.promptInstall();
    }
  }

  enabled() {
    return environment.enable_service_worker && environment.enable_pwa_mobile_install;
  }


  promptInstall() {

    // disable install for the moment
    if (true || !this.enabled()) {
      window.addEventListener('beforeinstallprompt', (event: any) => {
        event.preventDefault();
        return;
      });
    }
    return;

    // navigator.serviceWorker.addEventListener('controllerchange', () => {
    //   // This fires when the service worker controlling this page
    //   // changes, eg a new worker has skipped waiting and become
    //   // the new active worker.
    // });

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
    //
    //
    // this.swUpdate.available.subscribe(event => {
    //   console.log('current version is', event.current);
    //   console.log('available version is', event.available);
    // });
    // this.swUpdate.activated.subscribe(event => {
    //   console.log('old version was', event.previous);
    //   console.log('new version is', event.current);
    // });
    //
    // this.swUpdate.available.subscribe(event => {
    //   this.swUpdate.activateUpdate().then(() => this.updateApp());
    // });
  }

  private updateApp() {
    console.log('app update')
    // found some cases when path is 500, not sure why, maybe because sw updates
    document.location.href = document.location.origin;
    console.log('The app is updating right now');

  }

  private openPromptComponent(mobileType: 'ios' | 'android') {
    // timer(3000)
    //   .pipe(take(1))
    //   .subscribe(() => this.promptComponent.openModal({}));
    // open(PromptComponent, { data: { mobileType, promptEvent: this.promptEvent } }));
  }
}
