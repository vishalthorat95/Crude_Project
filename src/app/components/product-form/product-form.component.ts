import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../models/product.model';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="productForm" (ngSubmit)="onSubmit()" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          formControlName="name"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          formControlName="description"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        ></textarea>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Price</label>
        <input
          type="number"
          formControlName="price"
          step="0.01"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Category</label>
        <select
          formControlName="category_id"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        >
          <option value="">Select a category</option>
          <option *ngFor="let category of categories" [value]="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>

      <button
        type="submit"
        [disabled]="!productForm.valid"
        class="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {{ product ? 'Update' : 'Create' }} Product
      </button>
    </form>
  `
})
export class ProductFormComponent implements OnInit {
  @Input() product?: Product;
  @Output() submitProduct = new EventEmitter<Omit<Product, 'id' | 'created_at'>>();

  productForm: FormGroup;
  categories: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      category_id: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadCategories();
    if (this.product) {
      this.productForm.patchValue(this.product);
    }
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(
      categories => this.categories = categories
    );
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.submitProduct.emit(this.productForm.value);
      this.productForm.reset();
    }
  }
}