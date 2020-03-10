import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';

import {OSM, Vector as VectorSource} from 'ol/source';

import GeoJSON from 'ol/format/GeoJSON';
import {Fill, Stroke, Style, Text} from 'ol/style';
import Circle from 'ol/geom/Circle';
import Feature from 'ol/Feature';
import { DashboardService } from 'src/app/_services';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map: Map = null;
  maxRadius: number = 40000;
  minRadius: number = 7500;
  mapData: any[] = [];

  selectedFeature: any = null;

  constructor(
    private DashboardSvc: DashboardService
  ) { }

  ngOnInit(): void {
    
    this.initMap();
  }

  getData(){
    return this.DashboardSvc.getCasesByCounty().toPromise().then( res => {
      if(res &&  res.data && res.data.data) {
        return res.data.data;
      }

      return [];
    });
  }

  private linearInterpolate(x, x0, x1, y0,y1)
  {
      if ((x1 - x0) == 0)
      {
          return (y0 + y1) / 2;
      }
      return y0 + (x - x0) * (y1 - y0) / (x1 - x0);
  }

  getGeojsonData(){
    return fetch('../assets/counties.geojson').then(function(response) {
      return response.json();
    }).then(function(json) {
      return json;
    });
  }

  async initMap() {
    let self = this;

    this.mapData = await this.getData();

    let geojson = await this.getGeojsonData();
    console.log('geojson', geojson )
    console.log('geojson', this.mapData )
    
    // let data = self.mapData.find(e => e.county_code === feature.get('county_code'));

    // console.log(data)

    // if(data){
    //   let radius = data.county_code === self.mapData[0].county_code  ? self.maxRadius : (self.maxRadius*data.total_county)/self.mapData[0].total_county < self.minRadius ? self.minRadius : (self.maxRadius*data.total_county)/self.mapData[0].total_county;
    //   let circle =  new Circle([feature.get('x_cen'), feature.get('y_cen')], radius);
    //   let f = new Feature(circle);

    //   // if(data.total_county > 0) iconStyle.getText().setText(data.total_county.toString());

    //   f.setStyle(iconStyle);
    //   vectorSource.addFeature(f);
    // }
    

    var style = new Style({
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

    var highlightStyle = new Style({
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


    let iconSource = new VectorSource();
   
    var iconLayer = new VectorLayer({
      id: 'icons',
      source: iconSource
    });

    let geojsonFeatures = (new GeoJSON()).readFeatures(geojson);

    var iconStyle = new Style({
      stroke: new Stroke({
        color: '#ffff33',
        width: 0.5
      }),
      fill: new Fill({
          color: 'rgba(228,26,28, 0.6)'
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

    this.mapData.map(e => {
      let data = geojsonFeatures.find(f => e.county_code === f.get('county_code'));

      

      console.log(e)

      if(data) {
        let radius = self.linearInterpolate(e.total_county, self.mapData[self.mapData.length-1].total_county, self.mapData[0].total_county, self.minRadius, self.maxRadius);
        let circle =  new Circle([data.get('x_cen'), data.get('y_cen')], radius);
        let feat = new Feature(circle);

        Object.keys(e).map(r => {
          feat.set(r, e[r]);
        });
        
        // if(e.total_county > 0) iconStyle.getText().setText(e.county_code);
        // if(e.total_county > 0) iconStyle.getText().setText(e.total_county.toString());

        feat.setStyle(iconStyle);
        iconSource.addFeature(feat);
      }
    })

    var vectorLayer = new VectorLayer({
      id: 'counties',
      source: new VectorSource({
        url: './assets/counties.geojson',
        format: new GeoJSON()
      }),
      style: function(feature) {
        style.getText().setText(feature.get('county_code'));
        return style;
      }
    });


    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        vectorLayer,
        iconLayer
      ],
      target: 'map',
      view: new View({
        center: [2747146.7966,5749287.5195],
        extent: [1591113.1808,5183042.0140,3918467.8180,6368121.7005],
        zoom: 4,
        maxZoom: 15,
        minZoom: 3
      })
    });
    

    this.map.on('pointermove', (ev)=> {
      if (ev.dragging) return;

      if (self.selectedFeature !== null) {
        self.selectedFeature.setStyle(iconStyle);
        self.selectedFeature = null;
      }

      let pixel = ev.pixel;

    self.map.forEachFeatureAtPixel(pixel, (feature, layer) => {
        if(layer.get('id') === 'counties') return;

        self.selectedFeature = feature;
        console.log(self.selectedFeature)
        feature.setStyle(highlightStyle);
        return true;
      });
    });
  }

  ngDestroy(){
    this.map.off('pointermove');
  }


}
