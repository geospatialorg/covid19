import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {environment as appConfig} from '../../../../../environments/environment';
import {DashboardService, SharedService} from 'src/app/services';

import Map from 'ol/Map';
import View from 'ol/View';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';

import {OSM, Vector as VectorSource} from 'ol/source';

import GeoJSON from 'ol/format/GeoJSON';
import {Fill, Stroke, Style, Text, Icon} from 'ol/style';
import Circle from 'ol/geom/Circle';
import Feature from 'ol/Feature';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MapComponent implements OnInit, OnDestroy {
  maxRadius = 40000;
  minRadius = 7500;

  activeMap: any;
  maps: any[] = [
    {
      id: 'confirmed',
      title: 'Cazuri confirmate',
      alt_id: 'cazuri_confirmate',
      style: {
        fill: {
          color: 'rgba(228,26,28, 0.6)'
        }
      },
      dataKey: 'total_case'
    },
    // {
    //   id: 'active',
    //   title: 'Cazuri active',
    //   alt_id: 'cazuri_active',
    //   style: {
    //     fill: {
    //       color: 'rgba(217,95,14, 0.8)'
    //     }
    //   },
    //   dataKey: 'total_active'
    // },
    {
      id: 'healed',
      title: 'Vindecări',
      alt_id: 'vindecari',
      style: {
        fill: {
          color: 'rgba(44,162,95, 0.7)'
        }
      },
      dataKey: 'total_healed'
    },
    {
      id: 'deaths',
      title: 'Decese',
      alt_id: 'decese',
      style: {
        fill: {
          color: 'rgba(0,0,0, 0.6)'
        }
      },
      dataKey: 'total_dead'
    },
    {
      id: 'quarantine',
      title: 'Zone carantină',
      alt_id: 'zone_carantina',
      style: null,
      dataKey: null
    }
  ];

  quarantineColors : any[] = [
    "rgba(222, 0, 11, 0.5)",
    "rgba(222, 0, 11, 0.5)",
    // "rgba(255, 171, 69, 0.5)",
    "rgba(251, 255, 0, 0.5)"
  ];

  map: Map;
  mapData: any[] = [];

  quarantineExtent: number[] = [2777098.47, 5954700.54, 2972709.08, 6104858.69]

  mapView: any = {
    center: [2747146.7966, 5749287.5195],
    extent: [1591113.1808, 5183042.0140, 3918467.8180, 6368121.7005],
    zoom: 4,
    maxZoom: 15,
    minZoom: 3
  };

  zoomedMax : boolean = false;

  selectedFeature: any = null;
  selectedQuarantineZone: any = null;
  selectedRoad: any = null;
  selectedCheckpoint: any = null;

  private interval: any;

  private mapIconLayer: VectorLayer = new VectorLayer({
    id: 'icons',
    source: new VectorSource()
  });

  private iconStyle: Style = new Style({
    stroke: new Stroke({
      color: '#ffff33',
      width: 0.5
    }),
    fill: null,
    text: new Text({
      font: '12px Calibri,sans-serif',
      fill: new Fill({
        color: '#000'
      }),
      stroke: new Stroke({
        color: '#fff',
        width: 3
      })
    })
  });

  private geojsonFeatures;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dashboardService: DashboardService,
    private sharedService: SharedService
  ) {
    this.activeMap = this.maps[0];
    this.loadData();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      let entry = params.map ? this.maps.find(e => e.alt_id === params.map) : undefined;
      if (!entry) {
        this.removeRouteParams();
        entry = this.maps[0];
      }
      this.activeMap = entry;
      if(this.activeMap.style) this.iconStyle.setFill(new Fill(this.activeMap.style.fill));
      this.initMap();
    });
  }

  private getGeojsonData(){
    return this.dashboardService.getGeojsonData().toPromise().then(data => {
      return data ? data : null;
    });
  }

  async loadData() {
    this.mapData = await this.getData();
    // this.interval = setInterval(() => {
    //   this.getData().then(data => {
    //     this.mapData = data;
    //     this.drawFeatures(this.mapIconLayer.getSource(), this.geojsonFeatures, this.iconStyle);
    //   });
    // }, appConfig.data_refresh);
  }
  
  setActiveLayer(layer) {
    this.activeMap = layer;

    this.router.navigate(['/'], {
      queryParams: {
        map: layer.alt_id
      },
      queryParamsHandling: 'merge'
    });

    if(layer.id === 'quarantine'){
      let l = this.map.getLayers().getArray().find(e => e.get('id') === "counties_quarantine");
      console.log(l.getSource().getExtent())
      this.map.getView().fit(this.quarantineExtent);
      this.zoomedMax = false;
    } else {
      if(!this.zoomedMax){
        this.map.getView().animate({
          zoom: this.mapView.zoom,
          center: this.mapView.center,
          duration: 500
        });
        this.zoomedMax = true;
      }
    }
  }

  private getData() {
    return this.dashboardService.getCasesByCounty().toPromise().then(res => {
      if (res && res.data && res.data.data) {
        return res.data.data;
        // return res.data.data.map(e => {
        //   e.total_active = e.total_county - e.total_healed - e.total_dead;
        //   return e;
        // });
      }

      return [];
    });
  }

  private removeRouteParams() {
    this.router.navigate(['/'], {
      queryParams: {
        map: null
      },
      queryParamsHandling: 'merge'
    });
  }


  private async initMap() {
    const self = this;

    if (!this.geojsonFeatures) {
      // this.geojsonFeatures = (new GeoJSON()).readFeatures(await this.sharedService.getGeojsonData());
      this.geojsonFeatures = (new GeoJSON()).readFeatures(await this.getGeojsonData());
    }

    this.drawFeatures(this.mapIconLayer.getSource(), this.geojsonFeatures, this.iconStyle);

    if (!this.map) {
      const highlightStyle = new Style({
        stroke: new Stroke({
          color: '#e41a1c',
          width: 0.5
        }),
        fill: new Fill({
          color: 'rgba(255,255,51, 0.6)'
        }),
        text: new Text({
          font: '12px Calibri,sans-serif',
          fill: new Fill({
            color: '#000'
          }),
          stroke: new Stroke({
            color: '#fff',
            width: 3
          })
        })
      });
      this.map = this.initOpenLayerMap(this.mapIconLayer, self, this.iconStyle, highlightStyle);
    }

    if(this.activeMap.id === 'quarantine'){
      this.map.getLayers().getArray().map(e => {
        if(['icons'].includes(e.get('id'))){
          e.setVisible(false);
        } else {
          e.setVisible(true);
        }
      });

      self.map.getView().fit(this.quarantineExtent);
      this.zoomedMax = false;

    } else {
      this.map.getLayers().getArray().map(e => {
        if(['counties_quarantine', 'roads', 'checkpoints'].includes(e.get('id'))){
          e.setVisible(false);
        } else {
          e.setVisible(true);
        }
      });
    }
    
  }

  private drawFeatures(source, geojsonFeatures, iconStyle) {
    
    source.clear();
    const maxCases = this.mapData.map(county => county[this.activeMap.dataKey]).sort((a, b) => b - a);
    this.mapData.map(e => {
      const data = geojsonFeatures.find(f => e.county_code === f.get('county_code'));

      if (data && e[this.activeMap.dataKey] > 0) {
        const currentCountyTotal = e[this.activeMap.dataKey];
        const minCountyTotal = maxCases[maxCases.length - 1];
        const maxCountyTotal = maxCases[0];

        const radius = this.linearInterpolate(
          currentCountyTotal,
          minCountyTotal,
          maxCountyTotal,
          this.minRadius,
          this.maxRadius
        );

        const circle = new Circle([data.get('x_cen'), data.get('y_cen')], radius);
        const feat = new Feature(circle);

        Object.keys(e).map(r => {
          feat.set(r, e[r]);
        });

        feat.setStyle(iconStyle);
        source.addFeature(feat);
      }
    });
  }

  quarantineStyles(feature){
    const stroke = new Stroke({
      color: '#984ea3',
      width: 0.3
    });
    
    const styleQuarantine = new Style({
      stroke: stroke
    });
    
    if(feature && feature.get('quarantine')){
      styleQuarantine.setFill(new Fill({
        color: this.quarantineColors[feature.get('quarantine')-1]
      }));
    }

    const styleQuarantineHover = new Style({
      stroke: stroke,
      fill: new Fill({
        color: 'rgba(255, 171, 69, 0.5)'
      })
    });

    return [styleQuarantine, styleQuarantineHover];
  }

  roadsStyles(){
    const stroke = new Stroke({
      color: '#0166CC',
      width: 2
    });
    
    const styleRoads = new Style({
      stroke: stroke,
      // fill: new Fill({
      //   color: 'rgba(255, 171, 69, 0.5)'
      // })
    });

    const styleRoadsHover = new Style({
      stroke: new Stroke({
        color: 'rgba(255, 171, 69, 0.5)',
        width: 2
      })
    });

    return [styleRoads, styleRoadsHover];
  }

  checkpointsStyles(){
    const stroke = new Stroke({
      color: '#0166CC',
      width: 1
    });

    var fill = new Fill({
      color: 'rgba(255,255,255,0.4)'
    });
    
    const styleCheckpoints = new Style({
        image: new Circle({
          fill: fill,
          stroke: stroke,
          radius: 5
        })
    });

    // const styleQuarantineHover = new Style({
    //   stroke: stroke,
    //   fill: new Fill({
    //     color: 'rgba(255, 171, 69, 0.5)'
    //   })
    // });

    return [styleCheckpoints];
  }

  private initOpenLayerMap(iconLayer, self: this, iconStyle, highlightStyle) {

    const style = new Style({
      // fill: new Fill({
      //   color: 'rgba(255, 255, 255, 0.3)'
      // }),
      stroke: new Stroke({
        color: '#984ea3',
        width: 1
      }),
      text: new Text({
        font: '12px Calibri,sans-serif',
        fill: new Fill({
          color: '#000'
        }),
        stroke: new Stroke({
          color: '#fff',
          width: 4
        })
      })
    });

    const vectorLayer = new VectorLayer({
      id: 'counties',
      source: new VectorSource({
        url: './assets/counties.geojson',
        format: new GeoJSON()
      }),
      style(feature) {
        style.getText().setText(feature.get('county_code'));
        return style;
      }
    });

    const vectorLayerQuarantine = new VectorLayer({
      id: 'counties_quarantine',
      source: new VectorSource({
        url: './assets/uat_q.json',
        format: new GeoJSON()
      }),
      // visible: false,
      style(feature) {
        return self.quarantineStyles(feature)[0];
      }
    });

    const vectorLayerRoads = new VectorLayer({
      id: 'roads',
      source: new VectorSource({
        url: './assets/drumuri_principale_suceava_simplificat.geojson',
        format: new GeoJSON()
      }),
      // visible: false,
      style() {
        return self.roadsStyles()[0];
      }
    });

    const vectorLayerCheckpoints = new VectorLayer({
      id: 'checkpoints',
      source: new VectorSource({
        url: './assets/puncte_verificare.geojson',
        format: new GeoJSON()
      }),
      // visible: false,
      // style(feature) {
      //   console.log(feature)
      //   var geometries = feature.getGeometry()

      //       var startStyle = new Style({
      //           geometry: geometries,
      //           image: new Circle({
      //               radius: 7,
      //               fill: new Fill({
      //                   color: '#32CD32'
      //               })
      //           })
      //       });
      // }
    });

    const map = new Map({
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        vectorLayer,
        vectorLayerQuarantine,
        vectorLayerRoads,
        vectorLayerCheckpoints,
        iconLayer
      ],
      target: 'map',
      view: new View({
        center: this.mapView.center,
        extent: this.mapView.extent,
        zoom: this.mapView.zoom,
        maxZoom: this.mapView.maxZoom,
        minZoom: this.mapView.minZoom
      })
    });
    //
    map.on('pointermove', (ev) => {
      if (ev.dragging) {
        return;
      }

      if (self.selectedFeature !== null) {
        self.selectedFeature.setStyle(iconStyle);
        self.selectedFeature = null;
      }

      if (self.selectedQuarantineZone !== null) {
        let style = self.quarantineStyles(self.selectedQuarantineZone)[0];
        self.selectedQuarantineZone.setStyle(style);
        self.selectedQuarantineZone = null;
      }

      if (self.selectedRoad !== null) {
        let style = self.roadsStyles()[0];
        self.selectedRoad.setStyle(style);
        self.selectedRoad = null;
      }

      if (self.selectedCheckpoint !== null) {
        // let style = self.roadsStyles()[0];
        // self.selectedCheckpoint.setStyle(style);
        self.selectedCheckpoint = null;
      }

      const pixel = ev.pixel;

      self.map.forEachFeatureAtPixel(pixel, (feature, layer) => {
        if (layer.get('id') === 'icons') {
          self.selectedFeature = feature;
          feature.setStyle(highlightStyle);
          return true;
        } else if(layer.get('id') === 'counties_quarantine'){
          let style = self.quarantineStyles(null)[1];

          self.selectedQuarantineZone = feature;
          feature.setStyle(style);
          return true;
        } else if(layer.get('id') === 'roads'){
            let style = self.roadsStyles()[1];

            self.selectedRoad = feature;
            feature.setStyle(style);
            return true;
        } else if(layer.get('id') === 'checkpoints'){
          self.selectedCheckpoint = feature;
          // feature.getStyle().setFill(new Fill(this.activeMap.style.fill))
          return true;
        }
        
      });
    });
    //
    map.on('singleclick', (ev) => {
      if (ev.dragging) {
        return;
      }
      ev.preventDefault();

      if (self.selectedFeature !== null) {
        self.selectedFeature.setStyle(iconStyle);
        self.selectedFeature = null;
      }

      if (self.selectedQuarantineZone !== null) {
        let style = new Style({
          fill: new Fill({
            color: self.quarantineColors[self.selectedQuarantineZone.get('quarantine') - 1]
          })
        });
        self.selectedQuarantineZone.setStyle(style);
        self.selectedQuarantineZone = null;
      }

      const coords = self.map.getEventCoordinate(ev.originalEvent);

      if(self.activeMap.id === 'quarantine'){
        const feature = vectorLayerQuarantine.getSource().getClosestFeatureToCoordinate(coords);
        self.selectedQuarantineZone = feature;
        let style = new Style({
          fill: new Fill({
            color: 'rgba(255, 171, 69, 0.5)'
          })
        });

        feature.setStyle(style);
      } else {
        const feature = iconLayer.getSource().getClosestFeatureToCoordinate(coords);
        self.selectedFeature = feature;
        feature.setStyle(highlightStyle);
      }
    });

    return map;
  }

  private linearInterpolate(x, x0, x1, y0, y1) {
    if ((x1 - x0) === 0) {
      return (y0 + y1) / 2;
    }
    return y0 + (x - x0) * (y1 - y0) / (x1 - x0);
  }

  activeMapChange(){
    if (this.selectedFeature !== null) {
      this.selectedFeature.setStyle(this.iconStyle);
      this.selectedFeature = null;
    }

    if (this.selectedQuarantineZone !== null) {
      let style = new Style({
        fill: new Fill({
          color: this.quarantineColors[this.selectedQuarantineZone.get('quarantine') - 1]
        })
      });
      this.selectedQuarantineZone.setStyle(style);
      this.selectedQuarantineZone = null;
    }

    this.router.navigate(['/'], {
      queryParams: {
        map: this.activeMap.alt_id
      },
      queryParamsHandling: 'merge'
    });
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    if (this.interval) {
      clearInterval(this.interval);
    }
    // this.map.off('pointermove');
    // this.map.off('singleclick');
  }
}
