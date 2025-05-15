import { httpResource } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Category, Filters, Product } from '../models/product';
import { environment } from '../environments/environment.development';
import { ProductComponent } from './components/product.component';
import { ProductService } from './services/product.service';

@Component({
  imports: [RouterModule,ProductComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  productService = inject(ProductService);
  loading = signal(false);
  products = signal<Product[]>([]);
  title = 'product-catalog';
  pagination = {offset:0,limit:30}

  ngOnInit(): void {
    this.getProducts(this.pagination)
  }

  categories = httpResource<Category[]>(()=>({
    url:`${environment.apiUrl}/categories`,
    method:"GET",
    params:{offset:0,limit:30}
  }));

  filterByCategory($event:Filters){
    console.log({...this.pagination,...$event})
    this.getProducts({...this.pagination,...$event});
  }

  getProducts(filters:Filters){
    this.loading.set(true);
    this.productService.getProducts(filters).subscribe({
      next:(res) => {
        this.products.set(res);
        this.loading.set(false);
      }
    })
  }
}
