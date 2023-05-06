import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  passwordType: boolean = true;
  newUser: boolean = true;

  constructor() { }

  ngOnInit() {
  }

  changePasswordType() {
    this.passwordType = !this.passwordType;
  }

  createUser() {
    this.newUser = !this.newUser;
  }

}
