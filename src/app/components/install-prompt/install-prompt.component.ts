import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {OverlayPanelModule} from 'primeng/overlaypanel';

@Component({
  selector: 'app-install-prompt',
  templateUrl: './install-prompt.component.html',
  styleUrls: ['./install-prompt.component.css']
})
export class InstallPromptComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
