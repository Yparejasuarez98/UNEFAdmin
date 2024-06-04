import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Enterprise, EnterpriseAsist, EnterpriseDelegate, Section } from '../models/votes-admin';
import { ResponseData, ResponsePagination, Result } from '../../../shared/models/response';
import * as Papa from 'papaparse';

@Injectable({
  providedIn: 'root'
})
export class VotesAdminService {

  constructor(private http: HttpClient) { }

  getEnterprise(name: string | null, section: string | null, typeVote: string | null, nif: string | null, page: number, totalPage: number): Observable<ResponsePagination> {
    let url = `http://108.175.10.181:5000/api/v1/enterprise?page=${page}&total_page=${totalPage}`;
    if (name) {
      url += `&name=${name}`;
    }
    if (section) {
      url += `&section=${section}`;
    }
    if (typeVote) {
      url += `&type_vote=${typeVote}`;
    }
    if (nif) {
      url += `&nif=${nif}`;
    }
    return this.http.get<ResponsePagination>(url);
  }

  getEnterpriseAutocomplete(name: string | null, section: string, typeVote: string, page: number, totalPage: number): Observable<ResponsePagination> {
    return this.http.get<ResponsePagination>(`http://108.175.10.181:5000/api/v1/enterprise?name=${name}&section=${section}&type_vote=${typeVote}&page=${page}&total_page=${totalPage}`);
  }

  getSections(): Observable<Section[]> {
    return this.http.get<ResponseData>(`http://108.175.10.181:5000/api/v1/sections`).pipe(
      map((res) => {
        return res.data;
      })
    );
  }

  updateEnterpriseAsist(data: EnterpriseAsist) {
    return this.http.patch(`http://108.175.10.181:5000/api/v1/enterprise`, data)
  }

  updateEnterpriseDelegate(data: EnterpriseDelegate) {
    return this.http.post(`http://108.175.10.181:5000/api/v1/delegate`, data)
  }

  downloadExcelVotes(section?: string, round?: number) {
    let url = `http://108.175.10.181:5000/api/v1/votes-csv?`;
    if (section) {
      url += `&section=${section}`;
    }
    if (round && round !== 0) {
      url += `&round=${round}`;
    }
    return this.http.get(url, { responseType: 'text' }).pipe(
      map(data => {
        const result = Papa.parse(data, { header: true });
        return result.data;
      })
    );
  }

  downloadExcel() {
    let url = `http://108.175.10.181:5000/api/v1/enterprise-csv`;
    return this.http.get(url, { responseType: 'text' }).pipe(
      map(data => {
        const result = Papa.parse(data, { header: true });
        return result.data;
      })
    );;
  }
}
