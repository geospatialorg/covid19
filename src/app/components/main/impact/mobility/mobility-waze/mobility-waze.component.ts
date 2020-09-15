import { Component, OnInit, HostListener } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mobility-waze',
  templateUrl: './mobility-waze.component.html',
  styleUrls: ['./mobility-waze.component.css']
})
export class MobilityWazeComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
    onResize(event?) {
    this.isMobile = window.innerWidth < 450;

    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    }
  links: any[];

  activeChart: any;

  isMobile: boolean = window.innerWidth < 450;

  screenHeight: number;
  screenWidth: number;

  constructor(
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.drawCharts1();
    // this.drawCharts2();

    if ( window.location !== window.parent.location ) { 
      this.isMobile = true;
    }

    this.links = [
        {
            id: 1,
            title: 'București',
            path: 'bucuresti',
            src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-waze-bucuresti-desktop.html'),
            src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-waze-bucuresti-mobile.html')
        },
        {
            id: 2,
            title: 'Timișoara',
            path: 'timisoara',
            src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-waze-timisoara-desktop.html'),
            src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-waze-timisoara-mobile.html')
        },
        {
            id: 3,
            title: 'Cluj-Napoca',
            path: 'cluj-napoca',
            src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-waze-cluj-desktop.html'),
            src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-waze-cluj-mobile.html')
        },
        {
            id: 4,
            title: 'Brașov',
            path: 'brasov',
            src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-waze-brasov-desktop.html'),
            src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-waze-brasov-mobile.html')
        },
        {
            id: 5,
            title: 'Constanța',
            path: 'constanta',
            src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-waze-constanta-desktop.html'),
            src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-waze-constanta-mobile.html')
        },
        {
          id: 6,
          title: 'Iași',
          path: 'iasi',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-waze-iasi-desktop.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-waze-iasi-mobile.html')
      }
    ];

    this.route.queryParams.subscribe(params => {
        let entry = params.chart ? this.links.find(e => e.path === params.chart) : undefined;
  
        if (!entry) entry = this.links[0];

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

}
