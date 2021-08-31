import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Period } from '../../models/period.model';

@Injectable({
  providedIn: 'root',
})
export class PeriodService {
  apiURL: string = environment.apiURL + '/api/periods';

  constructor(private http: HttpClient) {}

  save(period: Period): Observable<Period> {
    if (!period.id) {
      return this.http.post<Period>(this.apiURL, period);
    } else {
      console.log(period);
      return this.http.put<Period>(`${this.apiURL}/${period.id}`, period);
    }
  }

  getPeriods(): Observable<Period[]> {
    return this.http.get<Period[]>(this.apiURL);
  }

  getPeriodById(id: number): Observable<Period> {
    return this.http.get<Period>(`${this.apiURL}/${id}`);
  }

  getImagesByPeriod(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/images/${id}`);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${id}`);
  }
}
