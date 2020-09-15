import { Component, OnInit, HostListener } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mobility-air-traffic',
  templateUrl: './mobility-air-traffic.component.html',
  styleUrls: ['./mobility-air-traffic.component.css']
})
export class MobilityAirTrafficComponent implements OnInit {
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
            title: 'Pasageri București',
            path: 'pasageri-bucuresti',
            src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_mobilitate_aeroport_bucuresti_pasageri.html'),
            src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_mobilitate_aeroport_bucuresti_pasageri_mobile.html')
        },
        {
            id: 2,
            title: 'Aeronave București',
            path: 'aeronave-bucuresti',
            src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_mobilitate_aeroport_bucuresti_aeronave.html'),
            src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_mobilitate_aeroport_bucuresti_aeronave_mobile.html')
        },
        {
            id: 3,
            title: 'Cargo București',
            path: 'cargo-bucuresti',
            src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_mobilitate_aeroport_bucuresti_cargo.html'),
            src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_mobilitate_aeroport_bucuresti_cargo_mobile.html')
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
