import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  baseUrl: string = 'http://localhost:8080/quran/api/v1/';


  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post(`${this.baseUrl}auth/login`, data);
  }
}
