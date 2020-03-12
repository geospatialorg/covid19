import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/_services';
import * as d3 from 'd3';
import { environment as appConfig } from '../../../../environments/environment';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.css']
})
export class GraphicsComponent implements OnInit {
  data: any;
  x: any;
  y: any;
  svg: any;

  jsonPath: string = "../assets/statistici_pe_zile.json";
  interval:any = null;
  appConfig:any = appConfig;

  constructor(
    private DashboardSvc: DashboardService
  ) { }

  getData(){
    return this.DashboardSvc.getDailyCaseReport().toPromise().then( res => {
        if(res && res.data && res.data.data) {

            var parseTime = d3.timeParse("%Y-%m-%d");

            // format the data
            res.data.data.forEach(function(d) {
                d.date = parseTime(d.day_case);
                d.date.toLocaleDateString('ro-RO');
                d.total_case = +d.total_case;
            });

            return res.data.data;
        }
        return [];
    });
  }


  ngOnInit(): void {
  }

  changeView = (data, svg, x, y, valueline_total, valueline_dead, valueline_healed, width, margin, height) => {

      // Scale the range of the data
      x.domain(d3.extent(data, function(d: any) { return d.date; }));
      y.domain([0, d3.max(data, function(d: any) { return d.total_case; })]);

      /****************************** Valueline Path ********************************/
      svg.append("path")
          .data([data])
          .attr("class", "line_total")
          .attr("d", valueline_total);

      svg.append("path")
          .data([data])
          .attr("class", "line_healed")
          .attr("d", valueline_healed);

      svg.append("path")
          .data([data])
          .attr("class", "line_dead")
          .attr("d", valueline_dead);
          
      /******************************** Scatterplot ********************************/
      svg.selectAll("dot")
          .data(data)
          .enter().append("circle")
              .attr("r", 5)
              .attr("cx", function(d) { return x(d.date); })
              .attr("cy", function(d) { return y(d.total_case); });

      svg.selectAll("dot")
          .data(data)
          .enter().append("circle")
              .attr("r", 5)
              .attr("cx", function(d) { return d.total_healed !== 0 ? x(d.date) : null; })
              .attr("cy", function(d) { return y(d.total_healed); });

      svg.selectAll("dot")
          .data(data)
          .enter().append("circle")
              .attr("r", 5)
              .attr("cx", function(d) { return d.total_dead !== 0 ? x(d.date) : null; })
              .attr("cy", function(d) { return y(d.total_dead); });

      /******************************** Title ********************************/
      svg.append("text")
          .attr("x", (width / 2))
          .attr("y", 0 - (margin.top))
          .attr("text-anchor", "middle")
          .style("font-size", "24px")
          .style("text-decoration", "underline")
          .text("Cazurile de COVID-19 din România pe zile");

      /******************************** Labels ********************************/
      var xLabel = svg.append("text")
          .attr("y", height + 50)
          .attr("x", width / 2)
          .attr("font-size", "18px")
          .attr("text-anchor", "middle")
          .text("Perioadă de timp");

      var yLabel = svg.append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", -30)
          .attr("x", -170)
          .attr("font-size", "18px")
          .attr("text-anchor", "middle")
          .text("Număr de persoane");

      /******************************** Legend ********************************/
      const statuses = [
        { status: "total", color: "var(--main-confirmate)", label: "Cazuri confirmate"},
        { status: "healed", color: "var(--main-recuperari)", label: "Recuperări" },
        { status: "dead", color: "var(--main-decese)", label: "Decese" }
    ];

      var legend = svg.append("g")
          .attr("transform", "translate(130,0)");

      statuses.forEach(function(elem, i){
          var legendRow = legend.append("g")
              .attr("transform", "translate(20, " + (i * 20) + ")");

          legendRow.append("rect")
              .attr("width", 10)
              .attr("height", 10)
              .attr("fill", elem.color);

          legendRow.append("text")
              .attr("x", -10)
              .attr("y", 10)
              .attr("text-anchor", "end")
              .style("text-transform", "capitalize")
              .text(elem.label);
      });

      /******************************** X Axis ********************************/
      var locale = d3.timeFormatLocale({
          "dateTime": "%A, %e %B %Y г. %X",
          "date": "%d.%m.%Y",
          "time": "%H:%M:%S",
          "periods": ["AM", "PM"],
          "days": ["Luni", "Marți", "Miercuri", "Joi", "Vineri", "Sâmbătă", "Duminică"],
          "shortDays": ["Lu", "Ma", "Mi", "Jo", "Vi", "Sa", "Du"],
          "months": ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"],
          "shortMonths": ["Ian", "Feb", "Mart", "Apr", "Mai", "Iun", "Iul", "Aug", "Sept", "Oct", "Nov", "Dec"]
      });

      const formatMillisecond = locale.format(".%L"),
            formatSecond = locale.format(":%S"),
            formatMinute = locale.format("%I:%M"),
            formatHour = locale.format("%I %p"),
            formatDay = locale.format("%a %d"),
            formatWeek = locale.format("%b %d"),
            formatMonth = locale.format("%B"),
            formatYear = locale.format("%Y");

      function multiFormat(date) {
        return (d3.timeSecond(date) < date ? formatMillisecond
            : d3.timeMinute(date) < date ? formatSecond
            : d3.timeHour(date) < date ? formatMinute
            : d3.timeDay(date) < date ? formatHour
            : d3.timeMonth(date) < date ? (d3.timeWeek(date) < date ? formatDay : formatWeek)
            : d3.timeYear(date) < date ? formatMonth
            : formatYear)(date);
      }

      const xAxis = svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).ticks(5).tickFormat(multiFormat));

        xAxis.selectAll('text').attr("font-weight", "bold");

      // Add the Y Axis
      const yAxis = svg.append("g")
          .call(d3.axisLeft(y).ticks(5));
        
          yAxis.selectAll('text').attr("font-weight", "bold");

      /******************************** Tooltip Code ********************************/

      const focus = svg.append("g")
          .attr("class", "focus")
          .style("display", "none");

      focus.append("line")
          .attr("class", "x-hover-line hover-line")
          .attr("y1", 0)
          .attr("y2", height);

      focus.append("line")
          .attr("class", "y-hover-line hover-line")
          .attr("x1", 0)
          .attr("x2", width);

      focus.append("circle")
          .attr("r", 5.5);

      focus.append("text")
          .attr("x", 0)
          .attr("dy", "-1em");

      svg.append("rect")
          .attr("class", "overlay")
          .attr("width", width)
          .attr("height", height)
          .on("mouseover", function() { focus.style("display", null); tooltip_div.style("display", null); })
          .on("mouseout", function() { focus.style("display", "none"); tooltip_div.style("display", "none"); })
          .on("mousemove", mousemove);

      const bisectDate = d3.bisector(function(d:any) { return d.date; }).left;

      function mousemove() {
        var x0 = x.invert(d3.mouse(this)[0]),
            i = bisectDate(data, x0, 1),
            d0 = data[i - 1],
            d1 = data[i],
            d = x0 - d0.date > d1.date - x0 ? d1 : d0;

          focus.attr("transform", "translate(" + x(d.date) + "," + y(d.total_case) + ")");
          // focus.select("text").html("Ziua " + d.day_no);
          focus.select(".x-hover-line").attr("y2", height - y(d.total_case));
          focus.select(".y-hover-line").attr("x2", -x(d.date));
          highlight(d);
      }

      const tooltip_div = d3.select("body")
          .append("tooltip_div")
          .attr("class", "tooltip")
          .style("position", "absolute")
          .style("display", "none");

      const highlight = (d) => {
          tooltip_div.transition()
              .duration(200)
              .style("opacity", .9);

          tooltip_div.html(tooltipHTML(d))
              .style("left", (d3.event.pageX/1.12) + "px")
              .style("top", (d3.event.pageY/1.1) + "px");
      };

      const tooltipHTML = (d) => {
          const ro_date = d3.timeFormat("%Y-%m-%d")(d.date);
          return "<b>Ziua " + d.day_no + " (" + ro_date + ")</b><br />" +
                  "Cazuri confirmate noi: " + d.new_case_no + "<br />" +
                  "Cazuri confirmate total: " + d.total_case + "<br />" +
                  "Recuperări noi: " + d.new_healed_no + "<br />" +
                  "Recuperări total: " + d.total_healed + "<br />" +
                  "Decese noi: " + d.new_dead_no + "<br />" +
                  "Decese total: " + d.total_dead + "<br />";

  };

      /******************************** Tooltip Code ********************************/

  }

  ngAfterContentInit() {
    this.initChart();
  }

  async initChart(){
    let cases_data = await this.getData();
    let self = this;

    var margin = {top: 20, right: 20, bottom: 20, left: 20},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom,
        svg_width = width + margin.left + margin.right,
        svg_height = height + margin.top + margin.bottom;

    self.x = d3.scaleTime().range([0, width]);
    self.y = d3.scaleLinear().range([height, 0]);

    var valueline_total = d3.line()
      .x(function(d:any) { return self.x(d.date); })
      .y(function(d:any) { return self.y(d.total_case); });

    var valueline_healed = d3.line()
      .x(function(d:any) { return d.total_healed !== 0 ? self.x(d.date) : null; })
      .y(function(d:any) { return self.y(d.total_healed); });
        
    var valueline_dead = d3.line()
      .x(function(d:any) { return d.total_dead !== 0 ? self.x(d.date) : null; })
      .y(function(d: any) { return self.y(d.total_dead); });

    // const promises = [
    //   d3.json(self.jsonPath)
    // ];


    // Promise.all(promises).then( data => {
    //     const cases_data = data[0].data;
    //     console.log(cases_data)

    //     // // parse the date / time
    //     // var parseTime = d3.timeParse("%Y-%m-%d");

    //     // // format the data
    //     // cases_data.forEach(function(d) {
    //     //     d.date = parseTime(d.day_case);
    //     //     d.date.toLocaleDateString('ro-RO');
    //     //     d.total_case = +d.total_case;
    //     // });

    //     // self.changeView(cases_data, self.svg, self.x, self.y, valueline_total, valueline_dead, valueline_healed, width, margin, height);
    // }).catch( 
    //     error => console.log(error)
    // );

    self.svg = d3.select("#chart")
            .append("svg")
            .attr("class", "chart-group")
            .attr("preserveAspectRatio", "xMidYMid")
            .attr("width", svg_width)
            .attr("height", svg_height)       
            .attr('viewBox', '0 0 ' + svg_width + ' ' + svg_height)
                .append("g")
                .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

    self.changeView(cases_data, self.svg, self.x, self.y, valueline_total, valueline_dead, valueline_healed, width, margin, height);

    self.interval = setInterval(async ()=> {
        let cases_data = await this.getData();
        self.svg.selectAll("*").remove();

        self.changeView(cases_data, self.svg, self.x, self.y, valueline_total, valueline_dead, valueline_healed, width, margin, height);
    }, this.appConfig.data_refresh);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if(this.interval) clearInterval(this.interval);
  }

}
