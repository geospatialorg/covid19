import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  loginFormHasErrors: boolean;
  loginFormErrors: any;
  invalidLoginMessage: string;

  constructor(
    private authSvc: AuthenticationService,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  doLogin() {
    this.loginFormHasErrors = false;

    this.loginFormErrors = {
      noPassword: !this.password
    };

    if(this.loginFormErrors.noPassword){
      this.loginFormHasErrors = true;
      return false;
    }

    // de pus in functiune cand se modifica in baza de date
    let pass = CryptoJS.SHA256(this.password).toString(CryptoJS.enc.Hex);

    this.authSvc.login(this.username, pass).subscribe(async (res) => {
      if(!res.success){
        this.loginFormErrors.invalidLogin = true;
        this.loginFormHasErrors = true;
        this.invalidLoginMessage = res.message;
        this.password = '';
        return;
      }


      this.router.navigate(['/administration']);
    });
  }

}
