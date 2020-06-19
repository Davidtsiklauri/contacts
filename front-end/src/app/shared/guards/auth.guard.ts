import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalService } from 'src/app/global.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private globalService: GlobalService, 
              private router: Router
 ) {};
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const { url } = state;
      if(this.globalService.isAuth() && url.startsWith('/auth')) {
        this.router.navigate(['/contacts']);
        return false;
      }
      else if( !this.globalService.isAuth() && url.startsWith('/contacts') ) {
        this.router.navigate(['/auth']);
        return false;
      }
      return true;
  }
  
}
