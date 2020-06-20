import { Component, OnInit } from '@angular/core';
import { PATH } from 'src/app/config';
import { ProductsService } from 'src/app/services/products.service';
import { OwlCarouselConfig } from 'src/app/functions';

@Component({
  selector: 'app-home-banner',
  templateUrl: './home-banner.component.html',
  styleUrls: ['./home-banner.component.css'],
})
export class HomeBannerComponent implements OnInit {
  path: string = PATH.url;
  bannerHome: Array<any> = [];
  category: Array<any> = [];
  url: Array<any> = [];
  render: boolean = true;
  carouselLoading: boolean = false;
  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.carouselLoading = true;
    this.productsService.getAllProducts().subscribe((data) => {
      this.limitTo(data, 5);
      this.carouselLoading = false;
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
      this.bannerHome.push(JSON.parse(products[i].horizontal_slider));
      this.category.push(products[i].category);
      this.url.push(products[i].url);
    }
  }

  callback() {
    if (this.render) {
      this.render = false;
      OwlCarouselConfig.fn();
    }
  }
}
