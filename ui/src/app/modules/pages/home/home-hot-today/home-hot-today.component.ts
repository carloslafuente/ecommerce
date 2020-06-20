import { Component, OnInit } from '@angular/core';
import { PATH } from 'src/app/config';
import {
  OwlCarouselConfig,
  BackGroundImage,
  CarouselNavigation,
  ProductLightbox,
  SlickConfig,
  CountDown,
  Rating,
  ProgressBar,
} from 'src/app/functions';
import { ProductsService } from 'src/app/services/products.service';
import { SalesService } from 'src/app/services/sales.service';
import { CategoriesService } from 'src/app/services/categories.service';

interface IProduct {
  id: string;
  offer: any[];
  stock: number;
  gallery: string[];
  image: string;
  category: string;
  name: string;
  price: string;
  reviews: any[];
  url: string;
}

@Component({
  selector: 'app-home-hot-today',
  templateUrl: './home-hot-today.component.html',
  styleUrls: ['./home-hot-today.component.css'],
})
export class HomeHotTodayComponent implements OnInit {
  path: string = PATH.url;
  categories: Array<any> = [];
  products: Array<any> = [];
  sales: Array<any> = [];
  topSalesBlock: Array<any> = [];
  top: number = 10;
  render: boolean = true;
  bannerHotLoading: boolean = false;
  list = [1, 2, 3, 4, 5];

  constructor(
    private productsService: ProductsService,
    private salesService: SalesService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.bannerHotLoading = true;
    this.getCategories();
    this.getProducts();
  }

  getProducts() {
    let getProducts: IProduct[];
    this.productsService.getAllProducts().subscribe((data) => {
      getProducts = Object.keys(data).map(
        (productId) =>
          ({
            id: productId,
            offer: JSON.parse(data[productId].offer),
            stock: data[productId].stock,
            gallery: JSON.parse(data[productId].gallery),
            image: data[productId].image,
            category: data[productId].category,
            name: data[productId].name,
            price: data[productId].price,
            reviews: JSON.parse(data[productId].reviews),
            url: data[productId].url,
          } as IProduct)
      );
      this.products = getProducts.filter(
        (product) =>
          product.stock > 0 && new Date() < new Date(product.offer[2])
      );
      this.products.forEach((product) => {
        product.avgReview = this.getAverage(product.reviews);
      });
      this.bannerHotLoading = false;
      let sales: any = [];
      this.salesService.getAllSales().subscribe((data) => {
        for (let saleId in data) {
          sales.push({
            id: saleId,
            product: data[saleId].product,
            quantity: data[saleId].quantity,
          });
        }
        let filteredSales = [];
        sales.forEach((sale) => {
          if (!filteredSales.find((res) => res.product == sale.product)) {
            filteredSales.push({
              id: sale.id,
              product: sale.product,
              quantity: sale.quantity,
            });
          }
        });
        filteredSales.forEach((element) => {
          element.quantity = 0;
          for (let i = 0; i < sales.length; i++) {
            if (element.product == sales[i].product) {
              element.quantity = element.quantity + sales[i].quantity;
            }
          }
        });
        filteredSales.sort((a, b) => {
          return b.quantity - a.quantity;
        });
        let allProducts = getProducts;
        filteredSales.forEach((sale, index) => {
          for (let i = 0; i < allProducts.length; i++) {
            if (sale.id == allProducts[i].id && index < this.top) {
              this.sales.push(allProducts[i]);
            } else {
              if (sale.product == allProducts[i].name && index < this.top) {
                this.sales.push(allProducts[i]);
              }
            }
          }
        });
        for (let i = 0; i < Math.round(this.sales.length / 4); i++) {
          let limit = (i + 1) * 4;
          let block = [];
          for (let f = limit - 4; f < limit; f++) {
            block.push(this.sales[f]);
          }
          this.topSalesBlock.push(block);
        }
      });
    });
  }

  getCategories(): void {
    this.categoriesService.getAllCategories().subscribe((data) => {
      this.categories = Object.keys(data).map((categoryId) => ({
        ...data[categoryId],
        id: categoryId,
      }));
    });
  }

  getAverage(reviews): number {
    let totalReview = 0;
    let quantityReview = reviews.length;
    reviews.forEach((element) => {
      totalReview = totalReview + element.review;
    });
    totalReview = Math.round(totalReview / quantityReview);
    return totalReview;
  }
  
  getCategory(url) {
    let resp = '';
    for (let i = 0; i < this.categories.length; i++) {
      if (url == this.categories[i].url) {
        resp = this.categories[i].name;
      }
    }
    return resp;
  }

  callback() {
    if (this.render) {
      this.render = false;
      setTimeout(() => {
        OwlCarouselConfig.fn();
        CarouselNavigation.fn();
        SlickConfig.fn();
        ProductLightbox.fn();
        BackGroundImage.fn();
        CountDown.fn();
        Rating.fn();
        ProgressBar.fn();
      }, 1000);
    }
  }
}
