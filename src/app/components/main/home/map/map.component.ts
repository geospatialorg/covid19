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
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MapComponent implements OnInit, OnDestroy {
  maxRadius = 40000;
  minRadius = 7500;
  // milestones: number[] = [100, 500, 1000];
  milestones: number[] = [500, 1500, 2500, 5000];
  milestones_active: number[] = [200, 500, 1000, 1000];
  milestones_new: number[] = [10, 40, 40];
  milestones_deaths: number[] = [10, 50, 100];
  metropolitan_colors : string[] = [
    '255,255,0',
    '0,255,0',
    
    // '0,234,255',
    // '170,0,255',
    // '255,127,0',
    // '191,255,0',
    // '0,149,255',
    // '255,0,170',
    // '255,212,0',
    // '106,255,0',
    // '0,64,255',
    // '237,185,185',
    // '185,215,237',
    // '231,233,185',
    // '220,185,237',
    // '185,237,224',
    // '143,35,35',
    // '35,98,143',
    // '143,106,35',
    // '107,35,143',
    // '79,143,35',
    // '204,204,204',
    // '0,60,48',
    // '53,151,143'
  ];

 covid14_colors : string[] = [
    '118, 255, 90',
    '216, 194, 28',
    '220, 14, 8'
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
    {
      id: 'active_cases',
      title: 'Cazuri active',
      alt_id: 'cazuri_active',
      style: {
        fill: {
          color: 'rgba(217,95,14, 0.6)'
        }
      },
      dataKey: 'total_active'
    },
    {
      id: 'new_cases',
      title: 'Cazuri noi (24h)',
      alt_id: 'cazuri_noi',
      style: {
        fill: {
          color: 'rgba(217,95,14, 0.6)'
        }
      },
      dataKey: 'new_case'
    },
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
      id: 'incidenta_covid_14_zile',
      title: 'Incidenta COVID 14 zile',
      alt_id: 'incidenta_covid_14_zile',
      style: {
        fill: {
          color: 'rgba(0,0,0, 0.6)'
        }
      },
      dataKey: 'incidenta_covid_14_zile'
    },
    // {
    //   id: 'metropolitan_areas',
    //   title: 'Zone metropolitane',
    //   alt_id: 'zone_metropolitane',
    //   style: null,
    //   dataKey: null
    // },
    // {
    //   id: 'quarantine',
    //   title: 'Zone carantină',
    //   alt_id: 'zone_carantina',
    //   style: null,
    //   dataKey: null
    // }
  ];

  qStyles: any = {
    uat: {
      default: {
        stroke_color: '#984ea3',
        stroke_width: 0.3,
        fill_colors: [
          'rgba(222, 0, 11, 0.9)',
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
  displayDisclaimerDeaths: boolean = false;

  quarantineUats : any[] = [];


  selectedCovid14Zone: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dashboardService: DashboardService,
    private sharedService: SharedService,
    private domSanitizer: DomSanitizer,
    private translate: TranslateService
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

      if(this.activeMap.id === 'deaths') {
        this.showDisclaimerDeaths(true);
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
    this.quarantineUats = await this.dashboardService.getQuarantineUATGeojson(null).toPromise().then(res => res.features);
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

    if(layer.id === 'deaths') {
      this.showDisclaimerDeaths(true);
    }

    let countiesLayer: VectorLayer  = this.map.getLayers().getArray().find(l => l.get('id') === 'counties');
    countiesLayer.getSource().refresh();

    if (layer.id === 'quarantine' || layer.id === 'metropolitan_areas' || layer.id === 'incidenta_covid_14_zile') {
      this.over = [];
    } else {
      if(this.activeMap.id === 'deaths'){
        this.over[0] = this.mapData.filter(e => e[this.activeMap.dataKey] >= this.milestones_deaths[0]).map(e => e.county_code);
        this.over[1] = this.mapData.filter(e => e[this.activeMap.dataKey] >= this.milestones_deaths[1]).map(e => e.county_code);
        this.over[2] = this.mapData.filter(e => e[this.activeMap.dataKey] >= this.milestones_deaths[2]).map(e => e.county_code);
      } else if(this.activeMap.id === 'active_cases'){
        // this.over[0] = this.mapData.filter(e => e[this.activeMap.dataKey] >= this.milestones_active[0]).map(e => e.county_code);
        // this.over[1] = this.mapData.filter(e => e[this.activeMap.dataKey] >= this.milestones_active[1]).map(e => e.county_code);
        // this.over[2] = this.mapData.filter(e => e[this.activeMap.dataKey] >= this.milestones_active[2]).map(e => e.county_code);

        this.over[0] = this.mapData.filter(e => e[this.activeMap.dataKey] < this.milestones_active[0] && e[this.activeMap.dataKey] > 0).map(e => e.county_code);
        this.over[1] = this.mapData.filter(e =>  this.milestones_active[1] > e[this.activeMap.dataKey] && e[this.activeMap.dataKey]  >= this.milestones_active[0]).map(e => e.county_code);
        this.over[2] = this.mapData.filter(e =>  this.milestones_active[2] > e[this.activeMap.dataKey] && e[this.activeMap.dataKey]  >= this.milestones_active[1]).map(e => e.county_code);
        this.over[3] = this.mapData.filter(e => e[this.activeMap.dataKey] >= this.milestones_active[2]).map(e => e.county_code);
      } else if(this.activeMap.id === 'new_cases') {
        this.over[0] = this.mapData.filter(e => e[this.activeMap.dataKey] < this.milestones_new[0] && e[this.activeMap.dataKey] > 0).map(e => e.county_code);
        this.over[1] = this.mapData.filter(e =>  this.milestones_new[1] > e[this.activeMap.dataKey] && e[this.activeMap.dataKey]  >= this.milestones_new[0]).map(e => e.county_code);
        this.over[2] = this.mapData.filter(e => e[this.activeMap.dataKey] >= this.milestones_new[1]).map(e => e.county_code);
      } else {
        for(let i = 0; i < this.milestones.length; i++){
          this.over[i] = this.mapData.filter(e => e[this.activeMap.dataKey] >= this.milestones[i]).map(e => e.county_code);
        }
      }
    }
  }

  private getData() {
    return this.dashboardService.getCasesByCounty().toPromise().then(res => {
      if (res && res.data && res.data.data) {
        return res.data.data;
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
        if (['icons', 'metropolitan_areas', 'incidenta_covid_14_zile'].includes(e.get('id'))) {
          e.setVisible(false);
        } else {
          e.setVisible(true);
        }
      });
    } else if (this.activeMap.id === 'metropolitan_areas') {
      this.map.getLayers().getArray().map(e => {
        if (['counties_quarantine', 'quarantine_uats', 'roads', 'checkpoints', 'incidenta_covid_14_zile'].includes(e.get('id'))) {
          e.setVisible(false);
        } else {
          e.setVisible(true);
        }
      });
    } else if (this.activeMap.id === 'incidenta_covid_14_zile') {
      this.map.getLayers().getArray().map(e => {
        if (['counties_quarantine', 'quarantine_uats', 'roads', 'checkpoints', 'metropolitan_areas'].includes(e.get('id'))) {
          e.setVisible(false);
        } else {
          e.setVisible(true);
        }
      });
    }
    else {
      this.map.getLayers().getArray().map(e => {
        if (['counties_quarantine', 'quarantine_uats', 'roads', 'checkpoints', 'metropolitan_areas', 'incidenta_covid_14_zile'].includes(e.get('id'))) {
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

    if (feature && feature.get('carantine_flag')) {
      styleQuarantine.setFill(new Fill({
        // color: this.qStyles.uat.default.fill_colors[feature.get('quarantine')]
        color: this.qStyles.uat.default.fill_colors[0]
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
      width: 0.2
    });

    const style = new Style({
      stroke: stroke
    });

    if (feature) {
      style.setFill(new Fill({
        // color: `rgba(${this.metropolitan_colors[feature.get('nr_zona')-1]}, .6)`
        color: `rgba(${this.metropolitan_colors[feature.get('metropolitan_flag')-1]}, .3)`
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

  covid14Styles(feature) {
    const stroke = new Stroke({
      color: this.qStyles.uat.default.stroke_color,
      width: 0.2
    });

    const style = new Style({
      stroke: stroke
    });

    if (feature) {
      if(feature.get('incidenta') >= 0 && feature.get('incidenta') < 1){
        style.setFill(
          new Fill({
            color: `rgba(${this.covid14_colors[0]}, 0.5)`
          })
        );
      }

      if(feature.get('incidenta') >= 1 && feature.get('incidenta') < 3){
        style.setFill(
          new Fill({
            color: `rgba(${this.covid14_colors[1]}, 0.5)`
          })
        );
      }

      if(feature.get('incidenta') >= 3 && feature.get('incidenta') <= 100){
        style.setFill(
          new Fill({
            color: `rgba(${this.covid14_colors[2]}, 0.5)`
          })
        );
      }
    }

    //

    const styleHover = new Style({
      stroke: new Stroke({
        color: 'rgb(152, 78, 163)',
        width: 2
      }),
      // fill: new Fill({
      //   color: this.qStyles.uat.highlight.fill_color
      // })
    });

    if (feature) {
      if(feature.get('incidenta') >= 0 && feature.get('incidenta') < 1){
        styleHover.setFill(
          new Fill({
            color: `rgba(${this.covid14_colors[0]}, 0.5)`
          })
        );
      }

      if(feature.get('incidenta') >= 1 && feature.get('incidenta') < 3){
        styleHover.setFill(
          new Fill({
            color: `rgba(${this.covid14_colors[1]}, 0.5)`
          })
        );
      }

      if(feature.get('incidenta') >= 3 && feature.get('incidenta') <= 100){
        styleHover.setFill(
          new Fill({
            color: `rgba(${this.covid14_colors[2]}, 0.5)`
          })
        );
      }
    }

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

  generateStyle(fill_color){
    let style: Style = new Style({
      fill: new Fill({
        color: `rgba(${fill_color})`
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
    });

    return style;
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
      })

      // // over 0 cases
      // new Style({
      //   fill: new Fill({
      //     color: 'rgba(255,255,217, 0.6)'
      //   }),
      //   stroke: new Stroke({
      //     color: '#984ea3',
      //     width: 1
      //   }),
      //   text: new Text({
      //     font: '12px Calibri,sans-serif',
      //     fill: new Fill({
      //       color: '#000'
      //     }),
      //     stroke: new Stroke({
      //       color: '#fff',
      //       width: 4
      //     })
      //   })
      // }),

      // // over 500 cases
      // new Style({
      //   fill: new Fill({
      //     color: 'rgba(254,224,139, 0.6)'
      //   }),
      //   stroke: new Stroke({
      //     color: '#984ea3',
      //     width: 1
      //   }),
      //   text: new Text({
      //     font: '12px Calibri,sans-serif',
      //     fill: new Fill({
      //       color: '#000'
      //     }),
      //     stroke: new Stroke({
      //       color: '#fff',
      //       width: 4
      //     })
      //   })
      // }),

      // // over 1000 cases
      // new Style({
      //   fill: new Fill({
      //     color: 'rgba(209,4,52, 0.5)'
      //   }),
      //   stroke: new Stroke({
      //     color: '#984ea3',
      //     width: 1
      //   }),
      //   text: new Text({
      //     font: '12px Calibri,sans-serif',
      //     fill: new Fill({
      //       color: '#000'
      //     }),
      //     stroke: new Stroke({
      //       color: '#fff',
      //       width: 4
      //     })
      //   })
      // }),

      // // healed over 0 cases
      // new Style({
      //   fill: new Fill({
      //     color: 'rgba(173, 221, 142, 0.6)'
      //   }),
      //   stroke: new Stroke({
      //     color: '#984ea3',
      //     width: 1
      //   }),
      //   text: new Text({
      //     font: '12px Calibri,sans-serif',
      //     fill: new Fill({
      //       color: '#000'
      //     }),
      //     stroke: new Stroke({
      //       color: '#fff',
      //       width: 4
      //     })
      //   })
      // })
  ];

  if(this.activeMap.id === 'deaths'){
    this.over[0] = this.mapData.filter(e => e[this.activeMap.dataKey] >= this.milestones_deaths[0]).map(e => e.county_code);
    this.over[1] = this.mapData.filter(e => e[this.activeMap.dataKey] >= this.milestones_deaths[1]).map(e => e.county_code);
    this.over[2] = this.mapData.filter(e => e[this.activeMap.dataKey] >= this.milestones_deaths[2]).map(e => e.county_code);
  } else if(this.activeMap.id === 'active_cases'){
    // this.over[0] = this.mapData.filter(e => e[this.activeMap.dataKey] >= this.milestones_active[0]).map(e => e.county_code);
    // this.over[1] = this.mapData.filter(e => e[this.activeMap.dataKey] >= this.milestones_active[1]).map(e => e.county_code);
    // this.over[2] = this.mapData.filter(e => e[this.activeMap.dataKey] >= this.milestones_active[2]).map(e => e.county_code);

    this.over[0] = this.mapData.filter(e => e[this.activeMap.dataKey] < this.milestones_active[0] && e[this.activeMap.dataKey] > 0).map(e => e.county_code);
    this.over[1] = this.mapData.filter(e =>  this.milestones_active[1] > e[this.activeMap.dataKey] && e[this.activeMap.dataKey]  >= this.milestones_active[0]).map(e => e.county_code);
    this.over[2] = this.mapData.filter(e =>  this.milestones_active[2] > e[this.activeMap.dataKey] && e[this.activeMap.dataKey]  >= this.milestones_active[1]).map(e => e.county_code);
    this.over[3] = this.mapData.filter(e => e[this.activeMap.dataKey] >= this.milestones_active[2]).map(e => e.county_code);
  } else if(this.activeMap.id === 'new_cases') {
    this.over[0] = this.mapData.filter(e => e[this.activeMap.dataKey] < this.milestones_new[0] && e[this.activeMap.dataKey] > 0).map(e => e.county_code);
    this.over[1] = this.mapData.filter(e =>  this.milestones_new[1] > e[this.activeMap.dataKey] && e[this.activeMap.dataKey]  >= this.milestones_new[0]).map(e => e.county_code);
    this.over[2] = this.mapData.filter(e => e[this.activeMap.dataKey] >= this.milestones_new[1]).map(e => e.county_code);
  }else {
    for(let i = 0; i < this.milestones.length; i++){
      this.over[i] = this.mapData.filter(e => e[this.activeMap.dataKey] >= this.milestones[i]).map(e => e.county_code);
    }
  }

    const vectorLayer = new VectorLayer({
      id: 'counties',
      source: new VectorSource({
        url: './assets/counties.geojson',
        format: new GeoJSON()
      }),
      style(feature) {
        let s = styles[0];
        
        // default
        if(self.activeMap.id === 'confirmed'){
          if(self.over.length > 0 && self.over[0].includes(feature.get('county_code'))){
            s = self.generateStyle('255,255,217, 0.6');
          }
  
          if(self.over.length > 0 && self.over[1].includes(feature.get('county_code'))){
            s = self.generateStyle('254,224,139, 0.6');
          }
  
          if(self.over.length > 0 && self.over[2].includes(feature.get('county_code'))){
            s = self.generateStyle('209,4,52, 0.6');
          }
  
          if(self.over.length > 0 && self.over[3].includes(feature.get('county_code'))){
            s = self.generateStyle('111, 30, 81, 0.6');
          }
        }
        

        // // active
        // if(self.activeMap.id === 'active_cases'){
        //   if(self.over.length > 0 && self.over[0].includes(feature.get('county_code'))){
        //     s = self.generateStyle('0,217,203, 0.6');
        //   }

        //   if(self.over.length > 0 && self.over[1].includes(feature.get('county_code'))){
        //     s = self.generateStyle('0,217,203, 0.6');
        //   }

        //   if(self.over.length > 0 && self.over[2].includes(feature.get('county_code'))){
        //     s = self.generateStyle('0,217,203, 0.6');
        //   }
        // }

        if(self.activeMap.id === 'active_cases') {
          if(self.over.length > 0 && self.over[0].includes(feature.get('county_code'))){
            s = self.generateStyle('255,255,217, 0.6');
          }
  
          if(self.over.length > 0 && self.over[1].includes(feature.get('county_code'))){
            s = self.generateStyle('254,224,139, 0.6');
          }
  
          if(self.over.length > 0 && self.over[2].includes(feature.get('county_code'))){
            s = self.generateStyle('209,4,52, 0.6');
          }

          if(self.over.length > 0 && self.over[3].includes(feature.get('county_code'))){
            s = self.generateStyle('111, 30, 81, 0.6');
          }
        }

        if(self.activeMap.id === 'new_cases') {
          if(self.over.length > 0 && self.over[0].includes(feature.get('county_code'))){
            s = self.generateStyle('255,255,217, 0.6');
          }
  
          if(self.over.length > 0 && self.over[1].includes(feature.get('county_code'))){
            s = self.generateStyle('254,224,139, 0.6');
          }
  
          if(self.over.length > 0 && self.over[2].includes(feature.get('county_code'))){
            s = self.generateStyle('209,4,52, 0.6');
          }
        }

        //healed
        if(self.activeMap.id === 'healed'){
          // if(self.over.length > 0 && self.over[0].includes(feature.get('county_code'))){
          //   s = self.generateStyle('102,194,164, 0.6');
          // }

          // if(self.over.length > 0 && self.over[1].includes(feature.get('county_code'))){
          //   s = self.generateStyle('35,139,69, 0.6');
          // }

          if(self.over.length > 0 && self.over[2].includes(feature.get('county_code'))){
            s = self.generateStyle('0,68,27, 0.6');
          }
        }

        //deaths
        if(self.activeMap.id === 'deaths'){
          // if(self.over.length > 0 && self.over[0].includes(feature.get('county_code'))){
          //   s = self.generateStyle('217,72,1, 0.9');
          // }

          // if(self.over.length > 0 && self.over[1].includes(feature.get('county_code'))){
          //   s = self.generateStyle('166,54,3, 0.9');
          // }

          // if(self.over.length > 0 && self.over[2].includes(feature.get('county_code'))){
          //   s = self.generateStyle('127,39,4, 0.9');
          // }
        }

        if(self.activeMap.id === 'quarantine'){
          let entry = self.quarantineUats.find(e => e.properties['cod_judet'] === feature.get('county_code'));

          if(entry) s = self.generateStyle('255,247,188, 0.5');
        }
        

        if(!s.getText()) s.setText(new Text());
        s.getText().setText(feature.get('county_code'));
        
        return s;
      }
    });

    const vectorLayerMetropolitanAreas = new VectorLayer({
      id: 'metropolitan_areas',
      source: new VectorSource({
        url: '/api/dashboard/getMetropolitanAreasGeojson',
        format: new GeoJSON()
      }),
      style(feature) {
        return self.metropolitanStyles(feature)[0];
      }
    });

    const vectorLayerQuarantine = new VectorLayer({
      id: 'counties_quarantine',
      source: new VectorSource({
        url: '/api/dashboard/getQuarantineGeojson',
        format: new GeoJSON()
      }),
      style(feature) {
        return self.quarantineStyles(feature)[0];
      }
    });
    

    const vectorLayerQuarantineUATS = new VectorLayer({
      id: 'quarantine_uats',
      source: new VectorSource({
        url: '/api/dashboard/getQuarantineUATGeojson',
        format: new GeoJSON()
      }),
      style(feature) {
        // let counties = vectorLayer.getSource().getFeatures();
        let style = new Style({
            fill: new Fill({
              color: 'rgba(255,127,0, 0.2)'
            }),
            stroke: new Stroke({
              color: '#984ea3',
              width: 1
            })
          });

        return style;
      }
    });

    const vectorLayerCovid14 = new VectorLayer({
      id: 'incidenta_covid_14_zile',
      source: new VectorSource({
        url: '/api/dashboard/getCovid14Geojson',
        format: new GeoJSON()
      }),
      style(feature) {
        return self.covid14Styles(feature)[0];
      }
    });

    // const vectorLayerRoads = new VectorLayer({
    //   id: 'roads',
    //   source: new VectorSource({
    //     url: './assets/retea_rutiera_principala_ro_clip_simplificat.geojson',
    //     format: new GeoJSON()
    //   }),
    //   style() {
    //     return self.roadsStyles()[0];
    //   }
    // });
    

    // const vectorLayerCheckpoints = new VectorLayer({
    //   id: 'checkpoints',
    //   source: new VectorSource({
    //     url: './assets/puncte_verificare.geojson',
    //     format: new GeoJSON()
    //   }),
    //   style: self.checkpointsStyles()[0]
    // });

    const map = new Map({
      controls: defaultControls().extend([
        new ShowLegend(null)
      ]),
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        // vectorLayerMetropolitanAreas,
        vectorLayer,
        // vectorLayerQuarantine,
        // vectorLayerQuarantineUATS,
        vectorLayerCovid14,
        // vectorLayerRoads,
        // vectorLayerCheckpoints,
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

      // console.log(ev)

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

      if (self.selectedCovid14Zone !== null) {
        let style = self.covid14Styles(self.selectedCovid14Zone)[0];
        self.selectedCovid14Zone.setStyle(style);
        // self.selectedCovid14Zone = null;
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
        } else if (layer.get('id') === 'incidenta_covid_14_zile') {
          let style = self.covid14Styles(self.selectedCovid14Zone)[1];

          self.selectedCovid14Zone = feature;
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

      if (self.selectedMetropolitan !== null) {
        self.selectedMetropolitan.setStyle(this.metropolitanStyles[0]);
        self.selectedMetropolitan = null;
      }

      if (self.selectedCovid14Zone !== null) {
        self.selectedCovid14Zone.setStyle(this.selectedCovid14Zone[0]);
        self.selectedCovid14Zone = null;
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
      } else if (self.activeMap.id === 'incidenta_covid_14_zile') {
        const feature = vectorLayerCovid14.getSource().getClosestFeatureToCoordinate(coords);
        self.selectedCovid14Zone = feature;
        let style = self.covid14Styles(null)[1];
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

    // if (this.selectedQuarantineZone !== null) {
    //   let style = new Style({
    //     fill: new Fill({
    //       color: this.qStyles.uat.default.fill_colors[this.selectedQuarantineZone.get('quarantine')]
    //     })
    //   });
    //   this.selectedQuarantineZone.setStyle(style);
    //   this.selectedQuarantineZone = null;
    // }

    this.router.navigate(['/'], {
      queryParams: {
        map: this.activeMap.alt_id
      },
      queryParamsHandling: 'merge'
    });

    let countiesLayer: VectorLayer  = this.map.getLayers().getArray().find(l => l.get('id') === 'counties');
    countiesLayer.getSource().refresh();

    console.log(this.activeMap.id)

    if (this.activeMap.id === 'quarantine' || this.activeMap.id === 'metropolitan_areas' || this.activeMap.id === 'incidenta_covid_14_zile') {
      this.over = [];
    } else {

      if(this.activeMap.id === 'deaths'){
        this.over[0] = this.mapData.filter(e => e[this.activeMap.dataKey] >= this.milestones_deaths[0]).map(e => e.county_code);
        this.over[1] = this.mapData.filter(e => e[this.activeMap.dataKey] >= this.milestones_deaths[1]).map(e => e.county_code);
        this.over[2] = this.mapData.filter(e => e[this.activeMap.dataKey] >= this.milestones_deaths[2]).map(e => e.county_code);
      } else if(this.activeMap.id === 'active_cases'){
        // this.over[0] = this.mapData.filter(e => e[this.activeMap.dataKey] >= this.milestones_active[0]).map(e => e.county_code);
        // this.over[1] = this.mapData.filter(e => e[this.activeMap.dataKey] >= this.milestones_active[1]).map(e => e.county_code);
        // this.over[2] = this.mapData.filter(e => e[this.activeMap.dataKey] >= this.milestones_active[2]).map(e => e.county_code);

        this.over[0] = this.mapData.filter(e => e[this.activeMap.dataKey] < this.milestones_active[0] && e[this.activeMap.dataKey] > 0).map(e => e.county_code);
        this.over[1] = this.mapData.filter(e =>  this.milestones_active[1] > e[this.activeMap.dataKey] && e[this.activeMap.dataKey]  >= this.milestones_active[0]).map(e => e.county_code);
        this.over[2] = this.mapData.filter(e =>  this.milestones_active[2] > e[this.activeMap.dataKey] && e[this.activeMap.dataKey]  >= this.milestones_active[1]).map(e => e.county_code);
        this.over[3] = this.mapData.filter(e => e[this.activeMap.dataKey] >= this.milestones_active[2]).map(e => e.county_code);
      } else if(this.activeMap.id === 'new_cases') {
        this.over[0] = this.mapData.filter(e => e[this.activeMap.dataKey] < this.milestones_new[0] && e[this.activeMap.dataKey] > 0).map(e => e.county_code);
        this.over[1] = this.mapData.filter(e =>  this.milestones_new[1] > e[this.activeMap.dataKey] && e[this.activeMap.dataKey]  >= this.milestones_new[0]).map(e => e.county_code);
        this.over[2] = this.mapData.filter(e => e[this.activeMap.dataKey] >= this.milestones_new[1]).map(e => e.county_code);
      } else {
        this.over[0] = this.mapData.filter(e => e[this.activeMap.dataKey] >= this.milestones[0]).map(e => e.county_code);
        this.over[1] = this.mapData.filter(e => e[this.activeMap.dataKey] >= this.milestones[1]).map(e => e.county_code);
        this.over[2] = this.mapData.filter(e => e[this.activeMap.dataKey] >= this.milestones[2]).map(e => e.county_code);
      }
    }
    
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

  showDisclaimerDeaths(val) {
    this.displayDisclaimerDeaths = val;
  }

  generateLegendItems(options, milestone, fill_colors, stroke_colors){
      let first_text = 'Judete cu mai mult de';
      let alt_text = 'Judete cu mai putin de';
      let text = 'cazuri confirmate';

      if(this.activeMap.id === 'healed') text = 'vindecari confirmate';
      if(this.activeMap.id === 'deaths') text = 'decese confirmate';
      if(this.activeMap.id === 'active_cases') text = 'cazuri active';
      if(this.activeMap.id === 'new_cases') text = 'cazuri noi';

      let legend;
      
      
    if(this.activeMap.id === 'incidenta_covid_14_zile'){
      legend = `
      <text fill="${options.text_fill}" font-size="${options.font_size}" font-family="${options.font_family}" x="3" y="10"> ${this.translate.instant(`home.Rata de incidenta la 1000 locuitori`)} </text>

      <rect x="3" y="17" width="20" height="20" style="fill:rgba(${fill_colors[0]}, .5);stroke-width:0.8;stroke: ${stroke_colors[0]}" />
      <text fill="${options.text_fill}" font-size="${options.font_size}" font-family="${options.font_family}" x="32" y="33"> < 1 </text>

      <rect x="3" y="48" width="20" height="20" style="fill:rgba(${fill_colors[1]}, .5);stroke-width:0.8;stroke: ${stroke_colors[0]}" />
      <text fill="${options.text_fill}" font-size="${options.font_size}" font-family="${options.font_family}" x="32" y="64"> 1 - 3 </text>

      <rect x="3" y="79" width="20" height="20" style="fill:rgba(${fill_colors[2]}, .5);stroke-width:0.8;stroke: ${stroke_colors[0]}" />
      <text fill="${options.text_fill}" font-size="${options.font_size}" font-family="${options.font_family}" x="32" y="95"> >= 3 </text>
     `;
    } else {
      legend = `
      <rect x="3" y="65" width="20" height="20" style="fill:rgba(${fill_colors[0]});stroke-width:0.8;stroke: ${stroke_colors[0]}" />
      <text fill="${options.text_fill}" font-size="${options.font_size}" font-family="${options.font_family}" x="32" y="75">${this.translate.instant(`home.${first_text}`)} ${milestone[0]}</text>
      <text fill="${options.text_fill}" font-size="${options.font_size}" font-family="${options.font_family}" x="32" y="88">${this.translate.instant(`home.${text}`)}</text>

      <rect x="3" y="100" width="20" height="20" style="fill:rgba(${fill_colors[1]});stroke-width:0.8;stroke: ${stroke_colors[0]}" />
      <text fill="${options.text_fill}" font-size="${options.font_size}" font-family="${options.font_family}" x="32" y="110">${this.translate.instant(`home.${first_text}`)} ${milestone[1]}</text>
      <text fill="${options.text_fill}" font-size="${options.font_size}" font-family="${options.font_family}" x="32" y="123">${this.translate.instant(`home.${text}`)}</text>

      <rect x="3" y="135" width="20" height="20" style="fill:rgba(${fill_colors[2]});stroke-width:0.8;stroke: ${stroke_colors[0]}" />
      <text fill="${options.text_fill}" font-size="${options.font_size}" font-family="${options.font_family}" x="32" y="145">${this.translate.instant(`home.${first_text}`)} ${milestone[2]}</text>
      <text fill="${options.text_fill}" font-size="${options.font_size}" font-family="${options.font_family}" x="32" y="158">${this.translate.instant(`home.${text}`)}</text>
    `;

    if(this.activeMap.id === 'confirmed'){
      legend += `
        <rect x="3" y="170" width="20" height="20" style="fill:rgba(${fill_colors[3]});stroke-width:0.8;stroke: ${stroke_colors[0]}" />
        <text fill="${options.text_fill}" font-size="${options.font_size}" font-family="${options.font_family}" x="32" y="180">${this.translate.instant(`home.${first_text}`)} ${milestone[3]}</text>
        <text fill="${options.text_fill}" font-size="${options.font_size}" font-family="${options.font_family}" x="32" y="193">${this.translate.instant(`home.${text}`)}</text>
      `;
    }

    if(this.activeMap.id === 'active_cases'){
      legend = `
        <rect x="3" y="65" width="20" height="20" style="fill:rgba(${fill_colors[0]});stroke-width:0.8;stroke: ${stroke_colors[0]}" />
        <text fill="${options.text_fill}" font-size="${options.font_size}" font-family="${options.font_family}" x="32" y="75">${this.translate.instant(`home.${alt_text}`)} ${milestone[0]}</text>
        <text fill="${options.text_fill}" font-size="${options.font_size}" font-family="${options.font_family}" x="32" y="88">${this.translate.instant(`home.${text}`)}</text>

        <rect x="3" y="100" width="20" height="20" style="fill:rgba(${fill_colors[1]});stroke-width:0.8;stroke: ${stroke_colors[0]}" />
        <text fill="${options.text_fill}" font-size="${options.font_size}" font-family="${options.font_family}" x="32" y="110">${this.translate.instant(`home.${alt_text}`)} ${milestone[1]}</text>
        <text fill="${options.text_fill}" font-size="${options.font_size}" font-family="${options.font_family}" x="32" y="123">${this.translate.instant(`home.${text}`)}</text>

        <rect x="3" y="135" width="20" height="20" style="fill:rgba(${fill_colors[2]});stroke-width:0.8;stroke: ${stroke_colors[0]}" />
        <text fill="${options.text_fill}" font-size="${options.font_size}" font-family="${options.font_family}" x="32" y="145">${this.translate.instant(`home.${alt_text}`)} ${milestone[2]}</text>
        <text fill="${options.text_fill}" font-size="${options.font_size}" font-family="${options.font_family}" x="32" y="158">${this.translate.instant(`home.${text}`)}</text>

        <rect x="3" y="170" width="20" height="20" style="fill:rgba(${fill_colors[3]});stroke-width:0.8;stroke: ${stroke_colors[0]}" />
        <text fill="${options.text_fill}" font-size="${options.font_size}" font-family="${options.font_family}" x="32" y="180">${this.translate.instant(`home.${first_text}`)} ${milestone[2]}</text>
        <text fill="${options.text_fill}" font-size="${options.font_size}" font-family="${options.font_family}" x="32" y="193">${this.translate.instant(`home.${text}`)}</text>
       `;
    }

    if(this.activeMap.id === 'new_cases'){
      legend = `
      <rect x="3" y="65" width="20" height="20" style="fill:rgba(${fill_colors[0]});stroke-width:0.8;stroke: ${stroke_colors[0]}" />
      <text fill="${options.text_fill}" font-size="${options.font_size}" font-family="${options.font_family}" x="32" y="75">${this.translate.instant(`home.${alt_text}`)} ${milestone[0]}</text>
      <text fill="${options.text_fill}" font-size="${options.font_size}" font-family="${options.font_family}" x="32" y="88">${this.translate.instant(`home.${text}`)}</text>

      <rect x="3" y="100" width="20" height="20" style="fill:rgba(${fill_colors[1]});stroke-width:0.8;stroke: ${stroke_colors[0]}" />
      <text fill="${options.text_fill}" font-size="${options.font_size}" font-family="${options.font_family}" x="32" y="110">${this.translate.instant(`home.${alt_text}`)} ${milestone[1]}</text>
      <text fill="${options.text_fill}" font-size="${options.font_size}" font-family="${options.font_family}" x="32" y="123">${this.translate.instant(`home.${text}`)}</text>

      <rect x="3" y="135" width="20" height="20" style="fill:rgba(${fill_colors[2]});stroke-width:0.8;stroke: ${stroke_colors[0]}" />
      <text fill="${options.text_fill}" font-size="${options.font_size}" font-family="${options.font_family}" x="32" y="145">${this.translate.instant(`home.${first_text}`)} ${milestone[2]}</text>
      <text fill="${options.text_fill}" font-size="${options.font_size}" font-family="${options.font_family}" x="32" y="158">${this.translate.instant(`home.${text}`)}</text>
    `;
    }
    }

      return legend;
  }

  generateLegend(){
    let map = this.maps.find(e => e.id === this.activeMap.id);

    const options = {
      width: 230,
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

    if(['quarantine', 'incidenta_covid_14_zile'].includes(this.activeMap.id)) {
      options.height = 110;
    }

    if(['healed', 'deaths', 'new_cases'].includes(this.activeMap.id)) {
      options.height = 170;
    }

    if(['confirmed', 'active_cases'].includes(this.activeMap.id)) {
      options.height = 200;
    }
    

    let legend =  `
      <svg width="${options.width}" height="${options.height}">  
    `;

    if(this.activeMap.id === 'quarantine'){
      legend += `
        <polygon points="5,20 8,13 20,10 25,20 20,25  10,27 5,20" stroke="purple" fill="${this.qStyles.uat.default.fill_colors[0]}" stroke-width="${options.stroke_width}" />
        <text fill="${options.text_fill}" font-size="${options.font_size}" font-family="${options.font_family}" x="32" y="23">${this.translate.instant('home.Localități carantinate')}</text>

        <polygon points="5,45 8,38 20,35 25,45 20,50  10,52 5,45" stroke="purple" fill="rgba(255,127,0, 1)" stroke-width="${options.stroke_width}" />
        <text fill="${options.text_fill}" font-size="${options.font_size}" font-family="${options.font_family}" x="32" y="48">${this.translate.instant('home.UAT-uri cu localități carantinate')}</text>
        
        <polygon points="5,70 8,63 20,60 25,70 20,75  10,77 5,70" stroke="purple" fill="rgba(255,247,188, 1)" stroke-width="${options.stroke_width}" />
        <text fill="${options.text_fill}" font-size="${options.font_size}" font-family="${options.font_family}" x="32" y="73">${this.translate.instant('home.Județe cu localități carantinate')}</text>
      `;

      // <polygon points="5,45 8,38 20,35 25,45 20,50  10,52 5,45" stroke="purple" fill="${this.qStyles.uat.default.fill_colors[1]}" stroke-width="${options.stroke_width}" />
      // <text fill="${options.text_fill}" font-size="${options.font_size}" font-family="${options.font_family}" x="32" y="48">${this.translate.instant('home.Zone cu statut special')}</text>

      // <circle cx="14" cy="68" r="${options.small_radius}" stroke="${this.qStyles.checkpoints.default.stroke_color}" stroke-width="${options.stroke_width}" fill="${this.qStyles.checkpoints.default.fill_color}" />
      //   <text fill="${options.text_fill}" font-size="${options.font_size}" font-family="${options.font_family}" x="32" y="73">${this.translate.instant('home.Punct control')}</text>

      //   <line x1="5" y1="92" x2="20" y2="92" style="stroke: ${this.qStyles.roads.default.stroke_color};stroke-width:2" />
      //   <text fill="${options.text_fill}" font-size="${options.font_size}" font-family="${options.font_family}" x="32" y="95">${this.translate.instant('home.Drum')}</text>
    } else if(this.activeMap.id === 'incidenta_covid_14_zile'){ 
    //   legend += `
  
    //   <circle cx="13" cy="12" r="${options.big_radius}" stroke="#ffff33" stroke-width="${options.stroke_width}" fill="${map.style.fill.color}" />
    //   <text fill="${options.text_fill}" font-size="${options.font_size}" font-family="${options.font_family}" x="32" y="17">${this.translate.instant('home.'+map.title)}</text>

    //   <circle cx="13" cy="43" r="${options.big_radius}" stroke="#e41a1c" stroke-width="${options.stroke_width}" fill="${options.hightlight_fill}" />
    //   <text fill="${options.text_fill}" font-size="${options.font_size}" font-family="${options.font_family}" x="32" y="48">${this.translate.instant('home.Inregistrare selectată')}</text>
    // `;
      legend += this.generateLegendItems(options, null, this.covid14_colors, ['#984ea3']);
    } else {
      legend += `
  
        <circle cx="13" cy="12" r="${options.big_radius}" stroke="#ffff33" stroke-width="${options.stroke_width}" fill="${map.style.fill.color}" />
        <text fill="${options.text_fill}" font-size="${options.font_size}" font-family="${options.font_family}" x="32" y="17">${this.translate.instant('home.'+map.title)}</text>

        <circle cx="13" cy="43" r="${options.big_radius}" stroke="#e41a1c" stroke-width="${options.stroke_width}" fill="${options.hightlight_fill}" />
        <text fill="${options.text_fill}" font-size="${options.font_size}" font-family="${options.font_family}" x="32" y="48">${this.translate.instant('home.Inregistrare selectată')}</text>
      `;

      if(this.activeMap.id === 'confirmed') {
        legend += this.generateLegendItems(options, this.milestones, ['255,255,217, 0.6', '254,224,139, 0.6', '209,4,52, 0.5', '111, 30, 81, 0.6'], ['#984ea3']);
      }

      if(this.activeMap.id === 'healed') {
        legend += this.generateLegendItems(options, this.milestones, ['255,255,217, 0.6', '254,224,139, 0.6', '0,68,27, 0.6'], ['#984ea3']);
      }

      if(this.activeMap.id === 'deaths') {
        legend += this.generateLegendItems(options, this.milestones_deaths, ['255,255,217, 0.6', '254,224,139, 0.6', '209,4,52, 0.5'], ['#984ea3']);
      }

      if(this.activeMap.id === 'active_cases') {
        legend += this.generateLegendItems(options, this.milestones_active, ['255,255,217, 0.6', '254,224,139, 0.6', '209,4,52, 0.6', '111, 30, 81, 0.6'], ['#984ea3']);
      }

      if(this.activeMap.id === 'new_cases') {
        legend += this.generateLegendItems(options, this.milestones_new, ['255,255,217, 0.6', '254,224,139, 0.6', '209,4,52, 0.6'], ['#984ea3']);
      }
    }

    legend += `
        Sorry, your browser does not support inline SVG.
      </svg>
    `;

    return this.domSanitizer.bypassSecurityTrustHtml(legend);
  }
}
