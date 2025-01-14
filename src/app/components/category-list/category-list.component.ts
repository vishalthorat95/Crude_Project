import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
import { CategoryFormComponent } from '../category-form/category-form.component';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, CategoryFormComponent],
  template: `
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">Categories</h1>
      
      <app-category-form
        (submitCategory)="onCreateCategory($event)"
      ></app-category-form>

      <div class="mt-6">
        <table class="min-w-full">
          <thead>
            <tr>
              <th class="px-4 py-2">Name</th>
              <th class="px-4 py-2">Description</th>
              <th class="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let category of categories">
              <td class="border px-4 py-2">{{ category.name }}</td>
              <td class="border px-4 py-2">{{ category.description }}</td>
              <td class="border px-4 py-2">
                <button
                  (click)="onEditCategory(category)"
                  class="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  (click)="onDeleteCategory(category.id)"
                  class="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];
  selectedCategory: Category | null = null;

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(
      categories => this.categories = categories
    );
  }

  onCreateCategory(categoryData: Omit<Category, 'id' | 'created_at'>) {
    this.categoryService.createCategory(categoryData).subscribe(() => {
      this.loadCategories();
    });
  }

  onEditCategory(category: Category) {
    this.selectedCategory = category;
  }

  onDeleteCategory(id: number) {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteCategory(id).subscribe(() => {
        this.loadCategories();
      });
    }
  }
}