import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="categoryForm" (ngSubmit)="onSubmit()" class="space-y-4">
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

      <button
        type="submit"
        [disabled]="!categoryForm.valid"
        class="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {{ category ? 'Update' : 'Create' }} Category
      </button>
    </form>
  `
})
export class CategoryFormComponent implements OnInit {
  @Input() category?: Category;
  @Output() submitCategory = new EventEmitter<Omit<Category, 'id' | 'created_at'>>();

  categoryForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (this.category) {
      this.categoryForm.patchValue(this.category);
    }
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      this.submitCategory.emit(this.categoryForm.value);
      this.categoryForm.reset();
    }
  }
}