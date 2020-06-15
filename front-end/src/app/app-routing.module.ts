import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/auth/login' },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(({AuthModule}) =>  AuthModule) },
  { path: 'contacts', loadChildren: () => import('./contacts/contacts.module').then(({ContactsModule}) =>  ContactsModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
