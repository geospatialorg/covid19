import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {SharedService} from '../../../services/shared.service';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MapsComponent implements OnInit {

  constructor(private sharedService: SharedService) {
    this.sharedService.setMeta(
      'Hărți',
      'hărți, covid, românia',
      `Hărți informative despre diferite aspecte privind COVID, noxe, puncte de interes social, infrastructura spitaliceasca`
    );
  }

  ngOnInit(): void {
  }

}
