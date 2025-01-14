import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductFormComponent],
  template: `
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">Products</h1>
      
      <app-product-form
        (submitProduct)="onCreateProduct($event)"
      ></app-product-form>

      <div class="mt-6">
        <table class="min-w-full">
          <thead>
            <tr>
              <th class="px-4 py-2">Product ID</th>
              <th class="px-4 py-2">Product Name</th>
              <th class="px-4 py-2">Description</th>
              <th class="px-4 py-2">Price</th>
              <th class="px-4 py-2">Category ID</th>
              <th class="px-4 py-2">Category Name</th>
              <th class="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let product of products">
              <td class="border px-4 py-2">{{ product.id }}</td>
              <td class="border px-4 py-2">{{ product.name }}</td>
              <td class="border px-4 py-2">{{ product.description }}</td>
              <td class="border px-4 py-2">{{ product.price | currency }}</td>
              <td class="border px-4 py-2">{{ product.category_id }}</td>
              <td class="border px-4 py-2">{{ product.categories?.name }}</td>
              <td class="border px-4 py-2">
                <button
                  (click)="onEditProduct(product)"
                  class="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  (click)="onDeleteProduct(product.id)"
                  class="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Pagination -->
        <div class="mt-4 flex justify-between items-center">
          <div>
            <span class="text-gray-600">
              Showing {{ startIndex }} to {{ endIndex }} of {{ totalItems }} items
            </span>
          </div>
          <div class="flex gap-2">
            <button
              (click)="onPageChange(currentPage - 1)"
              [disabled]="currentPage === 1"
              class="px-3 py-1 rounded border"
              [class.opacity-50]="currentPage === 1"
            >
              Previous
            </button>
            <button
              (click)="onPageChange(currentPage + 1)"
              [disabled]="endIndex >= totalItems"
              class="px-3 py-1 rounded border"
              [class.opacity-50]="endIndex >= totalItems"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  selectedProduct: Product | null = null;
  currentPage = 1;
  pageSize = 10;
  totalItems = 0;

  get startIndex(): number {
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  get endIndex(): number {
    return Math.min(this.currentPage * this.pageSize, this.totalItems);
  }

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts(this.currentPage, this.pageSize).subscribe(
      response => {
        this.products = response.data;
        this.totalItems = response.count;
      }
    );
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadProducts();
  }

  onCreateProduct(productData: Omit<Product, 'id' | 'created_at'>) {
    this.productService.createProduct(productData).subscribe(() => {
      this.loadProducts();
    });
  }

  onEditProduct(product: Product) {
    this.selectedProduct = product;
  }

  onDeleteProduct(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.loadProducts();
      });
    }
  }
}