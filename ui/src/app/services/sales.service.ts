import { Injectable } from '@angular/core';
import { API } from '../config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  private api: string = API.url;
  constructor(private http: HttpClient) {}

  getAllSales() {
    return this.http.get(`${this.api}sales.json`);
  }
}
