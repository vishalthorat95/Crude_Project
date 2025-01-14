import { Routes } from '@angular/router';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { ProductListComponent } from './components/product-list/product-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'categories', component: CategoryListComponent },
  { path: 'products', component: ProductListComponent }
];