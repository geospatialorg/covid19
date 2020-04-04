import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as $ from 'jquery';
import { Chart } from 'chart.js';
import * as pluginAnnotation from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-mobility',
  templateUrl: './mobility.component.html',
  styleUrls: ['./mobility.component.css'],
})
export class MobilityComponent implements OnInit {
  @ViewChild('canvasMobility', {static: true}) canvasMobility: ElementRef;
  @ViewChild('mainGrid', {static: true}) mainGrid: ElementRef;

  constructor() { }

  ngOnInit(): void {
    this.drawChart3();
  }

  drawChart3() {

    let cfg_wazers = {
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
        text: "sage.ieat.ro"
      },
      annotation: {
          drawTime: 'beforeDatasetsDraw',
          events: ['click', 'mouseover'],
          //annotations: roMeasuresAnnotations
      },
      responsive: true,
      title: {
        display: true,
        text: "Utilizatori Waze",
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
      },
      plugins: {
        pluginAnnotation
      }
    }
    };

    $.getJSON({
      url: '/external/wazero/bu.2.json',
      success: function(data) {
        var sensor_data_server = []
        for (var i in data) {
          sensor_data_server.push({'x': data[i]['time'], 'y': data[i]['value']})
        }
        var sensor_data = {
          label: "Numar wazers",
          data: sensor_data_server,
          backgroundColor: '#9999ff',
          borderColor: '#9999ff',
          fill: false
        }

        var ctxMobility = self.canvasMobility.nativeElement.getContext('2d');
        let myLine = new Chart(ctxMobility, cfg_wazers);
      }
    });
    
  
  }

}
