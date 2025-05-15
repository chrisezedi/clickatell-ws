import { Component, input, OnInit, output, signal } from '@angular/core';
import { Category, Filters, Product } from '../../models/product';
import { NgSelectComponent } from '@ng-select/ng-select';
@Component({
  selector: 'app-product',
  imports: [NgSelectComponent],
  template: `
    <main>
      <header>
        <h1>Product Catalog</h1>

        <button (click)="toggleFilter()">Filter</button>
      </header>

      @if(showFilter()){
        <section class="filters">
          <h1>Filters</h1>

          <h3>Categories</h3>

          <ng-select [items]="categories()"
           bindLabel="name"
           placeholder="Select a category"
           (change)="filterByCategory.emit({categoryId:$event.id})"
           />
        </section>
      }

      @for(product of products();track product.id){
      <div class="product">
        <img [src]="product.images[0]" />
        <small class="category"
          ><b>{{ product?.category?.name }}</b></small
        >
        <p>{{ product?.title }}</p>
      </div>
      }
    </main>
  `,
  styles: `
    header{
      display:flex;
      justify-content:space-between;
      align-items:center;
      margin-bottom:30px;
      border-bottom:1px solid grey;
      padding:10px 5px;
    }
    button{
      background-color: #3498db;
      color: white;
      border: none;
      border-radius: 4px;
      padding: 10px 15px;
      font-size: 16px;
      cursor: pointer;
    }
    .filters{
      margin:30px 0;
      border:1px solid gainsboro;
      padding:10px;
      border-radius:5px;
    }

    .product{
      display:flex;
      flex-direction:column;
      margin-bottom:40px;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .category{
      margin:10px 0
    }

    img{
      width:100%;
      height:auto
    }
  `,
})
export class ProductComponent implements OnInit {
  showFilter = signal(false);
  products = input.required<Product[]>();
  categories = input.required<Category[]>();

  filterByCategory = output<Filters>();
  ngOnInit(): void {
    console.log('cat', this.categories());
  }

  toggleFilter(){
    this.showFilter.update(value => !value);
  }
}
