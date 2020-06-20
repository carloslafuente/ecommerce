import { Component, OnInit } from '@angular/core';
import { PATH } from 'src/app/config';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-home-top-categories',
  templateUrl: './home-top-categories.component.html',
  styleUrls: ['./home-top-categories.component.css'],
})
export class HomeTopCategoriesComponent implements OnInit {
  path: string = PATH.url;
  topCategories: Array<any> = [];
  render: boolean = true;
  loading: boolean = false;

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.loading = true;
    let categories = [];
    this.categoriesService.getAllCategories().subscribe((data) => {
      categories = Object.keys(data).map((categoryId) => ({
        ...data[categoryId],
        id: categoryId,
      }));
      categories.sort((a, b) => {
        return b.view - a.view;
      });
      this.topCategories = categories;
      this.loading = false;
    });
  }

  callback() {
    if (this.render) {
      this.render = false;
    }
  }
}
