import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILogin } from './models/auth.interface';


const path = 'api';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  
  constructor(
    private http: HttpClient
  ) { }

  login( input: ILogin ) {
      return this.http.post(`${path}/auth`, input);
  };

  register( input: ILogin ) {
      return this.http.post(`${path}/user/register`, input);
  };
}
