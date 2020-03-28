import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MapComponent implements OnInit {
  activeMap: any;
  maps: any[];

  constructor(
  ) { }

  ngOnInit(): void {
    this.maps = [
      {
        id: 'confirmed',
        title: 'Cazuri confirmate'
      },
      {
        id: 'active',
        title: 'Cazuri active'
      },
      {
        id: 'healed',
        title: 'Vindecări'
      },
      {
        id: 'deaths',
        title: 'Decese'
      }
    ];

    this.activeMap = this.maps[0];
  }

  setActiveLayer(layer) {
    this.activeMap = layer;
  }
}
