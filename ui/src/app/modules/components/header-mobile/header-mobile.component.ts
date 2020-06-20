import { Component, OnInit } from '@angular/core';
import { PATH } from '../../../config';
import { CategoriesService } from 'src/app/services/categories.service';
import { SubCategoriesService } from 'src/app/services/sub-categories.service';
import { Observable, Subject } from 'rxjs';
declare var JQuery: any;
declare var $: any;

interface ICategory {
  id: string;
  icon: string;
  image: string;
  name: string;
  title_list: string[];
  url: string;
  view: number;
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
  selector: 'app-header-mobile',
  templateUrl: './header-mobile.component.html',
  styleUrls: ['./header-mobile.component.css'],
})
export class HeaderMobileComponent implements OnInit {
  path: string = PATH.url;
  categories: ICategory[] = [];
  render: boolean = true;

  constructor(
    private categoriesService: CategoriesService,
    private subcategoriesService: SubCategoriesService
  ) {}

  ngOnInit(): void {
    this.getCategories();

    $(document).on('click', '.sub-toggle', function () {
      $(this).parent().children('ul').toggle();
    });
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

      this.getSubcategories().subscribe((subcategories) => {
        categories.forEach((category) => {
          category.subcategories = [];
          for (let i = 0; i < subcategories.length; i++) {
            if (category.name == subcategories[i].category) {
              category.subcategories.push(subcategories[i]);
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

  callback() {
    if (this.render) {
      this.render = false;
    }
  }
}
