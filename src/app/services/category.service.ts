import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Category } from '../models/category.model';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private supabase: SupabaseService) {}

  getCategories(): Observable<Category[]> {
    return from(
      this.supabase.client
        .from('categories')
        .select('*')
        .order('created_at', { ascending: false })
    ).pipe(
      map(response => response.data as Category[])
    );
  }

  getCategory(id: number): Observable<Category> {
    return from(
      this.supabase.client
        .from('categories')
        .select('*')
        .eq('id', id)
        .single()
    ).pipe(
      map(response => response.data as Category)
    );
  }

  createCategory(category: Omit<Category, 'id' | 'created_at'>): Observable<Category> {
    return from(
      this.supabase.client
        .from('categories')
        .insert([category])
        .select()
        .single()
    ).pipe(
      map(response => response.data as Category)
    );
  }

  updateCategory(id: number, category: Partial<Category>): Observable<Category> {
    return from(
      this.supabase.client
        .from('categories')
        .update(category)
        .eq('id', id)
        .select()
        .single()
    ).pipe(
      map(response => response.data as Category)
    );
  }

  deleteCategory(id: number): Observable<void> {
    return from(
      this.supabase.client
        .from('categories')
        .delete()
        .eq('id', id)
    ).pipe(
      map(() => void 0)
    );
  }
}