import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsComponent } from './contacts.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatIconModule } from '@angular/material/icon';
import { ContactComponent } from './dashboard/contact/contact.component';
import { GroupComponent } from './dashboard/group/group.component';
import { SharedModule } from '../shared/shared.module';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { AddContactComponent } from './add-contact/add-contact.component';
import { MatButtonModule } from '@angular/material/button';
 


@NgModule({
  declarations: [
    ContactsComponent, 
    DashboardComponent, 
    ContactComponent, 
    GroupComponent, 
    AddContactComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    ContactsRoutingModule,
    MatIconModule,
    SharedModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class ContactsModule { }
