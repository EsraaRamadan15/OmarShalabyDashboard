import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Surah } from '../../models/surah';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';
import { DoaaSurahhListItem } from '../../models/doaaSurahListItem';


@Injectable({
  providedIn: 'root',
})
export class SurahService {
  private static SURAH_ENDPOINT_BASE_URL = () =>
    environment.backendUrl;

  baseUrl: string = 'http://localhost:8080/quran/api/v1/';
  headers = new HttpHeaders({
    Authorization: '' + localStorage.getItem('token'),
  });

  constructor(private httpClient: HttpClient) { }

  getAllsurahs() {
    return this.httpClient.get<DoaaSurahhListItem>(
      `${this.baseUrl}dueaAndQuran/type=quran`,
      {
        headers: this.headers,
      }
    ).pipe(
      map((res: any) => res.data.
        map((obj: any) => {
          return {
            id: obj._id,
            name: obj.name,
            description: obj.des
          }
        })));
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

  getSurah(id: string) {
    return this.httpClient.get<Surah>(
      `${this.baseUrl}category/getCategory?id=${id}`,
      {
        headers: this.headers,
      }
    );
  }



  deleteSurah(id: any) {
    console.log(id)
    return this.httpClient.delete(`${this.baseUrl}dueaAndQuran/${id}`,
      {
        headers: this.headers,
      });
  }
  editSurah(data: any) {
    return this.httpClient.patch(`${this.baseUrl}category/editCategory`, data, {
      headers: this.headers,
    });
  }









}
