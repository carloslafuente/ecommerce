import { Component, OnInit } from '@angular/core';
import { PATH } from '../../../config';
import { CategoriesService } from 'src/app/services/categories.service';
import { SubCategoriesService } from 'src/app/services/sub-categories.service';
declare var JQuery: any;
declare var $: any;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  path: string = PATH.url;
  categories: Object = null;
  render: boolean = true;
  categoriesList: Array<any> = [];

  constructor(
    private categoriesService: CategoriesService,
    private subcategoriesService: SubCategoriesService
  ) {}

  ngOnInit(): void {
    this.categoriesService.getAllCategories().subscribe((data) => {
      this.categories = data;
      // Recorrido por el objeto de la data de categorias
      for (let i in data) {
        // Separamos los nombres de categorias
        this.categoriesList.push(data[i].name);
      }
    });
  }

  callback() {
    if (this.render) {
      this.render = false;
      let arraySubcategories = [];
      // Separar las categorias
      this.categoriesList.forEach((category) => {
        this.subcategoriesService
          .getFilterData('category', category)
          .subscribe((data) => {
            // Hacemos un recorrido por la coleccion general de subcategorias
            // y clasificamos las categorias y url de acuerdo a la categoria que corresponda
            for (let i in data) {
              arraySubcategories.push({
                category: data[i].category,
                subcategory: data[i].name,
                url: data[i].url,
              });
            }
            // Recorremos el array de objetos nuevo para buscar coincidencias con los nombres de categorias
            for (let i in arraySubcategories) {
              if (category == arraySubcategories[i].category) {
                $(`[category-footer = '${category}']`).after(`
                  <a href="products/${arraySubcategories[i].url}">${arraySubcategories[i].subcategory}</a>
                `);
              }
            }
          });
      });
    }
  }
}
