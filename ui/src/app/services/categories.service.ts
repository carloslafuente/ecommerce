import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from '../config';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private api: string = API.url;
  constructor(private http: HttpClient) {}

  getAllCategories() {
    return this.http.get(`${this.api}categories.json`);
  }

  getCategoryByAttr(attr: string, url: string) {
    return this.http.get(
      `${this.api}categories.json?orderBy="${attr}"&equalTo="${url}"&print=pretty`
    );
  }
}
