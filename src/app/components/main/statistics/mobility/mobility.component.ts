import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import * as $ from 'jquery';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-mobility',
  templateUrl: './mobility.component.html',
  styleUrls: ['./mobility.component.scss']
})
export class MobilityComponent implements OnInit {
  @ViewChild('canvasMobility', {static: true}) canvasMobility: ElementRef;
  @ViewChild('mainGrid', {static: true}) mainGrid: ElementRef;
  @HostListener('window:resize', ['$event'])
    onResize(event?) {
    this.isMobile = window.innerWidth < 450;

    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    }

  isMobile: boolean = window.innerWidth < 450;

  screenHeight: number;
  screenWidth: number;

  constructor() { }
  enableFeature : true = true;

  ngOnInit(): void {
    if (this.enableFeature) {
      // this.drawChart3();
    }

    if ( window.location !== window.parent.location ) { 
      this.isMobile = true;
    }
  }

  drawChart3() {
    let self = this;
    let cfgWazers = {
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
        responsive: true,
        title: {
          display: true,
          text: 'Utilizatori Waze București',
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
              // display: true,
              scaleLabel: {
                  display: true,
                  labelString: 'Valoare indice'
              }
          }]
        }
      }
    };

    $.getJSON({
      url: 'https://covid19.geo-spatial.org/external/wazero/bu.2.json',
      success(data) {
        const sensorDataServerY = [];
        const sensorDataServerX = [];
        for (var d in data) {
          sensorDataServerY.push(data[d].value);
          sensorDataServerX.push(data[d].time);
        };

        const sensorData = {
          label: 'Numar wazers',
          data: sensorDataServerY,
          backgroundColor: '#9999ff0',
          borderColor: '#9999ff',
          fill: false
        };

        cfgWazers['data']['labels'] = sensorDataServerX;
        cfgWazers.data.datasets = [sensorData, ];
        const ctxMobility = self.canvasMobility.nativeElement.getContext('2d');
        const myLine = new Chart(ctxMobility, cfgWazers);
      }
    });

  }

}
