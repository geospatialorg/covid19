import {HostListener, Injectable} from '@angular/core';

import {Platform} from '@angular/cdk/platform';
import {environment, environment as appConfig} from '../../environments/environment';
import {SwUpdate} from '@angular/service-worker';
import {BehaviorSubject} from 'rxjs';
import {AllCasesByCountyResponse} from '../interfaces/all-cases-by-county-response';


@Injectable({
  providedIn: 'root'
})
export class PwaService {
  private isInstalledSubject = new BehaviorSubject<boolean>(false);
  isInstalled = this.isInstalledSubject.asObservable();

  private showPromptSubject = new BehaviorSubject<boolean>(false);
  showPrompt = this.showPromptSubject.asObservable();

  private usedInSubject = new BehaviorSubject<string>('tab');
  usedIn = this.showPromptSubject.asObservable();

  public deferredPrompt: any;

  constructor(
    private platform: Platform,
    private swUpdate: SwUpdate
  ) {
  }

  init() {}

  enabled() {
    return environment.enable_service_worker && environment.enable_pwa_mobile_install;
  }


  promptInstall(): void {
    if (this.enabled() && this.deferredPrompt) {
      this.deferredPrompt.prompt();
      this.deferredPrompt.userChoice
        .then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
          } else {
            console.log('User dismissed the A2HS prompt');
          }
          this.deferredPrompt = null;
        });
    }
  }

  promptInstallTest() {

    // disable install for the moment
    // if (!this.enabled()) {
    //   window.addEventListener('beforeinstallprompt', (event: any) => {
    //     event.preventDefault();
    //     return;
    //   });
    // }
    return;
    // window.addEventListener('appinstalled', (evt) => {
    //   console.log('a2hs installed');
    // });
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


    // check if app is installed
    // window.addEventListener('appinstalled', (evt) => {
    //   console.log('a2hs installed');
    // });

    // detect if started as app or tab
    // window.addEventListener('load', () => {
    //   if (navigator.standalone) {
    //     console.log('Launched: Installed (iOS)');
    //   } else if (matchMedia('(display-mode: standalone)').matches) {
    //     console.log('Launched: Installed');
    //   } else {
    //     console.log('Launched: Browser Tab');
    //   }
    // });
  }

  private updateApp() {
    console.log('app update');
    // found some cases when path is 500, not sure why, maybe because sw updates
    document.location.href = document.location.origin;
    console.log('The app is updating right now');

  }

  onBeforeInstallPrompt(e) {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();

    if (this.enabled()) {
      // Stash the event so it can be triggered later.
      this.deferredPrompt = e;
      this.changeShowPromptStatus(true);
    }
  }

  // triggered when app is installed
  onAppInstalled(e) {
    console.log('a2hs installed');
  }

  public changeInstalledStatus(status: boolean) {
    this.isInstalledSubject.next(status);
  }

  public changeShowPromptStatus(status: boolean) {
    this.showPromptSubject.next(this.enabled() && status);
  }

  public changeUsedIn(status: string) {
    this.usedInSubject.next(status);
  }

}
