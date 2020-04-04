import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LogsComponent implements OnInit {
  jsonData : any[];

  constructor() { }

  ngOnInit(): void {
    fetch('assets/changelog.json').then((response) => response.json()).then((json) => this.jsonData = json);
  }
}
