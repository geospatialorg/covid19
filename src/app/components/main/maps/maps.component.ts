import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {SharedService} from '../../../services/shared.service';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MapsComponent implements OnInit {

  menuItems = [
    {
      routerLink: '/harti/no2-emission',
      routerLinkActive: 'ui-button-info',
      routerLinkActiveOptions: {exact: true},
      label: 'Emisii NO2',
    },
    {
      routerLink: '/harti/europe',
      routerLinkActive: 'ui-button-info',
      routerLinkActiveOptions: {exact: true},
      label: 'Context european',

    },
    {
      routerLink: '/harti/social-interest-points',
      routerLinkActive: 'ui-button-info',
      routerLinkActiveOptions: {exact: true},
      label: 'Puncte de interes social',
    },
    {
      routerLink: '/harti/frontier-situation',
      routerLinkActive: 'ui-button-info',
      routerLinkActiveOptions: {exact: true},
      label: 'Situația la frontieră',
    },
    {
      routerLink: '/harti/hospital-infrastructure',
      routerLinkActive: 'ui-button-info',
      routerLinkActiveOptions: {exact: true},
      label: 'Infrastructura spitalicească',
    },
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
