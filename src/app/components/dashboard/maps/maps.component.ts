import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {SharedService} from '../../../services/shared.service';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MapsComponent implements OnInit {
  maps: any[] = [
    {
      label: 'Infrastructura spitalicească',
      router_link: '/dashboard/harti/hospital-infrastructure'
    },
    {
      label: 'Context european',
      router_link: '/dashboard/harti/europe'
    },
    {
      label: 'Puncte de interes social',
      router_link: '/dashboard/harti/social-interest-points'
    },
    {
      label: 'Situația la frontieră',
      router_link: '/dashboard/harti/frontier-situation'
    },
    
    {
      label: 'Concentrații NO2',
      router_link: '/dashboard/harti/no2-emission'
    }
  ];

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
