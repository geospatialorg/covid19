import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import * as d3 from 'd3';
import { environment as appConfig } from '../../../../../environments/environment';
import { StatisticsService } from '../../../../services';
import {SharedService} from '../../../../services/shared.service';

@Component({
  selector: 'app-relation-cases',
  templateUrl: './relation-cases.component.html',
  styleUrls: ['./relation-cases.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RelationCasesComponent implements OnInit {
  jsonPath: string = "";
  svg: any;

  constructor(private StatisticsSvc: StatisticsService, private sharedService: SharedService) {
    this.sharedService.setMeta(
      'Relationare cazuri',
      'relationare, cazuri',
      `Relationare cazuri`
    );
  }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.

    // this.initGraph();
  }

  getData(){
    return this.StatisticsSvc.getCaseRelations().toPromise().then( res => {
        if(res && res.data) {

            return res.data;
        }
        return [];
    });
  }

  changeView = (graph, types, width, height, tooltip_div) => {
    const tooltipHTML = (d) => {
      return "<b>Cazul " + d.properties.case_no + "</b><br />" +
          (d.properties.gender === 'Bărbat' ? "Bărbat, " : "Femeie, ") +
          (d.properties.age != null ? d.properties.age + "," : "") +
          " din  " + d.properties.county + ".<br />" +
          "Status: " + (d.properties.status === "Vindecat" ? "vindecat" : "spitalizat") + ".<br />" +
          (d.properties.healing_date !== null ? ("Data recuperării: " + d.properties.healing_date + ".<br />") : "") +
          (d.properties.reference !== null && d.properties.reference !== "" ? ("Detalii: " + '<a href="' + d.properties.reference + '" target= "_blank">aici</a>') : "");
  };



    const highlight = (d) => {
      let left = d3.event.pageX -20;
      let top = d3.event.pageY + 20;

      if(window.innerWidth - left < 150){
        left = d3.event.pageX - 80;
      }

        tooltip_div.transition()
            .duration(200)
            .style("opacity", .9);

        tooltip_div.html(tooltipHTML(d))
            .style("left", left + 'px')
            .style("top", top + 'px')
            .style("display", null);

    };

    types = Array.from(new Set(graph.nodes.map(d => d.source)));
    const color = d3.scaleOrdinal(d3.schemePaired).domain(types);

    // graph.nodes.shift();
    const links = graph.links;
    const nodes = graph.nodes;

    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id( d => {
          let name = JSON.parse(JSON.stringify(d)).name;

          return name;
        }))
        .force("charge", d3.forceManyBody().strength(-300))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force('collision', d3.forceCollide().radius(function(d: any) {
            return d.radius
        }))
        .force("x", d3.forceX())
        .force("y", d3.forceY());

    // Per-type markers, as they don't inherit styles.
    this.svg.append("defs").selectAll("marker")
      .data(types)
            .join("marker")
                .attr("id", d => `arrow-${d}`)
                .attr("viewBox", "0 -5 10 10")
                .attr("refX", 15)
                .attr("refY", -0.5)
                .attr("markerWidth", 6)
                .attr("markerHeight", 6)
                .attr("orient", "auto")
            .append("path")
                .attr("fill", color)
                .attr("fill", "#999")
                .attr("d", "M0,-5L10,0L0,5");

    const link = this.svg.append("g")
            .attr("fill", "none")
            .attr("stroke-width", 1.5)
            .selectAll("path")
            .data(links)
            .join("path")
                .attr("stroke", d => "#999")
                .attr("marker-end", d => {
                  return `url(${new URL(`#arrow-${d.type}`, location.toString())})`
                });

    const drag = simulation => {

        function dragstarted(d) {
            if (!d3.event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }

        function dragended(d) {
            if (!d3.event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }

        return d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended);
    };

    const node = this.svg.append("g")
        .attr("stroke-linecap", "round")
        .attr("stroke-linejoin", "round")
        .selectAll("g")
        .data(nodes)
        .join("g")
            .call(drag(simulation));

    node.append("circle")
        .attr("stroke", "white")
        .attr("stroke-width", 1.5)
        .attr("r", 8)
        .attr("fill", function(d) {return d.parent ? color(d.parent.properties.county) : color(d.properties.county); })
        .attr("stroke", function(d) { return d.properties.status === "Vindecat" ? 'green' : '#333'; })
        .on("mouseenter", d => highlight(d))
        // .on("mouseleave", (d) => {
        //   unHighlight();
        // });

    node.append("text")
            .attr("x", 8)
            .attr("y", "0.31em")
            .text(d => { return "#" + d.name + ((d.properties.country_of_infection != null  && d.properties.country_of_infection != "România") ? (" <- " + d.properties.country_of_infection) : ""); })
            .clone(true).lower()
            .attr("fill", "none")
            .attr("stroke", "white")
            .attr("stroke-width", 3);

    simulation.on("tick", () => {
        link.attr("d", linkArc);
        node.attr("transform", d => `translate(${d.x},${d.y})`);
    });

    function linkArc(d) {
        const r = Math.hypot(d.target.x - d.source.x, d.target.y - d.source.y);
        return `
          M${d.source.x},${d.source.y}
          A${r},${r} 0 0,1 ${d.target.x},${d.target.y}
        `;
    };

}

  async initGraph(){

    const margin = {top: 20, right: 20, bottom: 20, left: 20},
    width = 800 - margin.left - margin.right,
    height = 770 - margin.top - margin.bottom,
    svg_width = width + margin.left + margin.right,
    svg_height = height + margin.top + margin.bottom;

    let data = await this.getData();

    const graph = { nodes : [], links: [] };

    graph.nodes = data.nodes;
    graph.links = data.links;

    // use a tooltip to show info per county, simultaneous in all charts
    const tooltip_div = d3.select("#chart")
        .append("tooltip_div")
        .attr("class", "tooltip")
        .style("opacity", 0)
        .style("display", "none");

        const unHighlight = () => {
          tooltip_div.transition()
              .duration(200)
              .style("opacity", 0);
      };

    this.svg = d3.select("#chart")
      .append("svg")
      .attr("class", "chart-group")
      .attr("preserveAspectRatio", "xMidYMid")
      .attr("width", svg_width)
      .attr("height", svg_height)
      .attr("viewBox", '0, 0 ' + svg_width + ' ' + svg_height)
      .on("click", () => { unHighlight(); })
          .append("g")
              .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

    this.changeView(graph, null, width, height, tooltip_div);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
  }

}
