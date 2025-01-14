import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <nav class="bg-gray-800 text-white p-4">
      <div class="container mx-auto flex gap-4">
        <a routerLink="/products" class="hover:text-gray-300">Products</a>
        <a routerLink="/categories" class="hover:text-gray-300">Categories</a>
      </div>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'Product Master';
}