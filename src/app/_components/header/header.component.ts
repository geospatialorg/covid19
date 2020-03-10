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

    console.log(this.currentUser)
  }

  doLogout(ev){
    console.log(11)
    ev.preventDefault();
    this.AuthSvc.logout().subscribe( res => {
        console.log(res)
        this.AuthSvc.clearSession();
    })
  }

}
