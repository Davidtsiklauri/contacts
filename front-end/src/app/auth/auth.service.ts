import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILogin } from './models/auth.interface';
import { Observable } from 'rxjs';


const API = 'api';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  
  constructor(
    private http: HttpClient
  ) { }

  /**
   * 
   * @param input 
   * @method POST
   */
  login( input: ILogin ): Observable<any> {
      return this.http.post(`${API}/auth`, input);
  };

  /**
   * 
   * @param input 
   * @method POST
   */
  register( input: ILogin ): Observable<any> {
      return this.http.post(`${API}/user/register`, input);
  };

  /**
   * 
   * @param email 
   * @method POST
   */
  forgotPassword(data: any) {
     return this.http.post(`${API}/user/recover_password`, data);
  };

  

}
