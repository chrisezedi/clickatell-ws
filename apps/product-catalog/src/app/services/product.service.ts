import { HttpClient, HttpParams } from '@angular/common/http';
import { DestroyRef, inject, Injectable } from '@angular/core';
import { Filters, Product } from '../../models/product';
import { environment } from '../../environments/environment.development';
import { Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  private destroy$ = new Subject<void>();
  constructor() {
    this.destroyRef.onDestroy(() => {
      this.destroy$.next();
      this.destroy$.complete();
    });
  }

  private getParams(payload:any) {
    let params = new HttpParams();
    Object.keys(payload).forEach((key) => {
      params = params.set(
        key,
        payload[key as keyof Filters].toString()
      );
    });
    return params;
  }

  getProducts(filters?: Filters) {
    return this.http
      .get<Product[]>(`${environment.apiUrl}/products`,{params:this.getParams(filters)})
      .pipe(takeUntil(this.destroy$));
  }
}
