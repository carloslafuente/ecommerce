import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from '../config';

@Injectable({
  providedIn: 'root',
})
export class SubCategoriesService {
  private api: string = API.url;
  constructor(private http: HttpClient) {}

  getSubcategories() {
    return this.http.get(`${this.api}sub-categories.json`);
  }
  getFilterData(orderBy: string, equalTo: string) {
    return this.http.get(
      `${this.api}sub-categories.json?orderBy="${orderBy}"&equalTo="${equalTo}"&print=pretty`
    );
  }
}
