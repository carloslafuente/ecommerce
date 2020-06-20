import { Component, OnInit } from '@angular/core';
import { PATH } from '../../../config';
import { CategoriesService } from 'src/app/services/categories.service';
import { SubCategoriesService } from 'src/app/services/sub-categories.service';
import { Observable, Subject } from 'rxjs';

interface ICategory {
  id: string;
  icon: string;
  image: string;
  name: string;
  title_list: ITitleList[];
  url: string;
  view: number;
}

interface ITitleList {
  id: string;
  name: string;
  subcategories: ISubcategory[];
}

interface ISubcategory {
  category: string;
  image: string;
  name: string;
  products_inventory: number;
  url: string;
  view: number;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  path: string = PATH.url;
  render: boolean = true;
  categories: ICategory[];
  subcategories: any[] = [];

  constructor(
    private categoriesService: CategoriesService,
    private subcategoriesService: SubCategoriesService
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    let categories = [];
    this.categoriesService.getAllCategories().subscribe((data) => {
      categories = Object.keys(data).map(
        (element) =>
          ({
            id: element,
            name: data[element].name,
            icon: data[element].icon,
            image: data[element].image,
            url: data[element].url,
            view: data[element].view,
            title_list: JSON.parse(data[element].title_list),
          } as ICategory)
      );

      categories.forEach((category) => {
        for (let i = 0; i < category.title_list.length; i++) {
          category.title_list[i] = {
            name: category.title_list[i],
          };
        }
      });

      this.getSubcategories().subscribe((data) => {
        categories.forEach((category) => {
          for (let i = 0; i < category.title_list.length; i++) {
            category.title_list[i].subcategories = [];
            for (let f = 0; f < data.length; f++) {
              if (category.title_list[i].name == data[f].title_list) {
                category.title_list[i].subcategories.push(data[f]);
              }
            }
          }
        });
        this.categories = categories;
      });
    });
  }

  getSubcategories(): Observable<any> {
    let subject = new Subject<any>();
    this.subcategoriesService.getSubcategories().subscribe((data) => {
      subject.next(data);
    });
    return subject.asObservable();
  }

  // Funcion que nos avisa cuando termina el renderizado de las categorias
  callback() {
    if (this.render) {
      this.render = false;
    }
  }
}
