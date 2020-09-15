import { Component, HostListener, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-commerce',
  templateUrl: './commerce.component.html',
  styleUrls: ['./commerce.component.css']
})
export class CommerceComponent implements OnInit {
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
          title: 'Cifra de afaceri - comerț cu amănuntul',
          path: 'cifra-afaceri-comert-amanuntul',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_economie_comert_servicii_cifra_amanuntul.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_economie_comert_servicii_cifra_amanuntul_mobile.html')
      },
      {
          id: 2,
          title: 'Cifra de afaceri - comerț cu ridicata',
          path: 'cifra-afaceri-comert-ridicata',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_economie_comert_servicii_cifra_ridicata.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_economie_comert_servicii_cifra_ridicata_mobile.html')
      },
      {
          id: 3,
          title: 'Cifra de afaceri - serviciile de piață prestate întreprinderilor',
          path: 'cifra-afaceri-servicii-piata-prestate-intreprinderi',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_economie_comert_servicii_cifra_servicii_prestate_intreprinderi.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_economie_comert_servicii_cifra_servicii_prestate_intreprinderi_mobile.html')
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
