import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Surah } from '../../models/surah';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class SurahService {
  private static SURAH_ENDPOINT_BASE_URL = () =>
    environment.backendUrl;


  baseUrl: string = 'http://localhost:8080/';
  headers = new HttpHeaders({
    Authorization: ''+ localStorage.getItem('token'),
  });

  constructor(private httpClient: HttpClient) { }

  getAllsurahs(page: number, size: number) {
    return this.httpClient.get<Surah>(
      `${this.baseUrl}category/getAllCategories?page=${page}&size=${size}`,
      { headers: this.headers }
    );
  }

  addSurah(body: any) {

    return this.httpClient.post(`${this.baseUrl}quran/api/v1/dueaAndQuran`, body, {
      headers: this.headers,
    });
  }


  createSurah(surah: Partial<Surah>) {
    return this.httpClient.post<Surah>(
      SurahService.SURAH_ENDPOINT_BASE_URL(),
      surah,
      { headers: this.headers }
    );
  }

  getCSurah(id: string) {
    return this.httpClient.get<Surah>(
      `${this.baseUrl}category/getCategory?id=${id}`,
      {
        headers: this.headers,
      }
    );
  }

  deleteSurah(id: any) {
    return this.httpClient.delete(`${this.baseUrl}category/deleteCategory?id=${id}`, {
      headers: this.headers,
    });
  }
  editSurah(data: any) {
    return this.httpClient.patch(`${this.baseUrl}category/editCategory`, data, {
      headers: this.headers,
    });
  }









}
