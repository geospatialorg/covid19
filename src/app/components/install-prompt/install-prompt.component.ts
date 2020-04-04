import {Component, OnInit } from '@angular/core';
import {PwaService} from '../../services/pwa.service';

@Component({
  selector: 'app-install-prompt',
  templateUrl: './install-prompt.component.html',
  styleUrls: ['./install-prompt.component.scss']
})
export class InstallPromptComponent implements OnInit {

  constructor(private pwaService: PwaService) {
  }

  showInstall = false;

  ngOnInit(): void {
    this.pwaService.showPrompt.subscribe((status) => {
      this.showInstall = status;
    });
  }

  install(e) {
    e.preventDefault();
    this.pwaService.promptInstall();
  }
}
