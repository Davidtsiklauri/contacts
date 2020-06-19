import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-update-password',
  template: ``
})
export class UpdatePasswordComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private globalService: GlobalService,
    private router: Router
  ) { }


 // Auth Login After Navigating From Gmail
  ngOnInit(): void {
    const { password, email } = this.activatedRoute.snapshot.params;
    this.authService
        .login({
          email: email,
          password: password
        }).subscribe(
            ({access_token}) =>  {
                this.globalService.setToken(access_token);
                this.router.navigate(['/contacts']);
            }
        )

  }

}
