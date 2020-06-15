import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit {

  emailCtrl: FormControl = new FormControl('', Validators.required);
  
  constructor() { }

  ngOnInit(): void {
  }

}
