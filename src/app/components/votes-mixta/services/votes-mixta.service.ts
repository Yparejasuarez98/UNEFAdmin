import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ResponseData, ResponsePagination } from '../../../shared/models/response';
import { ViewResult } from '../view-result/models/view-result';
import { Rule } from '../models/votes-mixta';

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

  getVotFilterAdmin(round: number | null = null,
    section: string | null = null,
    type: string | null = null,
    name: string | null = null,
    nameVote: string | null = null,
    nif: string | null = null,
    nifVotes: string | null = null,
    page: number,
    totalPage: number): Observable<ResponsePagination> {
    let url = `http://108.175.10.181:5000/api/v1/votes?page=${page}&total_page=${totalPage}`;

    // Añade los parámetros opcionales si se proporcionan
    if (round !== null && round !== 0) url += `&round=${round}`;
    if (section !== null && section !== '') url += `&section=${section}`;
    if (type !== null && type !== '') url += `&type=${type}`;
    if (name !== null && name !== '') url += `&name=${name}`;
    if (nameVote !== null && nameVote !== '') url += `&name_vote=${nameVote}`;
    if (nif !== null && nif !== '') url += `&nif=${nif}`;
    if (nifVotes !== null && nifVotes !== '') url += `&nif_votes=${nifVotes}`;

    return this.http.get<ResponseData>(url).pipe(map((res) => {
      return res.data;
    }));;
  }
}
