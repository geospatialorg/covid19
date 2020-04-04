import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as $ from 'jquery';
import { Chart } from 'chart.js';
import * as pluginAnnotation from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-mobility',
  templateUrl: './mobility.component.html',
  styleUrls: ['./mobility.component.scss']
})
export class MobilityComponent implements OnInit {
  @ViewChild('canvasMobility', {static: true}) canvasMobility: ElementRef;
  @ViewChild('mainGrid', {static: true}) mainGrid: ElementRef;

  constructor() { }
  enableFeature: false;

  ngOnInit(): void {
    if (this.enableFeature) {
      this.drawChart3();
    }
  }

  drawChart3() {

    const cfgWazers = {
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
      watermark: {
        text: 'sage.ieat.ro'
      },
      annotation: {
          drawTime: 'beforeDatasetsDraw',
          events: ['click', 'mouseover'],
          // annotations: roMeasuresAnnotations
      },
      responsive: true,
      title: {
        display: true,
        text: 'Utilizatori Waze',
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
      },
      plugins: {
        pluginAnnotation
      }
    }
    };

    $.getJSON({
      url: '/external/wazero/bu.2.json',
      success(data) {
        const sensorDataServer = [];
        data.forEach(element => {
          sensorDataServer.push({x: element.time, y: element.value});
        });
        const sensorData = {
          label: 'Numar wazers',
          data: sensorDataServer,
          backgroundColor: '#9999ff',
          borderColor: '#9999ff',
          fill: false
        };

        const ctxMobility = this.canvasMobility.nativeElement.getContext('2d');
        const myLine = new Chart(ctxMobility, cfgWazers);
      }
    });

  }

}
