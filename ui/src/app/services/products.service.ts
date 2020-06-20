import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from '../config';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private api: string = API.url;
  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get(`${this.api}products.json`);
  }

  getLimitData(limitToFirst: number, startAt: string) {
    return this.http.get(
      `${this.api}products.json?orderBy="$key"&limitToFirst=${limitToFirst}&startAt="${startAt}"&print=pretty`
    );
  }
}
