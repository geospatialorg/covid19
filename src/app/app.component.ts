import {Component, HostListener} from '@angular/core';
import {PwaService} from './services/pwa.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'covid';
  //
  // @HostListener('window:load', ['$event'])
  // isPwaAppUsed(e) {
  //   this.showInstallPrompt = true;
  //   if (navigator.standalone) {
  //     console.log('Launched: Installed (iOS)');
  //   } else if (matchMedia('(display-mode: standalone)').matches) {
  //     console.log('Launched: Installed');
  //   } else {
  //     console.log('Launched: Browser Tab');
  //   }
  // }
  //
  // @HostListener('window:appinstalled', ['$event'])
  // isAppInstalled(e) {
  //   console.log(e);
  //   // Prevent Chrome 67 and earlier from automatically showing the prompt
  //   e.preventDefault();
  //   // Stash the event so it can be triggered later.
  //   this.deferredPrompt = e;
  //   this.showButton = true;
  // }

  @HostListener('window:beforeinstallprompt', ['$event']) onBeforeInstallPrompt(e) {
    this.pwaService.onBeforeInstallPrompt(e);
  }
  @HostListener('window:appinstalled', ['$event']) onAppInstalled(e) {
    this.pwaService.onAppInstalled(e);
  }
  @HostListener('window:load', ['$event'])
  isPwaAppUsedIn(e) {
    let used = 'tab';
    if (navigator.hasOwnProperty('standalone')) {
      used = 'standalone'; // iOS
    } else if (matchMedia('(display-mode: standalone)').matches) {
      used = 'standalone';
    }
    this.pwaService.changeUsedIn(used);
  }

  constructor(private pwaService: PwaService) {}

}
