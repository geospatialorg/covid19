import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {SharedService} from '../../../_services/shared-service.svc';

@Component({
  selector: 'app-coronavirus-europe',
  templateUrl: './coronavirus-europe.component.html',
  styleUrls: ['./coronavirus-europe.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CoronavirusEuropeComponent implements OnInit {

  constructor(private sharedService: SharedService) {
    this.sharedService.setMeta(
      'Corona Virus Europa',
      'covid, europa',
      `Corona virus în Europa`
    );
  }

  ngOnInit(): void {
  }

}
