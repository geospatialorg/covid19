import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  jsonPath: string = "https://alexaac.github.io/covid-19-ro/cases_per_day/cazuri.json";

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
    
    // const color = d3.scale.category20c();
    // const graph = { nodes: [], links: [] }, dummy = [];

    // d3.json(this., function(error, json) {
    //     if (error) throw error;
    
    //     let data = json.data;

    //     data.forEach(function(d) {
    
    //         dummy.push({
    //             "source": d.source_no || d.case_no,
    //             "target": d.case_no,
    //             "properties": d
    //         });
                  
    //     });
    
    //     update();
    // });

  }

  
}
