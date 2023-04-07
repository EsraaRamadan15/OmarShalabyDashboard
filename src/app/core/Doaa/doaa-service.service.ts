import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Doaa } from '../models/doaa';

@Injectable({
  providedIn: 'root',
})
export class DoaaService {
  baseUrl: string = 'https://hykerz.business-book.site/';
  headers = new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  });
  constructor(private http: HttpClient) {}
  grtAllAirlines(page: number, size: number) {
    return this.http.get<Doaa>(
      `${this.baseUrl}airline/getAllAirlinesForWeb?page=${page}&size=${size}`,
      {
        headers: this.headers,
      }
    );
  }
  addAirline(body: any) {
    return this.http.post(`${this.baseUrl}airline/add`, body, {
      headers: this.headers,
    });
  }
  editAirline(data: any) {
    return this.http.post(`${this.baseUrl}airline/edit`, data, {
      headers: this.headers,
    });
  }
  deleteAirline(id: any) {
    return this.http.delete(`${this.baseUrl}airline/delete?id=${id}`);
  }
}
