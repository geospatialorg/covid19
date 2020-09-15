import { Component, HostListener, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dynamics',
  templateUrl: './dynamics.component.html',
  styleUrls: ['./dynamics.component.css']
})
export class DynamicsComponent implements OnInit {
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
          title: 'Tranzacții',
          path: 'tranzactii',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_imobiliare_vanzari.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_imobiliare_vanzari_mobile.html')
      },
      {
          id: 2,
          title: 'Ipoteci',
          path: 'ipoteci',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_imobiliare_ipoteci.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_imobiliare_ipoteci_mobile.html')
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
