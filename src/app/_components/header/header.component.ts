import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
import { AuthenticationService } from 'src/app/_services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  items: MenuItem[];
  currentUser: any = null;

  constructor(
      private AuthSvc: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.AuthSvc.currentUserValue;
  }

  doLogout(ev){
    ev.preventDefault();
    this.AuthSvc.logout().subscribe( res => {
        this.AuthSvc.clearSession();
    })
  }

}
