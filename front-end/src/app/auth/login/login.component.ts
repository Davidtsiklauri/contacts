import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide: boolean = true;
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: AuthService,
    private activatedRoute: ActivatedRoute,
    private globalService: GlobalService,
    private router: Router
  ) {
      this.loginForm = fb.group({
         email: ['', Validators.compose([Validators.required, Validators.email])],
         password: ['', Validators.required]
      })
   }

  ngOnInit(): void {
      // set Email After Successfully Registration
      const email  = this.activatedRoute.snapshot.queryParams.email;
      if(email) {
        this.loginForm.get('email').setValue(email);
      }
  }

  login() {
    if(this.loginForm.valid) {
       return this.loginService
                  .login(this.loginForm.value)
                  .subscribe(({access_token}) => {
                        this.globalService.setToken(access_token);
                        this.router.navigate(['/contacts'])
                  }, 
                  (err) => this.loginForm.setErrors({unAuthorizied: true}));
    }
  }

}
