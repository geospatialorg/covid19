import { Component, HostListener, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-fuel-price',
  templateUrl: './fuel-price.component.html',
  styleUrls: ['./fuel-price.component.css']
})
export class FuelPriceComponent implements OnInit {
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
          title: 'Benzină standard',
          path: 'benzina-standard',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_auto_pret_benzina_standard.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_auto_pret_benzina_standard_mobile.html')
      },
      {
          id: 2,
          title: 'Benzină premium',
          path: 'benzina-premium',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_auto_pret_benzina_premium.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_auto_pret_benzina_premium_mobile.html')
      },
      {
          id: 3,
          title: 'Motorină standard',
          path: 'motorina-standard',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_auto_pret_motorina_standard.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_auto_pret_motorina_standard_mobile.html')
      },
      {
          id: 4,
          title: 'Motorină premium',
          path: 'motorina-premium',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_auto_pret_motorina_premium.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_auto_pret_motorina_premium_mobile.html')
      },
      {
          id: 5,
          title: 'GPL',
          path: 'gpl',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_auto_pret_gpl.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_auto_pret_gpl_mobile.html')
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
