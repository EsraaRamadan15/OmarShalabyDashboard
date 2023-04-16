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
  constructor(private http: HttpClient) {}
  getAllDoaas() {
    return this.http.get<Doaa>(
      `${this.baseUrl}dueaAndQuran/duea`,
      {
        headers: this.headers,
      }
    ).pipe(
      map((res:any)  => res.data.
      map((obj: any) => {
        return {
          id:obj._id,
          name: obj.name,
          description: obj.des
       }
    })));
  }
  addADoaa(body: any) {
    return this.http.post(`${this.baseUrl}dueaAndQuran/duea`, body, {
      headers: this.headers,
    })
  }
  editDoaa(data: any) {
    return this.http.post(`${this.baseUrl}airline/edit`, data, {
      headers: this.headers,
    });
  }
  deleteDoaa(id: any) {
    console.log(id)
    return this.http.delete(`${this.baseUrl}dueaAndQuran/${id}`,
    {
      headers: this.headers,
    });
  }
}
