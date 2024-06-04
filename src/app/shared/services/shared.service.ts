import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  
  private result: BehaviorSubject<any> = new BehaviorSubject<any>({});
  private detailMixto: BehaviorSubject<any> = new BehaviorSubject<any>({});

  constructor() { }

  setResult(rasult: any): void {
    this.result.next(rasult);
  }

  getResult(): Observable<any> {
    return this.result.asObservable();
  }

  setDetailMix(mixt: any): void {
    this.detailMixto.next(mixt);
  }

  getDetailMix(): Observable<any> {
    return this.detailMixto.asObservable();
  }
}
