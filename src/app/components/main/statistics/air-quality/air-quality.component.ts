import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as $ from 'jquery';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-air-quality',
  templateUrl: './air-quality.component.html',
  styleUrls: ['./air-quality.component.scss']
})
export class AirQualityComponent implements OnInit {
  @ViewChild('canvasAirQ', {static: true}) canvasAirQ: ElementRef;
  @ViewChild('canvasNO2', {static: true}) canvasNO2: ElementRef;
  @ViewChild('mainGrid', {static: true}) mainGrid: ElementRef;

  constructor() { }

  ngOnInit(): void {
    this.drawChart4();
  }

  drawChart4(){
    let self = this;
    let diagrame = {
      'ica_data': {
        titlu: 'Calitate Aer',
        label: 'Aerlive.ro Medie Indice Calitate Aer - Bucuresti',
        canvas: self.canvasAirQ.nativeElement.getContext('2d')
      },
      'no2_data': {
        titlu: 'Dioxid de azot',
        label: 'Aerlive.ro Medie NO2 - Bucuresti',
        canvas: self.canvasNO2.nativeElement.getContext('2d')
      }
    };
    
    let myLine;

    $.getJSON({
      url: 'http://covid19.apps.sage.ieat.ro/aerlive.avg.json',
      success: function(data) {
        for (var key in diagrame) {
          var cfg_aer_live = {
            type: 'line',
            data: {
              datasets: [{
                label: 'Medie NO2',
                data: [],
                fill: false
              }
            ]
          },
          options: {
            annotation: {
                drawTime: 'beforeDatasetsDraw',
                events: ['click', 'mouseover'],
                //annotations: this.chartAnnotations
            },
            responsive: true,
            title: {
              display: true,
              text: "Informații Poluare",
              fontSize: 18
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
              xAxes: [{
                  type: 'time',
                  time: {
                      format: 'DD-MM-YYYY',
                      tooltipFormat: 'll',
                      unit: 'day',
                      unitStepSize: 5
                  },
                  display: true,
                  scaleLabel: {
                      display: true,
                      labelString: 'Data'
                  }
              }],
              yAxes: [{
                  //display: true,
                  scaleLabel: {
                      display: true,
                      labelString: 'Valoare indice'
                  }
              }]
            }
          }
          };
          cfg_aer_live.options.title.text = diagrame[key].titlu;
          var sensor_data_server = data[key];
          var sensor_data = {
            label: diagrame[key].label,
            data: sensor_data_server,
            backgroundColor: '#9999ff',
            borderColor: '#9999ff',
            fill: false
          }
          cfg_aer_live.data.datasets = [sensor_data, ];
          var ctxSensor = diagrame[key].canvas;
          myLine = new Chart(ctxSensor, cfg_aer_live);
          console.log(cfg_aer_live)
        }
      }
  });
  };

}
