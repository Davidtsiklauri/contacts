import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  hide: boolean = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: Router
  ) {
      this.registerForm = fb.group({
        email: ['', Validators.compose([Validators.required, Validators.email])],
        password: ['', Validators.required]
    })
   }

  ngOnInit(): void {
  }

  register() {
    if(this.registerForm.valid) {
       return this.authService
                  .register(this.registerForm.value)
                  .subscribe((data: any) => this.route.navigate(['/auth', 'login'], { queryParams: { email: data.email}}), 
                             () => this.registerForm.setErrors({isExists: true})
                   );
    }
  }

}
