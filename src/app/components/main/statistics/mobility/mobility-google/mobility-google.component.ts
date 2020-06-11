import { Component, OnInit, HostListener } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mobility-google',
  templateUrl: './mobility-google.component.html',
  styleUrls: ['./mobility-google.component.css']
})
export class MobilityGoogleComponent implements OnInit {
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
            src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-romania-desktop.html'),
            src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-romania-mobile.html')
        },
        {
            id: 2,
            title: 'Județe: piețe alimentare și farmacii',
            path: 'judete-piete-alimentare-farmacii',
            src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-piete-desktop.html'),
            src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-piete-mobile.html')
        },
        {
            id: 3,
            title: 'Județe: parcuri',
            path: 'judete-parcuri',
            src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-parcuri-desktop.html'),
            src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-parcuri-mobile.html')
        },
        {
          id: 4,
          title: 'Județe: stații transport local',
          path: 'judete-statii-transport-local',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-statii-desktop.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-statii-mobile.html')
        },
        {
          id: 5,
          title: 'Județe: retail',
          path: 'judete-statii-transport-local',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-retail-desktop.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-retail-mobile.html')
        },
        {
          id: 6,
          title: 'Județe: locul de muncă',
          path: 'judete-locuri-munca',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-munca-desktop.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-munca-mobile.html')
        },
        {
          id: 7,
          title: 'Alba',
          path: 'alba',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-alba-desktop.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-alba-mobile.html')
        },
        {
          id: 8,
          title: 'Arad',
          path: 'arad',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-arad-desktop.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-arad-mobile.html')
        },
        {
          id: 9,
          title: 'Argeș',
          path: 'arges',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-arges-desktop.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-arges-mobile.html')
        },
        {
          id: 10,
          title: 'Bacău',
          path: 'bacau',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-bacau-desktop.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-bacau-mobile.html')
        },
        {
          id: 11,
          title: 'Bihor',
          path: 'bihor',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-bihor-desktop.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-bihor-mobile.html')
        },
        {
          id: 12,
          title: 'Bistrița-Năsăud',
          path: 'bistrita-nasaud',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-bistrita_nasaud-desktop.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-bistrita_nasaud-mobile.html')
        },
        {
          id: 13,
          title: 'Botoșani',
          path: 'botosani',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-botosani-desktop.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-botosani-mobile.html')
        },
        {
          id: 14,
          title: 'Brașov',
          path: 'brasov',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-braila-desktop.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-braila-mobile.html')
        },
        {
          id: 15,
          title: 'Brăila',
          path: 'braila',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-brasov-desktop.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-brasov-mobile.html')
        },
        {
          id: 16,
          title: 'București',
          path: 'bucuresti',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-bucharest-desktop.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-bucharest-mobile.html')
        },
        {
          id: 17,
          title: 'Buzău',
          path: 'buzau',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-buzau-desktop.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-buzau-mobile.html')
        },
        {
          id: 18,
          title: 'Caraș-Severin',
          path: 'caras-severin',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-calarasi-desktop.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-calarasi-mobile.html')
        },
        {
          id: 19,
          title: 'Călărași',
          path: 'calarasi',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-caras_severin-desktop.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-caras_severin-mobile.html')
        },
        {
          id: 20,
          title: 'Cluj',
          path: 'cluj',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-cluj-desktop.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-cluj-mobile.html')
        },
        {
          id: 21,
          title: 'Constanța',
          path: 'constanta',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-constanta-desktop.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-constanta-mobile.html')
        },
        {
          id: 22,
          title: 'Covasna',
          path: 'covasna',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-covasna-desktop.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-covasna-mobile.html')
        },
        {
          id: 23,
          title: 'Dâmbovița',
          path: 'dambovita',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-dambovita-desktop.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-dambovita-mobile.html')
        },
        {
          id: 24,
          title: 'Dolj',
          path: 'dolj',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-dolj-desktop.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-dolj-mobile.html')
        },
        {
          id: 25,
          title: 'Galați',
          path: 'galati',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-galati-desktop.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-galati-mobile.html')
        },
        {
          id: 26,
          title: 'Giurgiu',
          path: 'giurgiu',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-giurgiu-desktop.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-giurgiu-mobile.html')
        },
        {
          id: 27,
          title: 'Gorj',
          path: 'gorj',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-gorj-desktop.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-gorj-mobile.html')
        },
        {
          id: 28,
          title: 'Harghita',
          path: 'harghita',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-harghita-desktop.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-harghita-mobile.html')
        },
        {
          id: 29,
          title: 'Hunedoara',
          path: 'hunedoara',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-hunedoara-desktop.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-hunedoara-mobile.html')
        },
        {
          id: 30,
          title: 'Ialomița',
          path: 'ialomita',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-ialomita-desktop.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-ialomita-mobile.html')
        },
        {
          id: 31,
          title: 'Iași',
          path: 'iasi',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-iasi-desktop.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-iasi-mobile.html')
        },
        {
          id: 32,
          title: 'Ilfov',
          path: 'ilfov',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-ilfov-desktop.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-ilfov-mobile.html')
        },
        {
          id: 33,
          title: 'Maramureș',
          path: 'maramures',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-maramures-desktop.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-maramures-mobile.html')
        },
        {
          id: 34,
          title: 'Mehedinți',
          path: 'mehedinti',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-mehedinti-desktop.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-mehedinti-mobile.html')
        },
        {
          id: 35,
          title: 'Mureș',
          path: 'mures',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-mures-desktop.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-mures-mobile.html')
        },
        {
          id: 36,
          title: 'Neamț',
          path: 'neamt',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-neamt-desktop.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-neamt-mobile.html')
        },
        {
          id: 37,
          title: 'Olt',
          path: 'olt',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-olt-desktop.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-olt-mobile.html')
        },
        {
          id: 38,
          title: 'Prahova',
          path: 'prahova',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-prahova-desktop.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-prahova-mobile.html')
        },
        {
          id: 39,
          title: 'Satu Mare',
          path: 'satu-mare',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-salaj-desktop.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-salaj-mobile.html')
        },
        {
          id: 40,
          title: 'Sălaj',
          path: 'salaj',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-satu_mare-desktop.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-satu_mare-mobile.html')
        },
        {
          id: 41,
          title: 'Sibiu',
          path: 'sibiu',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-sibiu-desktop.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-sibiu-mobile.html')
        },
        {
          id: 42,
          title: 'Suceava',
          path: 'suceava',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-suceava-desktop.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-suceava-mobile.html')
        },
        {
          id: 43,
          title: 'Teleorman',
          path: 'teleorman',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-teleorman-desktop.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-teleorman-mobile.html')
        },
        {
          id: 44,
          title: 'Timiș',
          path: 'timis',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-timis-desktop.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-timis-mobile.html')
        },
        {
          id: 45,
          title: 'Tulcea',
          path: 'tulcea',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-tulcea-desktop.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-tulcea-mobile.html')
        },
        {
          id: 46,
          title: 'Vaslui',
          path: 'vaslui',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-vaslui-desktop.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-vaslui-mobile.html')
        },
        {
          id: 47,
          title: 'Vâlcea',
          path: 'valcea',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-valcea-desktop.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-valcea-mobile.html')
        },
        {
          id: 48,
          title: 'Vrancea',
          path: 'vrancea',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-vrancea-desktop.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-mobilitate-google-vrancea-mobile.html')
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
