import { Component, OnInit } from '@angular/core';
import { PATH } from 'src/app/config';
import { ProductsService } from 'src/app/services/products.service';
import { OwlCarouselConfig, BackGroundImage } from 'src/app/functions';

@Component({
  selector: 'app-home-promotion',
  templateUrl: './home-promotion.component.html',
  styleUrls: ['./home-promotion.component.css'],
})
export class HomePromotionComponent implements OnInit {
  path: string = PATH.url;
  bannerDefault: Array<any> = [];
  category: Array<any> = [];
  url: Array<any> = [];
  render: boolean = true;
  bannerDefaultLoading: boolean = false;
  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.bannerDefaultLoading = true;
    this.productsService.getAllProducts().subscribe((data) => {
      this.limitTo(data, 2);
      this.bannerDefaultLoading = false;
    });
  }

  limitTo(data, limit) {
    let products = [];
    let index = 0;
    let size = 0;
    for (let i in data) {
      size++;
    }
    if (size > limit) {
      index = Math.floor(Math.random() * (size - limit));
    }
    for (let prodId in data) {
      products.push(data[prodId]);
    }
    for (let i = index; i < index + limit; i++) {
      this.bannerDefault.push(products[i].default_banner);
      this.category.push(products[i].category);
      this.url.push(products[i].url);
    }
  }

  callback() {
    if (this.render) {
      this.render = false;
      OwlCarouselConfig.fn();
      BackGroundImage.fn();
    }
  }
}
