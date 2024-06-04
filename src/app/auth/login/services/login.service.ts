import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(code: string): Observable<Login> {
    const LOGIN = {
      code: code,
      type: 'admin'
    }
    return this.http.post<any>(`http://108.175.10.181:5000/api/v1/login`, LOGIN).pipe(map(res => {
      return res.data;
    }));
  }
}
