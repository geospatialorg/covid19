import { Component, HostListener, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-statistics112',
  templateUrl: './statistics112.component.html',
  styleUrls: ['./statistics112.component.css']
})
export class Statistics112Component implements OnInit {

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
            title: 'Total apeluri',
            path: 'total-apeluri',
            src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_comunicatii_112_total.html'),
            src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_comunicatii_112_total_mobile.html')
        },
        {
            id: 2,
            title: 'Total apeluri non-urgente',
            path: 'total-apeluri-non-urgente',
            src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_comunicatii_112_non_urgente.html'),
            src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_comunicatii_112_non_urgente_mobile.html')
        },
        {
            id: 3,
            title: 'Total apeluri de urgență',
            path: 'total-apeluri-urgente',
            src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_comunicatii_112_urgente.html'),
            src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_comunicatii_112_urgente_mobile.html')
        },
        {
            id: 4,
            title: 'Total apeluri Poliție',
            path: 'total-apeluri-politie',
            src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_comunicatii_112_politie.html'),
            src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_comunicatii_112_politie_mobile.html')
        },
        {
            id: 5,
            title: 'Total apeluri Ambulanță',
            path: 'total-apeluri-ambulanta',
            src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_comunicatii_112_ambulanta.html'),
            src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_comunicatii_112_ambulanta_mobile.html')
        },
        {
            id: 6,
            title: 'Total apeluri Total apeluri ISU + SMURD',
            path: 'total-apeluri-isu-smurd',
            src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_comunicatii_112_isu_smurd.html'),
            src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_comunicatii_112_isu_smurd_mobile.html')
        },
        {
            id: 7,
            title: 'Total apeluri Jandarmerie',
            path: 'total-apeluri-jandarmerie',
            src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_comunicatii_112_jandarmi.html'),
            src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_comunicatii_112_jandarmi_mobile.html')
        },
        {
            id: 8,
            title: 'Total apeluri alte agenții',
            path: 'total-apeluri-alte-agentii',
            src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_comunicatii_112_alte_agentii.html'),
            src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_comunicatii_112_alte_agentii.html')
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
