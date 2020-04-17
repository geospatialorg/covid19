import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-deaths',
  templateUrl: './deaths.component.html',
  styleUrls: ['./deaths.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DeathsComponent implements OnInit {
  list: any[];
  activeChart: any;

  constructor(
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router,
  ) { 
    this.list = [
      {
        id: 1,
        title: 'Evoluție decese noi pe zile',
        url: this.getSafeUrl('https://docs.google.com/spreadsheets/d/e/2PACX-1vTtAvfu-VWAOiT7CS_Ryrg9DI-Fx1G1eohA9TBCm54h0go06yi5uniY558t8vVFfWMaq7cA3_UkftC8/pubchart?oid=1553327102&amp;format=image'),
        path: 'evolutie-decese-noi-pe-zile',
        width: 1290,
        height: 534
      },
      {
        id: 2,
        title: 'Evoluție decese pe zile',
        url: this.getSafeUrl('https://docs.google.com/spreadsheets/d/e/2PACX-1vTtAvfu-VWAOiT7CS_Ryrg9DI-Fx1G1eohA9TBCm54h0go06yi5uniY558t8vVFfWMaq7cA3_UkftC8/pubchart?oid=1513704494&amp;format=image'),
        path: 'evolutie-decese-pe-zile',
        width: 1302,
        height: 525
      },
      {
        id: 3,
        title: 'Decese înregistrate pe județ',
        url: this.getSafeUrl('https://docs.google.com/spreadsheets/d/e/2PACX-1vTtAvfu-VWAOiT7CS_Ryrg9DI-Fx1G1eohA9TBCm54h0go06yi5uniY558t8vVFfWMaq7cA3_UkftC8/pubchart?oid=1177448773&amp;format=image'),
        path: 'decese-inregistrate-judet',
        width: 862,
        height: 587
      },
      {
        id: 4,
        title: 'Decese înregistrate pe intervale de vârstă',
        url: this.getSafeUrl('https://docs.google.com/spreadsheets/d/e/2PACX-1vTtAvfu-VWAOiT7CS_Ryrg9DI-Fx1G1eohA9TBCm54h0go06yi5uniY558t8vVFfWMaq7cA3_UkftC8/pubchart?oid=643243211&amp;format=image'),
        path: 'evolutie-decese-intervale-varsta',
        width: 746,
        height: 583
      },
      {
        id: 5,
        title: 'Interval timp (zile) de la deces la comunicatul Ministerului Sănătății',
        url: this.getSafeUrl('https://docs.google.com/spreadsheets/d/e/2PACX-1vTtAvfu-VWAOiT7CS_Ryrg9DI-Fx1G1eohA9TBCm54h0go06yi5uniY558t8vVFfWMaq7cA3_UkftC8/pubchart?oid=533453048&amp;format=image'),
        path: 'interval-timp-comunicat-ministerul-sanatatii',
        width: 574,
        height: 436
      },
      {
        id: 6,
        title: 'Decese înregistrate pe gen',
        url: this.getSafeUrl('https://docs.google.com/spreadsheets/d/e/2PACX-1vTtAvfu-VWAOiT7CS_Ryrg9DI-Fx1G1eohA9TBCm54h0go06yi5uniY558t8vVFfWMaq7cA3_UkftC8/pubchart?oid=1864416366&amp;format=image'),
        path: 'decese-inregistrate-pe-gen',
        width: 524,
        height: 436
      },
      {
        id: 7,
        title: 'Decese confirmate post-mortem',
        url: this.getSafeUrl('https://docs.google.com/spreadsheets/d/e/2PACX-1vTtAvfu-VWAOiT7CS_Ryrg9DI-Fx1G1eohA9TBCm54h0go06yi5uniY558t8vVFfWMaq7cA3_UkftC8/pubchart?oid=1233344860&amp;format=image'),
        path: 'decese-confirmate-post-mortem',
        width: 479,
        height: 436
      },
      {
        id: 8,
        title: 'Frecvență decese după generație',
        url: this.getSafeUrl('https://docs.google.com/spreadsheets/d/e/2PACX-1vTtAvfu-VWAOiT7CS_Ryrg9DI-Fx1G1eohA9TBCm54h0go06yi5uniY558t8vVFfWMaq7cA3_UkftC8/pubchart?oid=1032636154&amp;format=image'),
        path: 'frecventa-decese-generatie',
        width: 600,
        height: 436
      },
      {
        id: 9,
        title: 'Cazuri și decese dupa vârstă',
        url: this.getSafeUrl('https://docs.google.com/spreadsheets/d/e/2PACX-1vTtAvfu-VWAOiT7CS_Ryrg9DI-Fx1G1eohA9TBCm54h0go06yi5uniY558t8vVFfWMaq7cA3_UkftC8/pubchart?oid=1563374408&amp;format=image'),
        path: 'cazuri-decese-varsta',
        width: 524,
        height: 1624
      },
      {
        id: 10,
        title: 'Decese/Vârstă și gen',
        url: this.getSafeUrl('https://docs.google.com/spreadsheets/d/e/2PACX-1vTtAvfu-VWAOiT7CS_Ryrg9DI-Fx1G1eohA9TBCm54h0go06yi5uniY558t8vVFfWMaq7cA3_UkftC8/pubchart?oid=1122563301&amp;format=image'),
        path: 'decese-varsta-gen',
        width: 410,
        height: 1180
      },
      {
        id: 11,
        title: 'Decese înregistrate la persoane internate în spital',
        url: this.getSafeUrl('https://docs.google.com/spreadsheets/d/e/2PACX-1vTtAvfu-VWAOiT7CS_Ryrg9DI-Fx1G1eohA9TBCm54h0go06yi5uniY558t8vVFfWMaq7cA3_UkftC8/pubchart?oid=1241073497&amp;format=image'),
        path: 'decese-persoane-internate',
        width: 524,
        height: 436
      },
      {
        id: 12,
        title: 'Perioada Test - Confirmare Covid 19 (zile)',
        url: this.getSafeUrl('https://docs.google.com/spreadsheets/d/e/2PACX-1vTtAvfu-VWAOiT7CS_Ryrg9DI-Fx1G1eohA9TBCm54h0go06yi5uniY558t8vVFfWMaq7cA3_UkftC8/pubchart?oid=238369558&amp;format=image'),
        path: 'decese-test-confirmare-covid',
        width: 574,
        height: 486
      },
      {
        id: 13,
        title: 'Perioada Confirmare Covid 19 - Deces (zile)',
        url: this.getSafeUrl('https://docs.google.com/spreadsheets/d/e/2PACX-1vTtAvfu-VWAOiT7CS_Ryrg9DI-Fx1G1eohA9TBCm54h0go06yi5uniY558t8vVFfWMaq7cA3_UkftC8/pubchart?oid=1775422462&amp;format=image'),
        path: 'decese-perioada-confirmare',
        width: 659,
        height: 589
      }
    ]
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      let entry = params.chart ? this.list.find(e => e.path === params.chart) : undefined;

      if (!entry) entry = this.list[0];

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
