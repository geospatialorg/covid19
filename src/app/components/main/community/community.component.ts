import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit {
  pageData: any = null;

  constructor(
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    fetch('assets/community.json').then((response) => response.json()).then((json) => {
      this.pageData = this.domSanitizer.bypassSecurityTrustHtml(json.html);
    });
  }

}
