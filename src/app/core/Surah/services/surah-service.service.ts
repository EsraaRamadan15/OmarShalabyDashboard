import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class SurahService {
  baseUrl: string = 'https://hykerz.business-book.site/';
  headers = new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  });
  constructor(private http: HttpClient) {}



  addCategory(body: any) {
    return this.http.post(`${this.baseUrl}category/addCategory`, body, {
      headers: this.headers,
    });
  }




}
