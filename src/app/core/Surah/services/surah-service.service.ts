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
    Authorization: `${localStorage.getItem('token')}`,
  });

  constructor(private httpClient: HttpClient) { }

  getAllsurahs() {
    return this.httpClient.get<DoaaSurahhListItem>(
      `${this.baseUrl}dueaAndQuran/quran`,
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

    return this.httpClient.post(`${this.baseUrl}dueaAndQuran/`, body, {
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
      `${this.baseUrl}dueaAndQuran/single/${id}`,
      {
        headers: this.headers,
      }
    ).pipe(
      map((res: any) => {
        return {
          id: res.data._id,
          name: res.data.name,
          description: res.data.des,
          fileToUpload: res.data.path
        }
      }));
  }


  deleteSurah(id: any) {
    console.log(id)
    return this.httpClient.delete(`${this.baseUrl}dueaAndQuran/single/${id}`,
      {
        headers: this.headers,
      });
  }
  editSurah(id: string, data: any) {
    return this.httpClient.put(`${this.baseUrl}dueaAndQuran/single/${id}`, data, {
      headers: this.headers,
    });
  }

}
