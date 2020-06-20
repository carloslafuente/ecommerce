import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ProductsService } from './services/products.service';
import { CategoriesService } from './services/categories.service';
import { SubCategoriesService } from './services/sub-categories.service';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './modules/components/header/header.component';
import { HeaderPromotionComponent } from './modules/components/header-promotion/header-promotion.component';
import { HeaderMobileComponent } from './modules/components/header-mobile/header-mobile.component';
import { NewletterComponent } from './modules/components/newletter/newletter.component';
import { FooterComponent } from './modules/components/footer/footer.component';
import { HomeComponent } from './modules/pages/home/home.component';
import { ProductsComponent } from './modules/pages/products/products.component';
import { ProductComponent } from './modules/pages/product/product.component';
import { SearchComponent } from './modules/pages/search/search.component';
import { Page404Component } from './modules/pages/page404/page404.component';
import { HomeBannerComponent } from './modules/pages/home/home-banner/home-banner.component';
import { HomeFeaturesComponent } from './modules/pages/home/home-features/home-features.component';
import { HomePromotionComponent } from './modules/pages/home/home-promotion/home-promotion.component';
import { HomeHotTodayComponent } from './modules/pages/home/home-hot-today/home-hot-today.component';
import { HomeTopCategoriesComponent } from './modules/pages/home/home-top-categories/home-top-categories.component';
import { HomeShowcaseComponent } from './modules/pages/home/home-showcase/home-showcase.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeaderPromotionComponent,
    HeaderMobileComponent,
    NewletterComponent,
    FooterComponent,
    HomeComponent,
    ProductsComponent,
    ProductComponent,
    SearchComponent,
    Page404Component,
    HomeBannerComponent,
    HomeFeaturesComponent,
    HomePromotionComponent,
    HomeHotTodayComponent,
    HomeTopCategoriesComponent,
    HomeShowcaseComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [ProductsService, CategoriesService, SubCategoriesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
