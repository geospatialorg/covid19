import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {SharedService} from '../../../../services/shared.service';

@Component({
  selector: 'app-counties-cases',
  templateUrl: './counties-cases.component.html',
  styleUrls: ['./counties-cases.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CountiesCasesComponent implements OnInit {

  constructor(private sharedService: SharedService) {
    this.sharedService.setMeta(
      'Cazuri pe judete',
      'covid, romania',
      `Cazuri pe judete`
    );
  }

  ngOnInit(): void {
  }

}
