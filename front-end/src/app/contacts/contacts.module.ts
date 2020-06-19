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
import { ContactsService } from './contacts.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CreateGroupsModalComponent } from './dashboard/contact/create-groups-modal/create-groups-modal.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LayoutModule } from '@angular/cdk/layout';


@NgModule({
  declarations: [
    ContactsComponent, 
    DashboardComponent, 
    ContactComponent, 
    GroupComponent, 
    AddContactComponent, CreateGroupsModalComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    ContactsRoutingModule,
    MatIconModule,
    SharedModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    LayoutModule
  ],
  providers: [
    {
      provide: ContactsService,
      useClass: ContactsService,
    }
  ]
})
export class ContactsModule { }
