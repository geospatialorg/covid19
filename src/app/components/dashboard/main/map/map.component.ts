import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.maps = [
      {
        id: 'confirmed',
        title: 'Cazuri confirmate',
        alt_id: 'cazuri_confirmate'
      },
      {
        id: 'active',
        title: 'Cazuri active',
        alt_id: 'cazuri_active'
      },
      {
        id: 'healed',
        title: 'Vindecări',
        alt_id: 'vindecari'
      },
      {
        id: 'deaths',
        title: 'Decese',
        alt_id: 'decese'
      }
    ];

    this.route.queryParams.subscribe(params => {
      let map = params.map || null;

      if(!map){
        this.activeMap = this.maps[0];
        this.removeRouteParams();
        return;
      }

      let entry = this.maps.find(e => e.alt_id === map);

      if(!entry){
        this.activeMap = this.maps[0];
        this.removeRouteParams();
        return;
      }

      this.activeMap = entry;
    });
  }

  removeRouteParams(){
    this.router.navigate(['/'], {
      queryParams: {
        map: null
      },
      queryParamsHandling: 'merge'
    });
  }

  setActiveLayer(layer) {
    this.activeMap = layer;

    this.router.navigate(['/'], {
      queryParams: {
        map: layer.alt_id
      },
      queryParamsHandling: 'merge'
    });
  }
}
