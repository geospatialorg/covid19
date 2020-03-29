import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {SharedService} from '../../../services/shared.service';

@Component({
  selector: 'app-manifest',
  templateUrl: './manifest.component.html',
  styleUrls: ['./manifest.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ManifestComponent implements OnInit {

  constructor(private sharedService: SharedService) {
    this.sharedService.setMeta(
      'Manifest',
      'manifest, covid, românia',
      `Asociația geo-spatial.org solicită autorităților
      să ofere public o prezentare completă, structurată a
      tuturor cazurilor oficiale (confirmate, vindecări, decese) actualizată cât mai des posibil,
       pentru a disemina aceste informații vitale și a evita apariția informațiilor
       false, potențial alarmiste.`
    );
  }

  ngOnInit(): void {
  }

}
