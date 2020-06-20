import { Component, OnInit } from '@angular/core';
import { PATH } from 'src/app/config';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { SubCategoriesService } from 'src/app/services/sub-categories.service';

@Component({
  selector: 'app-home-showcase',
  templateUrl: './home-showcase.component.html',
  styleUrls: ['./home-showcase.component.css'],
})
export class HomeShowcaseComponent implements OnInit {
  path: string = PATH.url;
  topCategories: any[] = [
    {
      name: 'Clothing Apparel',
      view: 10,
      url: '',
      subcategories: [
        {
          name: 'Bags',
          url: '',
        },
      ],
      products: [
        {
          name: 'Bag Gucci',
          url: '',
          banner: '',
          img: '',
          price: 10,
          review: 10,
        },
      ],
    },
  ];

  constructor(
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private subcategoriesService: SubCategoriesService
  ) {}

  ngOnInit(): void {
    this.categoriesService.getAllCategories().subscribe((data) => {
      console.log((data));
    });
    this.productsService.getAllProducts().subscribe((data) => {
      console.log((data));
    });
    this.subcategoriesService.getSubcategories().subscribe((data) => {
      console.log((data));
    });
  }
}
