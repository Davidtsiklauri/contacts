import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit {
x
  emailCtrl: FormControl = new FormControl('', Validators.compose([Validators.required, Validators.email]));
  passCtrl: FormControl = new FormControl('',  Validators.required);
  hide: boolean = true;
  
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  sendRecovery() {
    if(this.emailCtrl.valid) {
        this.authService
            .forgotPassword({email: this.emailCtrl.value, password: this.passCtrl.value})
            .subscribe( 
               data => console.log('here'),
               err => this.emailCtrl.setErrors({isExists: true})
            );
    }
  }
}
