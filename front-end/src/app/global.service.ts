import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(
    private router: Router
  ) { }

  private get _isLoggedIn(): boolean {
      return !!localStorage.getItem('token');
  };

  setToken(token: string): void {
    return localStorage.setItem('token', token);
  }

  getToken(): (string | any){
    if(this._isLoggedIn)  {
      return localStorage.getItem('token');
    };
    return throwError('wihout token');
  };

 isAuth() {
   return this._isLoggedIn;
 };

 logOut(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
 }

}
