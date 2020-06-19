import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { NotFoundPageComponent } from './shared/components/contact-person-box/not-found-page/not-found-page.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/auth/login' },
  { path: 'auth', 
    loadChildren: () => import('./auth/auth.module').then(({AuthModule}) =>  AuthModule),
    canActivate:[ AuthGuard ], runGuardsAndResolvers: "always"
  },
  { path: 'contacts', 
    loadChildren: () => import('./contacts/contacts.module').then(({ContactsModule}) =>  ContactsModule),
    canActivate:[ AuthGuard ], runGuardsAndResolvers: "always"
  },
  {
    path: '**',
    component: NotFoundPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
