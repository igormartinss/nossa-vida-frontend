import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Image } from '../../models/image.model';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  apiURL: string = environment.apiURL + '/api/images';

  constructor(private http: HttpClient) { }

  save(periodId: number, formData: FormData): Observable<Image> {
    return this.http.post<Image>(`${this.apiURL}/${periodId}`, formData);
  }

}
