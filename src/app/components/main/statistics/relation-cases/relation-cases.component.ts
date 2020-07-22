import { Component, OnInit, ViewEncapsulation, HostListener } from '@angular/core';

import * as d3 from 'd3';
import { environment as appConfig } from '../../../../../environments/environment';
import { StatisticsService } from '../../../../services';
import {SharedService} from '../../../../services/shared.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-relation-cases',
  templateUrl: './relation-cases.component.html',
  styleUrls: ['./relation-cases.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RelationCasesComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
    onResize(event?) {
    this.isMobile = window.innerWidth < 450;

    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    }

  isMobile: boolean = window.innerWidth < 450;

  screenHeight: number;
  screenWidth: number;

  list: any[];
  activeChart: any;
  
  constructor(
    private StatisticsSvc: StatisticsService, 
    private sharedService: SharedService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService
  ) {
    this.sharedService.setMeta(
      'Relationare cazuri',
      'relationare, cazuri',
      `Relationare cazuri`
    );
  }

  ngOnInit(): void {
    this.translateValues();

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
        this.translateValues();
    });

    this.route.queryParams.subscribe(params => {
        let entry = params.chart ? this.list.find(e => e.path === params.chart) : undefined;
  
        if (!entry) entry = this.list[0];

        this.activeChart = entry;
        this.updateQueryParams();
      });
  }

  translateValues(){
    this.list = [
        {
            id: 1,
            title: this.translate.instant('statistics.Relations'),
            path: 'covid-19-ro-cases-relations',
            url: this.getSafeUrl('https://alexaac.github.io/covid-19-ro-cases-relations/'),
            mobile_url: this.getSafeUrl('https://alexaac.github.io/covid-19-ro-cases-relations/')
        },
        {
            id: 2,
            title: this.translate.instant('statistics.Timeline'),
            path: 'covid-19-ro-cases-timeline',
            url: this.getSafeUrl('https://alexaac.github.io/covid-19-ro-cases-timeline/'),
            mobile_url: this.getSafeUrl('https://alexaac.github.io/covid-19-ro-cases-timeline/')
        },
        {
            id: 3,
            title: this.translate.instant('statistics.Pack'),
            path: 'covid-19-ro-cases-pack',
            url: this.getSafeUrl('https://alexaac.github.io/covid-19-ro-cases-pack/'),
            mobile_url: this.getSafeUrl('https://alexaac.github.io/covid-19-ro-cases-pack/')
        }
    ];

    this.route.queryParams.subscribe(params => {
      let entry = params.chart ? this.list.find(e => e.path === params.chart) : undefined;

      if (!entry) entry = this.list[0];

      this.activeChart = entry;
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

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
  }

}
