import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-public-interest',
  templateUrl: './public-interest.component.html',
  styleUrls: ['./public-interest.component.css']
})
export class PublicInterestComponent implements OnInit {
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
