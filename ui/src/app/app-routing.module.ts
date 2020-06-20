import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ProductsComponent } from './modules/pages/products/products.component';
import { ProductComponent } from './modules/pages/product/product.component';
import { HomeComponent } from './modules/pages/home/home.component';
import { SearchComponent } from './modules/pages/search/search.component';
import { Page404Component } from './modules/pages/page404/page404.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'product', component: ProductComponent },
  { path: 'search', component: SearchComponent },
  { path: '**', pathMatch: 'full', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
