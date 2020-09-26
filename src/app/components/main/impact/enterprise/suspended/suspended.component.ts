import { Component, HostListener, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-suspended',
  templateUrl: './suspended.component.html',
  styleUrls: ['./suspended.component.css']
})
export class SuspendedComponent implements OnInit {

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
          title: 'Total',
          path: 'total',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_intreprinderi_suspendari_total.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_intreprinderi_suspendari_total_mobile.html')
      },
      {
        
          id: 2,
          title: 'Învățământ',
          path: 'invatamant',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_intreprinderi_suspendari_invatamant.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_intreprinderi_suspendari_invatamant_mobile.html')
      },
      {
        
          id: 3,
          title: 'Tranzacții imobiliare',
          path: 'tranzactii-imobiliare',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_intreprinderi_suspendari_imobiliare.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_intreprinderi_suspendari_imobiliare_mobile.html')
      },
      {
        
          id: 4,
          title: 'Sănătate și asistență socială',
          path: 'sanatate-asistenta-sociala',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_intreprinderi_suspendari_sanatate.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_intreprinderi_suspendari_sanatate_mobile.html')
      },
      {
        
          id: 5,
          title: 'Informații și comunicații',
          path: 'informatii-comunicatii',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_intreprinderi_suspendari_informatii_comunicatii.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_intreprinderi_suspendari_informatii_comunicatii_mobile.html')
      },
      {
        
          id: 6,
          title: 'Industria prelucrătoare',
          path: 'industrie-prelucatoare',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_intreprinderi_suspendari_industria_prelucratoare.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_intreprinderi_suspendari_industria_prelucratoare_mobile.html')
      },
      {
        
          id: 7,
          title: 'Hoteluri și restaurante',
          path: 'hoteluri-restaurante',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_intreprinderi_suspendari_hoteluri_restaurante.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_intreprinderi_suspendari_hoteluri_restaurante_mobilehtml')
      },
      {
        
          id: 8,
          title: 'Construcții',
          path: 'constructii',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_intreprinderi_suspendari_constructii.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_intreprinderi_suspendari_constructii_mobile.html')
      },
      {
        
          id: 9,
          title: 'Comerț cu ridicata și cu amănuntul',
          path: 'comert-ridicata-amanuntul',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_intreprinderi_suspendari_comert.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_intreprinderi_suspendari_comert_mobile.html')
      },
      {
        
          id: 10,
          title: 'Activități de spectacole, culturale și recreative',
          path: 'spectacole-culturale-recreative',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_intreprinderi_suspendari_cultura.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_intreprinderi_suspendari_cultura_mobile.html')
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
