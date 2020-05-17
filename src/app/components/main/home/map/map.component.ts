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
import {defaults as defaultControls, Control} from 'ol/control';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MapComponent implements OnInit, OnDestroy {
  maxRadius = 40000;
  minRadius = 7500;
  milestones: number[] = [100, 300];
  metropolitan_colors : string[] = [
    '255,0,0',
    '255,255,0',
    '0,234,255',
    '170,0,255',
    '255,127,0',
    '191,255,0',
    '0,149,255',
    '255,0,170',
    '255,212,0',
    '106,255,0',
    '0,64,255',
    '237,185,185',
    '185,215,237',
    '231,233,185',
    '220,185,237',
    '185,237,224',
    '143,35,35',
    '35,98,143',
    '143,106,35',
    '107,35,143',
    '79,143,35',
    '204,204,204'
  ];

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
      id: 'metropolitan_areas',
      title: 'Zone metropolitane',
      alt_id: 'zone_metropolitane',
      style: null,
      dataKey: null
    },
    {
      id: 'quarantine',
      title: 'Zone carantină',
      alt_id: 'zone_carantina',
      style: null,
      dataKey: null
    }
  ];

  qStyles: any = {
    uat: {
      default: {
        stroke_color: '#984ea3',
        stroke_width: 0.3,
        fill_colors: [
          'rgba(222, 0, 11, 0.5)',
          'rgba(251, 255, 0, 0.5)',
          'rgba(222, 0, 11, 0.5)'
        ]
      },
      highlight: {
        stroke_color: '#984ea3',
        stroke_width: 0.3,
        fill_color: 'rgba(255, 171, 69, 0.5)'
      }
    },
    roads: {
      default: {
        stroke_color: 'rgba(1,102,204, .2)',
        stroke_width: 1
      },
      highlight: {
        stroke_color: 'rgba(255, 171, 69, .5)',
        stroke_width: 1
      }
    },
    checkpoints: {
      default: {
        stroke_color: 'black',
        fill_color: 'rgba(217,95,14, 0.75)',
        stroke_width: 3
      },
      highlight: {
        stroke_color: 'black',
        fill_color: 'rgba(197,27,138, .8)',
        stroke_width: 3
      }
    }
  }

  map: Map;
  mapData: any[] = [];

  // quarantineExtent: number[] = [1591113.1808, 5183042.0140, 3918467.8180, 6368121.7005];

  mapView: any = {
    center: [2747146.7966, 5749287.5195],
    extent: [1591113.1808, 5183042.0140, 3918467.8180, 6368121.7005],
    zoom: 4,
    maxZoom: 15,
    minZoom: 3
  };

  // zoomedMax: boolean = false;

  selectedFeature: any = null;
  selectedQuarantineZone: any = null;
  selectedRoad: any = null;
  selectedCheckpoint: any = null;
  selectedMetropolitan: any = null;

  private interval: any;

  over: any[] = [];

  private mapIconLayer: VectorLayer = new VectorLayer({
    id: 'icons',
    source: new VectorSource()
  });

  private iconStyle: Style = new Style({
    stroke: new Stroke({
      // color: '#ffff33',
      color: '#ffff33',
      width: 0.5
    }),
    fill: new Fill(),
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

  private confirmedStyles: Style[] = [
    // < 100
    new Style({
      stroke: new Stroke({
        color: '#e41a1c',
        width: 1
      }),
      // fill: new Fill({
      //   color: 'rgba(228,26,28, 0.8)'
      // })
    }),
    // > 100
    new Style({
      stroke: new Stroke({
        color: '#e41a1c',
        width: 1
      }),
      fill: new Fill({
        color: 'rgba(255,237,160, 0.8)'
      })
    }),

    // highlight
    new Style({
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
    })
  ];

  private geojsonFeatures;

  legendVisible: boolean = false;
  displayDisclaimer: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dashboardService: DashboardService,
    private sharedService: SharedService,
    private domSanitizer: DomSanitizer
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
      if (this.activeMap.style) {
        this.iconStyle.setFill(new Fill(this.activeMap.style.fill));
      }

      if(this.activeMap.id === 'healed') {
        this.showDisclaimer(true);
      }
      this.initMap();
    });
  }

  private getGeojsonData() {
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

    if(layer.id === 'healed') {
      this.showDisclaimer(true);
    }

    let countiesLayer: VectorLayer  = this.map.getLayers().getArray().find(l => l.get('id') === 'counties');
    countiesLayer.getSource().refresh();

    if (layer.id === 'quarantine') {
      this.over = [];
    } else {
      this.over[0] = this.mapData.filter(e => e[this.activeMap.dataKey] > this.milestones[0]).map(e => e.county_code);
      this.over[1] = this.mapData.filter(e => e[this.activeMap.dataKey] > this.milestones[1]).map(e => e.county_code);
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
      
      this.map = this.initOpenLayerMap(this.mapIconLayer, self, this.iconStyle, this.confirmedStyles[2]);
    }

    if (this.activeMap.id === 'quarantine') {
      this.map.getLayers().getArray().map(e => {
        if (['icons', 'metropolitan_areas'].includes(e.get('id'))) {
          e.setVisible(false);
        } else {
          e.setVisible(true);
        }
      });
    } else if (this.activeMap.id === 'metropolitan_areas') {
      this.map.getLayers().getArray().map(e => {
        if (['counties_quarantine', 'roads', 'checkpoints'].includes(e.get('id'))) {
          e.setVisible(false);
        } else {
          e.setVisible(true);
        }
      });
    }
    else {
      this.map.getLayers().getArray().map(e => {
        if (['counties_quarantine', 'roads', 'checkpoints', 'metropolitan_areas'].includes(e.get('id'))) {
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

  quarantineStyles(feature) {
    const stroke = new Stroke({
      color: this.qStyles.uat.default.stroke_color,
      width: this.qStyles.uat.default.stroke_width
    });

    const styleQuarantine = new Style({
      stroke: stroke
    });

    if (feature && feature.get('quarantine')) {
      styleQuarantine.setFill(new Fill({
        color: this.qStyles.uat.default.fill_colors[feature.get('quarantine')]
      }));
    }

    const styleQuarantineHover = new Style({
      stroke: stroke,
      fill: new Fill({
        color: this.qStyles.uat.highlight.fill_color
      })
    });

    return [styleQuarantine, styleQuarantineHover];
  }

  metropolitanStyles(feature) {
    const stroke = new Stroke({
      color: this.qStyles.uat.default.stroke_color,
      width: this.qStyles.uat.default.stroke_width
    });

    const style = new Style({
      stroke: stroke
    });

    if (feature) {
      style.setFill(new Fill({
        color: `rgba(${this.metropolitan_colors[feature.get('nr_zona')-1]}, .6)`
      }));
    }

    const styleHover = new Style({
      stroke: stroke,
      fill: new Fill({
        color: this.qStyles.uat.highlight.fill_color
      })
    });

    return [style, styleHover];
  }

  roadsStyles() {
    const styleRoads = new Style({
      stroke: new Stroke({
        color: this.qStyles.roads.default.stroke_color,
        width: this.qStyles.roads.default.stroke_width
      })
    });

    const styleRoadsHover = new Style({
      stroke: new Stroke({
        color: this.qStyles.roads.highlight.stroke_color,
        width: this.qStyles.roads.highlight.stroke_width
      })
    });

    return [styleRoads, styleRoadsHover];
  }

  checkpointsStyles() {
    const styleCheckpoints: Style[] = [
      //default
      new Style({
        image: new Icon({
          opacity: 1,
          src: 'data:image/svg+xml;utf8,' + this.drawIcon(),
          scale: 0.3
        })
      }),
      //hover
      new Style({
        image: new Icon({
          opacity: 1,
          src: 'data:image/svg+xml;utf8,' + this.drawIcon(this.qStyles.checkpoints.highlight.fill_color),
          scale: 0.3
        })
      })
    ];

    return styleCheckpoints;
  }

  private initOpenLayerMap(iconLayer, self: this, iconStyle, highlightStyle) {

    let ShowLegend = (function (Control){

      let element;

      function ShowLegend(opt_options) {
        var options = opt_options || {};

        var button = document.createElement('button');
        button.innerHTML = 'L';

        element = document.createElement('div');
        element.className = 'show-legend ol-unselectable ol-control';
        element.appendChild(button);

        Control.call(this, {
          element: element,
          target: options.target
        });

        button.addEventListener('click', this.showLegend.bind(this), false);
      }

      if ( Control ) ShowLegend.__proto__ = Control;
      ShowLegend.prototype = Object.create( Control && Control.prototype );
      ShowLegend.prototype.constructor = ShowLegend;

      ShowLegend.prototype.showLegend = function showLegend () {
        self.legendVisible = ! self.legendVisible;
        if(self.legendVisible) {
          element.classList.add('show-legend-active');
        } else {
          element.classList.remove('show-legend-active');
        }
      };

      return ShowLegend;
    }(Control));

    const styles: Style[] = [
      // default
      new Style({
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
      }),
      new Style({
        fill: new Fill({
          color: 'rgba(255,255,217, 0.6)'
        }),
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
      }),
      new Style({
        fill: new Fill({
          color: 'rgba(254,224,139, 0.6)'
        }),
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
      })
  ];
  
    this.over[0] = this.mapData.filter(e => e[this.activeMap.dataKey] > this.milestones[0]).map(e => e.county_code);
    this.over[1] = this.mapData.filter(e => e[this.activeMap.dataKey] > this.milestones[1]).map(e => e.county_code);

    const vectorLayer = new VectorLayer({
      id: 'counties',
      source: new VectorSource({
        url: './assets/counties.geojson',
        format: new GeoJSON()
      }),
      style(feature) {
        let s = styles[0];
        
        if(self.over.length > 0 && self.over[0].includes(feature.get('county_code'))){
          s = styles[1];
        }

        if(self.over.length > 0 && self.over[1].includes(feature.get('county_code'))){
          s = styles[2];
        }

        if(!s.getText()) s.setText(new Text());
        s.getText().setText(feature.get('county_code'));
        
        return s;
      }
    });

    const vectorLayerMetropolitanAreas = new VectorLayer({
      id: 'metropolitan_areas',
      source: new VectorSource({
        url: '/api/dashboard/getGeojson?name=metropolitan_zone.geojson',
        format: new GeoJSON()
      }),
      style(feature) {
        return self.metropolitanStyles(feature)[0];
      }
    });

    const vectorLayerQuarantine = new VectorLayer({
      id: 'counties_quarantine',
      source: new VectorSource({
        url: '/api/dashboard/getGeojson?name=uat.geojson',
        format: new GeoJSON()
      }),
      style(feature) {
        return self.quarantineStyles(feature)[0];
      }
    });

    const vectorLayerRoads = new VectorLayer({
      id: 'roads',
      source: new VectorSource({
        url: './assets/retea_rutiera_principala_ro_clip_simplificat.geojson',
        format: new GeoJSON()
      }),
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
      style: self.checkpointsStyles()[0]
    });

    const map = new Map({
      controls: defaultControls().extend([
        new ShowLegend(null)
      ]),
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        vectorLayer,
        vectorLayerMetropolitanAreas,
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

      if (self.selectedMetropolitan !== null) {
        let style = self.metropolitanStyles(self.selectedMetropolitan)[0];
        self.selectedMetropolitan.setStyle(style);
        self.selectedMetropolitan = null;
      }

      if (self.selectedRoad !== null) {
        let style = self.roadsStyles()[0];
        self.selectedRoad.setStyle(style);
        self.selectedRoad = null;
      }

      if (self.selectedCheckpoint !== null) {
        self.selectedCheckpoint.setStyle(self.checkpointsStyles()[0]);
        self.selectedCheckpoint = null;
      }

      const pixel = ev.pixel;

      self.map.forEachFeatureAtPixel(pixel, (feature, layer) => {
        if (layer.get('id') === 'icons') {
          self.selectedFeature = feature;
          feature.setStyle(highlightStyle);
          return true;
        } else if (layer.get('id') === 'counties_quarantine') {
          let style = self.quarantineStyles(null)[1];

          self.selectedQuarantineZone = feature;
          feature.setStyle(style);
          return true;
        }  else if (layer.get('id') === 'metropolitan_areas') {
          let style = self.metropolitanStyles(null)[1];

          self.selectedMetropolitan = feature;
          feature.setStyle(style);
          return true;
        } else if (layer.get('id') === 'roads') {
          let style = self.roadsStyles()[1];

          self.selectedRoad = feature;
          feature.setStyle(style);
          return true;
        } else if (layer.get('id') === 'checkpoints') {
          self.selectedCheckpoint = feature;
          feature.setStyle(self.checkpointsStyles()[1]);
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
            color: self.qStyles.uat.default.fill_colors[self.selectedQuarantineZone.get('quarantine')]
          })
        });
        self.selectedQuarantineZone.setStyle(style);
        self.selectedQuarantineZone = null;
      }

      const coords = self.map.getEventCoordinate(ev.originalEvent);

      if (self.activeMap.id === 'quarantine') {
        const feature = vectorLayerQuarantine.getSource().getClosestFeatureToCoordinate(coords);
        self.selectedQuarantineZone = feature;
        let style = new Style({
          fill: new Fill({
            color: 'rgba(255, 171, 69, 0.5)'
          })
        });

        feature.setStyle(style);
      } else if (self.activeMap.id === 'metropolitan_areas') {
        const feature = vectorLayerMetropolitanAreas.getSource().getClosestFeatureToCoordinate(coords);
        self.selectedMetropolitan = feature;
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

  activeMapChange() {
    if (this.selectedFeature !== null) {
      this.selectedFeature.setStyle(this.confirmedStyles[0]);
      this.selectedFeature = null;
    }

    if (this.selectedQuarantineZone !== null) {
      let style = new Style({
        fill: new Fill({
          color: this.qStyles.uat.default.fill_colors[this.selectedQuarantineZone.get('quarantine')]
        })
      });
      this.selectedQuarantineZone.setStyle(style);
      this.selectedQuarantineZone = null;
    }

    if (this.selectedMetropolitan !== null) {
      this.selectedMetropolitan.setStyle(this.metropolitanStyles[0]);
      this.selectedMetropolitan = null;
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

  drawIcon( fill=this.qStyles.checkpoints.default.fill_color, sc=this.qStyles.checkpoints.default.stroke_color, sw=this.qStyles.checkpoints.default.stroke_width){
    let svg = `
    <svg height="50" width="50" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <circle cx="25" cy="25" r="20" stroke="${sc}" stroke-width="${sw}" fill="${fill}" />
    </svg>`;

    return svg;
  }

  showDisclaimer(val) {
    this.displayDisclaimer = val;
  }

  generateLegend(){
    let map = this.maps.find(e => e.id === this.activeMap.id);

    const options = {
      width: 200,
      height: 65,
      text_fill: '#000',
      font_size: 12,
      font_family: 'Verdana',
      big_radius: 10,
      small_radius: 6,
      stroke_width: 1,
      big_fill: null,
      small_fill: 'rgba(44,162,95, 0.7)',
      hightlight_fill: 'rgba(255,255,51, 0.6)'
    };

    if(this.activeMap.id === 'quarantine') {
      options.height = 110;
    }

    if(this.activeMap.id === 'confirmed') {
      options.height = 135;
    }

    let legend =  `
      <svg width="${options.width}" height="${options.height}">  
    `;

    if(this.activeMap.id === 'quarantine'){
      legend += `
        <polygon points="5,20 8,13 20,10 25,20 20,25  10,27 5,20" stroke="purple" fill="${this.qStyles.uat.default.fill_colors[0]}" stroke-width="${options.stroke_width}" />
        <text fill="${options.text_fill}" font-size="${options.font_size}" font-family="${options.font_family}" x="32" y="23">Zone in carantină</text>

        <polygon points="5,45 8,38 20,35 25,45 20,50  10,52 5,45" stroke="purple" fill="${this.qStyles.uat.default.fill_colors[1]}" stroke-width="${options.stroke_width}" />
        <text fill="${options.text_fill}" font-size="${options.font_size}" font-family="${options.font_family}" x="32" y="48">Zone cu statut special</text>

        <circle cx="14" cy="68" r="${options.small_radius}" stroke="${this.qStyles.checkpoints.default.stroke_color}" stroke-width="${options.stroke_width}" fill="${this.qStyles.checkpoints.default.fill_color}" />
        <text fill="${options.text_fill}" font-size="${options.font_size}" font-family="${options.font_family}" x="32" y="73">Punct control</text>

        <line x1="5" y1="92" x2="20" y2="92" style="stroke: ${this.qStyles.roads.default.stroke_color};stroke-width:2" />
        <text fill="${options.text_fill}" font-size="${options.font_size}" font-family="${options.font_family}" x="32" y="95">Drum</text>
      `;
    } else {
      legend += `
  
        <circle cx="13" cy="12" r="${options.big_radius}" stroke="#ffff33" stroke-width="${options.stroke_width}" fill="${map.style.fill.color}" />
        <text fill="${options.text_fill}" font-size="${options.font_size}" font-family="${options.font_family}" x="32" y="17">${map.title}</text>

        <circle cx="13" cy="43" r="${options.big_radius}" stroke="#e41a1c" stroke-width="${options.stroke_width}" fill="${options.hightlight_fill}" />
        <text fill="${options.text_fill}" font-size="${options.font_size}" font-family="${options.font_family}" x="32" y="48">Inregistrare selectată</text>
      `;

      if(this.activeMap.id === 'confirmed') {
        legend += `
          <rect x="3" y="65" width="20" height="20" style="fill:rgba(255,255,217, 0.6);stroke-width:0.8;stroke: #984ea3" />
          <text fill="${options.text_fill}" font-size="${options.font_size}" font-family="${options.font_family}" x="32" y="75">Judete cu mai mult de ${this.milestones[0]}</text>
          <text fill="${options.text_fill}" font-size="${options.font_size}" font-family="${options.font_family}" x="32" y="88">cazuri confirmate</text>

          <rect x="3" y="100" width="20" height="20" style="fill:rgba(254,224,139, 0.6);stroke-width:0.8;stroke: #984ea3" />
          <text fill="${options.text_fill}" font-size="${options.font_size}" font-family="${options.font_family}" x="32" y="110">Judete cu mai mult de ${this.milestones[1]}</text>
          <text fill="${options.text_fill}" font-size="${options.font_size}" font-family="${options.font_family}" x="32" y="123">cazuri confirmate</text>
        `;
      }
    }

    legend += `
        Sorry, your browser does not support inline SVG.
      </svg>
    `;

    return this.domSanitizer.bypassSecurityTrustHtml(legend);
  }
}
