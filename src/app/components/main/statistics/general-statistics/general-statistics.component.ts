import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, HostListener } from '@angular/core';
import * as $ from 'jquery';
import { Chart } from 'chart.js';
import * as regression from 'regression';
import * as palette from 'google-palette';
import * as pluginPiechartOutlabels from 'chartjs-plugin-piechart-outlabels';
import * as pluginAnnotation from 'chartjs-plugin-annotation';
import {SharedService} from '../../../../services/shared.service';
import {environment} from '../../../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-general-statistics',
  templateUrl: './general-statistics.component.html',
  styleUrls: ['./general-statistics.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GeneralStatisticsComponent implements OnInit {
  @ViewChild('canvasDailyCases', {static: true}) canvasDailyCases: ElementRef;
  @ViewChild('canvasGrowthRate', {static: true}) canvasGrowthRate: ElementRef;
  @ViewChild('canvasDistributionBySex', {static: true}) canvasDistributionBySex: ElementRef;
  @ViewChild('canvasFreqByAge', {static: true}) canvasFreqByAge: ElementRef;
  @ViewChild('canvasTrendline', {static: true}) canvasTrendline: ElementRef;
  @ViewChild('mainGrid', {static: true}) mainGrid: ElementRef;
  @HostListener('window:resize', ['$event'])
    onResize(event?) {
    this.isMobile = window.innerWidth < 450;

    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    }

  chartColors : any = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
  }

  list: any[];
  activeChart: any;

  isMobile: boolean = window.innerWidth < 450;

  screenHeight: number;
  screenWidth: number;

  constructor(
      private sharedService: SharedService,
      private sanitizer: DomSanitizer,
      private route: ActivatedRoute,
      private router: Router
    ) {
    this.sharedService.setMeta(
      'Statistici generale',
      'statistici, covid',
      `Corona virus în Europa`
    );

    
  }

  ngOnInit(): void {
    // this.drawCharts1();
    // this.drawCharts2();

    this.list = [
        {
            id: 1,
            title: 'Ziua fata de cazuri cumulative',
            path: 'ziua-fata-de-cazuri-cumulative'
        },
        {
            id: 2,
            title: 'Cazuri pe zile',
            path: 'cazuri-pe-zile'
        },
        {
            id: 3,
            title: 'Ziua fata de numarul de cazuri noi / numar de cazuri totale',
            path: 'ziua-fata-de-cazuri-noi-cazuri-totale'
        },
        {
            id: 4,
            title: 'Frecventa pe grupe de varsta',
            path: 'frecventa-grupe-varsta'
        }
    ];

    this.route.queryParams.subscribe(params => {
        let entry = params.chart ? this.list.find(e => e.path === params.chart) : undefined;
  
        if (!entry) entry = this.list[0];
        
        console.log(entry)

        this.activeChart = entry;
        this.updateQueryParams();
      });
  }

  getSafeUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url)
  }

  updateQueryParams(){
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        chart: this.activeChart.path
      },
      queryParamsHandling: 'merge',
      skipLocationChange: true
    });
  }

  onGraphChange(){
    this.updateQueryParams();
  }

  drawCharts1(){
    let self = this;
    let chartAnnotations = [
        {
            id: 'masura-6',
            measureDate: '2020-03-29',
            value: '-1',
            type: 'line',
            mode: 'vertical',
            borderDash: [2, 2],
            scaleID: 'x-axis-0',
            borderColor: 'rgb(204, 102, 255)',
            borderWidth: 4,
            label: {
                backgroundColor: 'rgb(204, 102, 255)',
                position: "top",
                content: "OM 4",
                enabled: true,
                yPadding: 2
            },
            onClick: function(e) {
    
                window.open('http://legislatie.just.ro/Public/DetaliiDocument/224467', '_blank');
            },
            // onMouseover: function(e) {
            //     //e.target.style.cursor = 'pointer';
            // },
            // onMouseout: function(e) {
            //     //e.target.style.cursor = 'default';
            // }
        },
        {
            id: 'masura-5',
            measureDate: '2020-03-24',
            value: '-1',
            type: 'line',
            mode: 'vertical',
            borderDash: [2, 2],
            scaleID: 'x-axis-0',
            borderColor: 'rgba(255, 153, 0,0.8)',
            borderWidth: 4,
            label: {
                backgroundColor: 'rgba(255, 153, 0,0.8)',
                position: "top",
                content: "OM 3",
                enabled: true,
                yPadding: 2
            },
            onClick: function(e) {
    
                window.open('http://legislatie.just.ro/Public/DetaliiDocument/224340', '_blank');
            },
            // onMouseover: function(e) {
            //     //e.target.style.cursor = 'pointer';
            // },
            // onMouseout: function(e) {
            //     //e.target.style.cursor = 'default';
            // }
        },
        {
            id: 'masura-4',
            measureDate: '2020-03-21',
            value: '24',
            type: 'line',
            mode: 'vertical',
            borderDash: [2, 2],
            scaleID: 'x-axis-0',
            borderColor: 'rgba(51,51,153,0.8)',
            borderWidth: 2,
            label: {
                backgroundColor: 'rgba(51,51,153,0.8)',
                position: "top",
                content: "OM 2",
                enabled: true,
                yPadding: 2
            },
            onClick: function(e) {
                window.open('http://legislatie.just.ro/Public/DetaliiDocument/224284', '_blank');
            },
            // onMouseover: function(e) {
            //     //e.target.style.cursor = 'pointer';
            // },
            // onMouseout: function(e) {
            //     //e.target.style.cursor = 'default';
            // }
        },
        {
            id: 'masura-3',
            measureDate: '2020-03-17',
            value: '20',
            type: 'line',
            mode: 'vertical',
            borderDash: [2, 2],
            scaleID: 'x-axis-0',
            borderColor: 'rgb(102, 153, 153)',
            borderWidth: 2,
            label: {
                backgroundColor: 'rgb(102, 153, 153)',
                position: "top",
                content: "OM 1",
                enabled: true,
                yPadding: 2,
                yAdjust: 20
            },
            onClick: function(e) {
                window.open('http://legislatie.just.ro/Public/DetaliiDocument/223888', '_blank');
            },
            // onMouseover: function(e) {
            //     //e.target.style.cursor = 'pointer';
            // },
            // onMouseout: function(e) {
            //     //e.target.style.cursor = 'default';
            // }
        },
        {
            id: 'masura-2',
            measureDate: '2020-03-16',
            value: '19',
            type: 'line',
            mode: 'vertical',
            borderDash: [2, 2],
            scaleID: 'x-axis-0',
            borderColor: 'black',
            borderWidth: 2,
            label: {
                backgroundColor: 'rgba(0,0,0,0.8)',
                position: "top",
                content: "Stare de Urgenta",
                enabled: true,
                yPadding: 2
            },
            onClick: function(e) {
                window.open('https://www.presidency.ro/ro/media/decret-semnat-de-presedintele-romaniei-domnul-klaus-iohannis-privind-instituirea-starii-de-urgenta-pe-teritoriul-romaniei', '_blank');
            },
            // onMouseover: function(e, el) {
            //     //e.target.style.cursor = 'pointer';
            // },
            // onMouseout: function(e, el) {
            //     //e.target.style.cursor = 'default';
            // }
        },
        {
            id: 'masura-1',
            measureDate: '2020-03-11',
            value: '14',
            type: 'line',
            mode: 'vertical',
            borderDash: [2, 2],
            scaleID: 'x-axis-0',
            borderColor: 'green',
            borderWidth: 2,
            label: {
                backgroundColor: 'green',
                position: "top",
                content: "Inchidere Scoli/Gradinite",
                enabled: true,
                yPadding: 2
            },
        }
      ];

    let configDailyCases = {
      type: 'line',
			data: {
				//labels: [],
				datasets: [{
					label: 'Cazuri unice',
					backgroundColor: this.chartColors.blue,
					borderColor: this.chartColors.blue,
					data: [],
					fill: false
				}]
			},
			options: {
				responsive: true,
				title: {
					display: true,
                    text: 'Cazuri pe zile',
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
                  format: 'YYYY-MM-DD',
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
							labelString: 'Cazuri'
						}
					}]
				}
			}
    };

    let configTrendline = {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Cazuri confirmate',
                    backgroundColor: 'rgb(255, 205, 86)',
                    borderColor: 'rgb(255, 205, 86)',
                    data: [],
                    fill: false,
                    //showLine: false,
                    borderWidth: 3,
                },
                {
                    label: 'Cazuri active',
                    backgroundColor: 'rgb(0, 102, 204)',
                    borderColor: 'rgb(0, 102, 204)',
                    data: [],
                    fill: false,
                    //showLine: false,
                    borderWidth: 2,
                },
                {
                    label: 'Decese',
                    backgroundColor: 'rgb(0, 0, 0)',
                    borderColor: 'rgb(0, 0, 0)',
                    data: [],
                    fill: false,
                    //showLine: false,
                    borderWidth: 2,
                },
                {
                    label: 'Vindecați',
                    backgroundColor: 'rgb(0, 204, 102)',
                    borderColor: 'rgb(0, 204, 102)',
                    data: [],
                    fill: false,
                    //showLine: false,
                    borderWidth: 2,
                }
            ]
        },
        options: {
            responsive: true,
            aspectRatio: 1,
            legend: {
                onHover: function(e) {
                    e.target.style.cursor = 'pointer';
                },
                onLeave: function(e) {
                    e.target.style.cursor = 'default';
                }
            },
            title: {
                display: true,
                text: 'Ziua față de cazuri cumulative',
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
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Ziua',
                        beginAtZero: false
                    }
                }],
                yAxes: [
                    {
                        display: true,
                        type: 'logarithmic',
                        scaleLabel: {
                            display: true,
                            labelString: 'Cumulativ',
                            beginAtZero: false
                        },
                        ticks: {
                            callback: function (value, index, values) {
                                return value;
                            },
                            min: 0
                        },
                        afterBuildTicks: function(chart){
                            var maxTicks = 20;
                            var maxLog = Math.log(chart.ticks[0]);
                            var minLogDensity = maxLog / maxTicks;
                            var ticks = [];
                            var currLog = -Infinity;
                            var tickLst = chart.ticks.reverse();
                            for (var t in tickLst) {
                              var log = Math.max(0, Math.log(tickLst[t]));
                              if (log - currLog > minLogDensity){
                                ticks.push(tickLst[t]);
                                currLog = log;
                              }
                            }
                            chart.ticks = ticks;
                        }
                    },
                    /*
                    {
                        display: true,
                        position: 'left',
                        id: 'growth',
                        scaleLabel: {
                            display: true,
                            labelString: 'Rata de creștere',
                            beginAtZero: false
                        }
                    }
                    */
                ]
            },
            annotation: {
                drawTime: 'beforeDatasetsDraw',
                events: ['click', 'mouseover'],
                annotations: []
            }
        },
        plugins: {
            pluginAnnotation
        }
    };

    let configGrowthRate = {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Rata de creștere',
                    backgroundColor: 'rgb(204, 0, 102)',
                    borderColor: 'rgb(204, 0, 102)',
                    lineTension: 0,
                    data: [],
                    fill: false,
                    pointRadius: 0,
                    yAxisID: 'growth',
                    //showLine: false,
                    borderWidth: 0.5,
                    bezierCurve: false,
                    hidden: false
                }
            ]
        },
        options: {
            maintainAspectRatio: false,
            responsive: true,
            legend: {
                onHover: function(e) {
                    e.target.style.cursor = 'pointer';
                },
                onLeave: function(e) {
                    e.target.style.cursor = 'default';
                }
            },
            title: {
                display: true,
                text: 'Ziua față de numarul de cazuri noi / numarul de cazuri totale',
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
                xAxes: [
                    {
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Ziua',
                            beginAtZero: false
                        }
                    }
                ],
                yAxes: [
                    {
                        display: true,
                        position: 'left',
                        id: 'growth',
                        scaleLabel: {
                            display: true,
                            labelString: 'Rata de creștere',
                            beginAtZero: false
                        }
                    }
                ]
            },
            annotation: {
                drawTime: 'beforeDatasetsDraw',
                events: ['click', 'mouseover'],
                annotations: []
            }
        },
        plugins: {
            pluginAnnotation
        }
    };

    $.getJSON({
        url: environment.apiUrl + '/dashboard/getDailyCaseReport',
        success: function(data) {
            let _data = data.data.data;
            let _datasets = [];
            let _trendline = { x: [], y: [], pairs: [], dates: [], active: [], dead: [], healed: [], annotations: $.extend(true, [], chartAnnotations) };
            let _growthrate = { x: [], y: [], annotations: $.extend(true, [], chartAnnotations) }
            let d = new Date();
            let h = d.getHours();
            let dl = 0;
            if (h >= 13 || _data[_data.length-1]['new_case_no'] > 0) {
                dl = _data.length;
            } else {
                dl = _data.length - 1;
            }
            var ctgr = 0;
            for (let i=0; i<dl; i++) {
                if (i > 10) {
                    _growthrate.y.push((_data[i]['total_case']-_data[i-1]['total_case'])/_data[i]['total_case']);
                    _growthrate.x.push(_data[i]['day_case'])
                    for (var e in _growthrate.annotations) {
                        if (_growthrate.annotations[e].measureDate == _data[i]['day_case']) {
                            _growthrate.annotations[e].value = ctgr.toString();
                        }
                    }
                    ctgr += 1;
                }
                _datasets.push({x: _data[i]['day_case'], y: _data[i]['new_case_no']});
                _trendline.x.push(_data[i]['day_no']);
                _trendline.y.push(_data[i]['total_case']);
                _trendline.active.push(_data[i]['total_case']-_data[i]['total_healed']-_data[i]['total_dead']);
                _trendline.dead.push(_data[i]['total_dead']);
                _trendline.healed.push(_data[i]['total_healed']);
                _trendline.dates.push(_data[i]['day_case']+' ['+_data[i]['day_no']+']')
                _trendline.pairs.push([_data[i]['day_no'], _data[i]['total_case']]);
                for (var e in _trendline.annotations) {
                    if (_trendline.annotations[e].measureDate == _data[i]['day_case']) {
                        _trendline.annotations[e].value = i.toString();
                    }
                }
            }

            // Cazuri pe zile
            configDailyCases['data']['datasets'][0]['data'] = _datasets;
            let ctxDailyCases = self.canvasDailyCases.nativeElement.getContext('2d');

            if(self.mainGrid.nativeElement.offsetWidth < 550){
                ctxDailyCases.canvas.height = 300;
            }

            let myLine = new Chart(ctxDailyCases, configDailyCases);

            // Ziua fata de cazuri cumulative
            let _ds = [
                {
                    'values': regression.exponential(_trendline.pairs),
                    'function': 'Creștere exponențială (cazuri confirmate)',
                    'visible': true
                },
                {
                    'values': regression.logarithmic(_trendline.pairs),
                    'function': 'Creștere logaritmică',
                    'visible': false
                },
                {
                    'values': regression.linear(_trendline.pairs),
                    'function': 'Creștere liniara',
                    'visible': false
                }
            ]

            let pal = palette('tol-rainbow', _ds.length).map(function(hex){return '#' + hex;});

            let pointsds = [];

            for (var i in _ds) {
                if (_ds[i].visible) {
                    pointsds[i] = [];

                    for (var j in _ds[i].values.points) {
                        pointsds[i].push(_ds[i].values.points[j][1]);
                    }

                    let dss: any = {};
                    dss.label = _ds[i].function + ' [ ' + _ds[i].values.string + ' R^2='+_ds[i].values.r2 + ' ]';
                    dss.backgroundColor = pal[i];
                    dss.data = pointsds[i];
                    dss.fill = false;
                    dss.borderColor = pal[i];
                    dss.borderWidth = 1;
                    dss.pointRadius = 0;

                    configTrendline['data']['datasets'].push(dss);
                }
            }

            configTrendline['data']['labels'] = _trendline.dates;
            configTrendline['data']['datasets'][0]['data'] = _trendline.y;
            configTrendline['data']['datasets'][1]['data'] = _trendline.active;
            configTrendline['data']['datasets'][2]['data'] = _trendline.dead;
            configTrendline['data']['datasets'][3]['data'] = _trendline.healed;
            configTrendline['options']['annotation']['annotations'] = _trendline.annotations;
            var ctxTrendline = self.canvasTrendline.nativeElement.getContext('2d');

            if(self.mainGrid.nativeElement.offsetWidth < 550){
                ctxTrendline.canvas.height = 320;
                ctxTrendline.canvas.width = self.mainGrid.nativeElement.offsetWidth - 10;
            } else {
                ctxTrendline.canvas.height = 700;
                ctxTrendline.canvas.width = self.mainGrid.nativeElement.offsetWidth - 50;
            }
            myLine = new Chart(ctxTrendline, configTrendline);

            configGrowthRate['data']['labels'] = _growthrate.x;
            configGrowthRate['data']['datasets'][0]['data'] = _growthrate.y;
            configGrowthRate['options']['annotation']['annotations'] = _growthrate.annotations;
            var ctxGrowthRate = self.canvasGrowthRate.nativeElement.getContext('2d');
            if(self.mainGrid.nativeElement.offsetWidth < 550){
                ctxGrowthRate.canvas.height = 220;
            }
            myLine = new Chart(ctxGrowthRate, configGrowthRate);

        }
    });
}

  drawCharts2(){
    let self = this;

    // by type intervals
    let _bti = {
        'silent': {
            intervals: {
                'min': 74,
                'max': 150
            },
            count: 0,
            label: 'The Silent Generation'
        },
        'babyboomers': {
            intervals: {
                'min': 55,
                'max': 73,
            },
            count: 0,
            label: 'Baby Boomers'
        },
        'generationx': {
            intervals: {
                'min': 39,
                'max': 54,
            },
            count: 0,
            label: 'Generation X'
        },
        'millennials': {
            intervals: {
                'min': 23,
                'max': 38,
            },
            count: 0,
            label: 'Millennials'
        },
        'generationz': {
            intervals: {
                'min': 10,
                'max': 22,
            },
            count: 0,
            label: 'Generation Z'
        }
    }

    var configFreqByGeneration = {
      type: 'outlabeledPie',
      data: {
          labels: [],
          datasets: [{
              backgroundColor: [self.chartColors.orange, self.chartColors.green, self.chartColors.yellow, self.chartColors.red, self.chartColors.blue ],
              data: []
          }]
      },
      plugins: {
        pluginPiechartOutlabels
      },
      options: {
          zoomOutPercentage: 50,
          responsive: true,
          title: {
            display: true,
            text: 'Frecvența după generație',
            fontSize: 18
          },
          legend: {
            display: false
          },
          display: true,
            elements: {
          },
          plugins: {
              legend: false,
              outlabels: {
                  text: '%l %p',
                  color: 'white',
                  stretch: 45,
                  font: {
                      resizable: true,
                      minSize: 12,
                      maxSize: 18
                  }
              }
          }
      }
    }

    var configDistributionBySex = {
      type: 'doughnut',
      data: {
          labels: ['Feminin', 'Masculin',  'Copii < 18'],
          datasets: [
            {
              backgroundColor: [self.chartColors.red, self.chartColors.blue, self.chartColors.green],
              data: []
            }
          ]
      },
      options: {
          resposive: true,
          title: {
              display: true,
              text: 'Distribuție după gen',
              fontSize: 18
          },
          legend: {
            display: false
          },
          display: true,
        elements: {}
      }
    }

    var configFreqByAge = {
			type: 'bar',
			data: {
				labels: [],
				datasets: [
          {
            label: 'Grupe de vârstă',
            backgroundColor: self.chartColors.blue,
            borderColor: self.chartColors.blue,
            data: [],
            fill: false
          }
        ]
			},
			options: {
				responsive: true,
				title: {
					display: true,
                    text: 'Frecvența pe grupe de vârstă',
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
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Interval Vârstă'
						}
					}],
					yAxes: [{
						//display: true,
						scaleLabel: {
							display: true,
							labelString: 'Frecvența'
						}
					}]
				}
			}
    };

    $.getJSON({
      url: environment.apiUrl + '/dashboard/getCasesByAgeGroup',
        success: function(data) {
            let _data = data.data;
            configFreqByAge.options.title.text += ' ['+_data.timestamp+']';
            for (var e in _data) {
                if (e != 'timestamp') {
                    configFreqByAge.data.datasets[0].data.push(_data[e]);
                    configFreqByAge.data.labels.push(e.replace('g', '').replace('plus', ''));
                }
            }

            /*
            for (var e in Object.keys(_bai)){
                var k = Object.keys(_bai)[e];
                configFreqByAge.data.datasets[0].data.push(_bai[k].count);
                configFreqByAge.data.labels.push(_bai[k].label);
            }
            */

            var ctxFBA = self.canvasFreqByAge.nativeElement.getContext('2d');
            if (self.mainGrid.nativeElement.offsetWidth < 550) {
                ctxFBA.canvas.height = 320;
            }
            let myGraph3 = new Chart(ctxFBA, configFreqByAge);
        }
    });

    $.getJSON({
        url: environment.apiUrl + '/dashboard/getPercentageByGender',
        success: function(data) {
            let _data = data.data;
            configDistributionBySex.options.title.text += ' ['+_data.timestamp+']';
            configDistributionBySex.data.datasets[0].data = [
                (_data['feminin']).toFixed(2),
                (_data['masculin']).toFixed(2),
                (_data['copii']).toFixed(2)
            ];
            var ctxDBS = self.canvasDistributionBySex.nativeElement.getContext('2d');
            if(self.mainGrid.nativeElement.offsetWidth < 550){
              ctxDBS.canvas.height = 220;
              }
            let myGraph1 = new Chart(ctxDBS, configDistributionBySex);
        }
    });

    $.getJSON({
      url: environment.apiUrl + '/statistics/getCaseRelations',
      success: function(data) {
          let _data = data.data.nodes,
          _women = 0,
          _men = 0,
          _total = _data.length,
          myLine;

        for (let i=0; i<_data.length; i++) {
            if (_data[i].properties.gender == 'Bărbat') {
                _men += 1;
            } else {
                _women += 1;
            }
            for (var e in Object.keys(_bti)){
                var _k = Object.keys(_bti)[e];
                if (_data[i].properties.age != null) {
                    if (_data[i].properties.age >= _bti[_k].intervals.min && _data[i].properties.age <= _bti[_k].intervals.max) {
                        _bti[_k].count += 1;
                    }
                }
            }
        }

          for (var e in Object.keys(_bti)){
              var k = Object.keys(_bti)[e];
              configFreqByGeneration.data.datasets[0].data.push(_bti[k].count);
              configFreqByGeneration.data.labels.push(_bti[k].label);
          }

          /*
          var ctxFBG = self.canvasFreqByGeneration.nativeElement.getContext('2d');
          if(self.mainGrid.nativeElement.offsetWidth < 550){
            ctxFBG.canvas.height = 210;
            }
          let myGraph2 = new Chart(ctxFBG, configFreqByGeneration);
          */
        }
  });
  }

}
