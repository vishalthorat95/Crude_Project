import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Product } from '../models/product.model';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private supabase: SupabaseService) {}

  getProducts(
    page: number = 1,
    pageSize: number = 10
  ): Observable<{ data: Product[]; count: number }> {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    return from(
      Promise.all([
        this.supabase.client
          .from('products')
          .select(
            `
            id,
            name,
            description,
            price,
            category_id,
            created_at,
            categories (
              id,
              name
            )
          `,
            { count: 'exact' }
          )
          .order('created_at', { ascending: false })
          .range(from, to),

        this.supabase.client
          .from('products')
          .select('*', { count: 'exact', head: true }),
      ])
    ).pipe(
      map(([productsResponse, countResponse]) => ({
        data: productsResponse.data as Product[],
        count: countResponse.count || 0,
      }))
    );
  }

  getProduct(id: number): Observable<Product> {
    return from(
      this.supabase.client
        .from('products')
        .select(
          `
          *,
          categories (
            id,
            name
          )
        `
        )
        .eq('id', id)
        .single()
    ).pipe(map((response) => response.data as Product));
  }

  createProduct(
    product: Omit<Product, 'id' | 'created_at'>
  ): Observable<Product> {
    return from(
      this.supabase.client
        .from('products')
        .insert([product])
        .select(
          `
          *,
          categories (
            id,
            name
          )
        `
        )
        .single()
    ).pipe(map((response) => response.data as Product));
  }

  updateProduct(id: number, product: Partial<Product>): Observable<Product> {
    return from(
      this.supabase.client
        .from('products')
        .update(product)
        .eq('id', id)
        .select(
          `
          *,
          categories (
            id,
            name
          )
        `
        )
        .single()
    ).pipe(map((response) => response.data as Product));
  }

  deleteProduct(id: number): Observable<void> {
    return from(
      this.supabase.client.from('products').delete().eq('id', id)
    ).pipe(map(() => void 0));
  }
}
