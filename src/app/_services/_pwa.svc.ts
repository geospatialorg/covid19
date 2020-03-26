import {Injectable} from '@angular/core';

import {Platform} from '@angular/cdk/platform';
import {timer} from 'rxjs';
import {take} from 'rxjs/operators';
import {InstallPromptComponent} from '../_components/install-prompt/install-prompt.component';


@Injectable({
  providedIn: 'root'
})
export class PwaService {
  private promptEvent: any;

  constructor(
    private promptComponent: InstallPromptComponent,
    private platform: Platform
  ) {
  }

  public initPwaPrompt() {
    console.log(this.platform);
    if (this.platform.ANDROID) {
      window.addEventListener('beforeinstallprompt', (event: any) => {
        event.preventDefault();
        this.promptEvent = event;
        this.openPromptComponent('android');
      });
    }
    if (this.platform.IOS) {
      const isInStandaloneMode = ('standalone' in window.navigator) && (window.navigator['standalone']);
      if (!isInStandaloneMode) {
        this.openPromptComponent('ios');
      }
    }
  }

  private openPromptComponent(mobileType: 'ios' | 'android') {
    // timer(3000)
    //   .pipe(take(1))
    //   .subscribe(() => this.promptComponent.openModal({}));
    // open(PromptComponent, { data: { mobileType, promptEvent: this.promptEvent } }));
  }
}
