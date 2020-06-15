import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide: boolean = false;
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
      this.loginForm = fb.group({
         email: ['', Validators.compose([Validators.required, Validators.email])],
         password: ['', Validators.required]
      })
   }

  ngOnInit(): void {
  }

}
