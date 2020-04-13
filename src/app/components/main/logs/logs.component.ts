import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LogsComponent implements OnInit {
  jsonData : any[];

  constructor(
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    fetch('assets/changelog.json').then((response) => response.json()).then((json) => {
      this.jsonData = json.map(e => {
        e['Anun\u021b'] = this.domSanitizer.bypassSecurityTrustHtml(e['Anun\u021b']);
        return e;
      });
    });
  }
}
