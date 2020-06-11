import { Component, OnInit, HostListener } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mobility-apple',
  templateUrl: './mobility-apple.component.html',
  styleUrls: ['./mobility-apple.component.css']
})
export class MobilityAppleComponent implements OnInit {
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
            title: 'România',
            path: 'romania',
            src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-apple-romania-desktop.html'),
            src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-apple-romania-mobile.html')
        },
        {
            id: 2,
            title: 'București',
            path: 'bucuresti',
            src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-apple-bucuresti-desktop.html'),
            src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-apple-bucuresti-mobile.html')
        },
        {
            id: 3,
            title: 'România vs București',
            path: 'romania-vs-bucuresti',
            src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-apple-romania-vs-bucuresti-desktop.html'),
            src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-apple-romania-vs-bucuresti-mobile.html')
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
