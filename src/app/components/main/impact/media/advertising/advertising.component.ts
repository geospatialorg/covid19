import { Component, HostListener, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-advertising',
  templateUrl: './advertising.component.html',
  styleUrls: ['./advertising.component.css']
})
export class AdvertisingComponent implements OnInit {
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
    if ( window.location !== window.parent.location ) { 
      this.isMobile = true;
    }

    this.links = [
        {
            id: 1,
            title: 'Online',
            path: 'online',
            src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_media_publicitate_online.html'),
            src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_media_publicitate_online_mobile.html')
        },
        {
            id: 2,
            title: 'OOH',
            path: 'ooh',
            src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_media_publicitate_ooh.html'),
            src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_media_publicitate_ooh_mobile.html')
        },
        {
            id: 3,
            title: 'Presa scrisă',
            path: 'presa-scrisa',
            src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_media_publicitate_print.html'),
            src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_media_publicitate_print_mobile.html')
        },
        {
            id: 4,
            title: 'Radio',
            path: 'radio',
            src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_media_publicitate_radio.html'),
            src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_media_publicitate_radio_mobile.html')
        },
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
