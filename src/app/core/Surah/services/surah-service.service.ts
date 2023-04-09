import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Surah } from '../../models/surah';


@Injectable({
  providedIn: 'root',
})
export class SurahService {
  baseUrl: string = 'https://hykerz.business-book.site/';
  headers = new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  });
  constructor(private http: HttpClient) {}

  getAllsurahs(page: number, size: number) {
    return this.http.get<Surah>(
      `${this.baseUrl}category/getAllCategories?page=${page}&size=${size}`,
      { headers: this.headers }
    );
  }

  addSurah(body: any) {
    return this.http.post(`${this.baseUrl}category/addCategory`, body, {
      headers: this.headers,
    });
  }

  getCSurah(id: string) {
    return this.http.get<Surah>(
      `${this.baseUrl}category/getCategory?id=${id}`,
      {
        headers: this.headers,
      }
    );
  }

  deleteSurah(id: any) {
    return this.http.delete(`${this.baseUrl}category/deleteCategory?id=${id}`, {
      headers: this.headers,
    });
  }
  editSurah(data: any) {
    return this.http.patch(`${this.baseUrl}category/editCategory`, data, {
      headers: this.headers,
    });
  }









}
