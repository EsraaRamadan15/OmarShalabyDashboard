import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Doaa } from '../models/doaa';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DoaaService {
  baseUrl: string = 'http://localhost:8080/quran/api/v1/';
  headers = new HttpHeaders({
    Authorization: `${localStorage.getItem('token')}`,
  });
  constructor(private http: HttpClient) { }
  getAllDoaas() {
    return this.http.get<Doaa>(
      `${this.baseUrl}dueaAndQuran/due`,
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
  getDoaaById(id: string) {
    return this.http.get<Doaa>(
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
  addDoaa(body: any) {
    return this.http.post(`${this.baseUrl}dueaAndQuran/`, body, {
      headers: this.headers,
    })
  }
  editDoaa(id: string, data: any) {
    return this.http.put(`${this.baseUrl}dueaAndQuran/single/${id}`, data, {
      headers: this.headers,
    });
  }
  deleteDoaa(id: any) {
    console.log(id)
    return this.http.delete(`${this.baseUrl}dueaAndQuran/single/${id}`,
      {
        headers: this.headers,
      });
  }
}
