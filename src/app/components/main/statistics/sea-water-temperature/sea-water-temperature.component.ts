import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-sea-water-temperature',
  templateUrl: './sea-water-temperature.component.html',
  styleUrls: ['./sea-water-temperature.component.css']
})
export class SeaWaterTemperatureComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
    onResize(event?) {
    this.isMobile = window.innerWidth < 450;

    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
  }

    
  isMobile: boolean = window.innerWidth < 450;

  screenHeight: number;
  screenWidth: number;
  
  constructor() { }

  ngOnInit(): void {
  }

}
