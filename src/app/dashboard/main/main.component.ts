import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {SharedService} from '../../_services/shared-service.svc';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainComponent implements OnInit {

  constructor(private sharedService: SharedService) {
    this.sharedService.setMeta(
      null,
      'dashboard, covid, românia, cazuri confirmate',
      'Dashboard interactiv despre cazurile COVID19 confirmate în România'
    );
  }

  ngOnInit(): void {
  }

}
