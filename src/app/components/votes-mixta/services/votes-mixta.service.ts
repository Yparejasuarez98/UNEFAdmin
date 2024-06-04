import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ResponseData, ResponsePagination } from '../../../shared/models/response';
import { ViewResult } from '../view-result/models/view-result';
import { Rule } from '../models/votes-mixta';
import { VotesMixtaDetail } from '../votes-mixta-detail/models/votes-mixta-detail';

@Injectable({
  providedIn: 'root'
})
export class VotesMixtaService {

  constructor(private http: HttpClient) { }

  getSections(): Observable<ResponseData> {
    return this.http.get<ResponseData>(`http://108.175.10.181:5000/api/v1/sections`);
  }

  nextRound(section: string): Observable<ResponseData> {
    return this.http.post<ResponseData>(`http://108.175.10.181:5000/api/v1/next-round`, { section: section });
  }

  getDashboard(section: string): Observable<ViewResult[]> {
    return this.http.get<ResponseData>(`http://108.175.10.181:5000/api/v1/dashboard?section=${section}`).pipe(
      map((res) => {
        return res.data;
      })
    );
  }

  getRule(round: number, section: string): Observable<Rule[]> {
    return this.http.get<ResponseData>(`http://108.175.10.181:5000/api/v1/rules?section=${section}&round=${round}`).pipe(map((res) => {
      return res.data;
    }));
  }

  getVotFilterAdmin(round: number, section: string, type: string, name: string, nameVote: string, nif: string, nifVotes: string, page: number, totalPage: number): Observable<ResponsePagination> {
    return this.http.get<ResponseData>(`http://108.175.10.181:5000/api/v1/votes?round=${round}&section=${section}&type=${type}&name=${name}&name_vote=${nameVote}&nif=${nif}&nif_votes=${nifVotes}&page=${page}&total_page=${totalPage}`).pipe(map((res) => {
      return res.data;
    }));;
  }
}
