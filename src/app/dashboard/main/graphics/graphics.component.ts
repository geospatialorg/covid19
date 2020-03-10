import { Component, OnInit } from '@angular/core';
import { AdministrationService } from 'src/app/_services';
import * as d3 from 'd3';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.css']
})
export class GraphicsComponent implements OnInit {
  data: any;

  constructor(
    private AdministrationSvc: AdministrationService
  ) { }


    drawChart(data){
      // draw chart

    }


  ngOnInit(): void {
    this.AdministrationSvc.getGlobalStat().subscribe( res => {
      console.log(res)

    })
  }

}
