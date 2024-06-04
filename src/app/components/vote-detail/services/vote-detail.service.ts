import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VoteDetail } from '../models/vote-detail';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoteDetailService {

  constructor(private http: HttpClient) { }

  getList(): Observable<VoteDetail> {
    return this.http.get<any>(`http://108.175.10.181:5000/api/v1/vote?round=1`).pipe(map(res => {
      return res.data;
    }));
  }
}
