import { Component, HostListener, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-indicators',
  templateUrl: './indicators.component.html',
  styleUrls: ['./indicators.component.css']
})
export class IndicatorsComponent implements OnInit {
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
          title: 'Producția industrială (IPI)',
          path: 'ipi',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_economie_indici_preturi_ipi.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_economie_indici_preturi_ipi_mobile.html')
      },
      {
          id: 2,
          title: 'Prețurile producției industriale (IPPI)',
          path: 'ippi',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_economie_indici_preturi_ippi.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_economie_indici_preturi_ippi_mobile.html')
      },
      {
          id: 3,
          title: 'Prețurile de consum (IPC)',
          path: 'ipc',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_economie_indici_preturi_ipc.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_economie_indici_preturi_ipc_mobile.html')
      },
      {
        
          id: 4,
          title: 'Indicii valorici ai cifrei de afaceri din industrie',
          path: 'indici-cifra-afacere-industrie',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_economie_indici_preturi_ica.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_economie_indici_preturi_ica_mobile.html')
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
