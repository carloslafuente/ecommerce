import { Component, OnInit } from '@angular/core';
import { PATH } from '../../../config';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-header-promotion',
  templateUrl: './header-promotion.component.html',
  styleUrls: ['./header-promotion.component.css'],
})
export class HeaderPromotionComponent implements OnInit {
  path: string = PATH.url;
  topBanner: Object = null;
  bannerLoading: boolean = false;
  category: Object = null;
  url: Object = null;
  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.bannerLoading = true;

    this.productsService.getAllProducts().subscribe((data) => {
      // Obtenemos la longitud del objeto
      let size = 0;
      for (let i in data) {
        size++;
      }
      let random = Math.floor(Math.random() * size);
      // Obtenemos los datos de un objeto, al ser un objeto y no un array
      this.topBanner = JSON.parse(data[Object.keys(data)[random]].top_banner);
      this.category = data[Object.keys(data)[random]].category;
      this.url = data[Object.keys(data)[random]].url;
      this.bannerLoading = false;
    });
  }
}
