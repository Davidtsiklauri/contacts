import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactsComponent } from './contacts.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContactComponent } from './dashboard/contact/contact.component';
import { GroupComponent } from './dashboard/group/group.component';


const routes: Routes = [
  { path: '', component: ContactsComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, children: [
          { path: '', pathMatch: 'full', redirectTo: 'contact' },
          { path: 'contact', component: ContactComponent,  },
          { path: 'group', component: GroupComponent }
      ] } 
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactsRoutingModule { }
