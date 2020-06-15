import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ContactPersonBoxComponent } from './components/contact-person-box/contact-person-box.component';
import { SanitizePipe } from './pipes/sanitize.pipe';
import {MatMenuModule} from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';


const COMPONENTS = [
  ContactPersonBoxComponent, 
  SanitizePipe
];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MatMenuModule,
    MatIconModule

  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    ...COMPONENTS
  ]
})

export class SharedModule { }
