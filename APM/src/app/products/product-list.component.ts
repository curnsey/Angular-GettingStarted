import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css'],
    providers: [ProductService]
})

export class ProductListComponent implements OnInit{
    pageTitle: string = 'Product List';
    imgWidth: any = 40;
    imgMargin: any = 2;
    showImage: boolean = false;
    errorMessage: string = null;

    _listFilter: string;
    get listFilter(): string{ return this._listFilter;};
    set listFilter(value: string){ 
      this._listFilter = value;
      this.filteredProducts = this.performFilter(this.listFilter);
    };

    products: IProduct[];
    filteredProducts: IProduct[];
    performFilter(filterBy: string): IProduct[] {
      filterBy = filterBy.toLowerCase();
      localStorage.setItem('filter', filterBy);
      return this.products.filter((p: IProduct)=> p.productName.toLowerCase().indexOf(filterBy) !== -1);
    };

    toggleImage(): void {
      this.showImage = !this.showImage;
    };

    constructor(private productService: ProductService){
    }

    ngOnInit() : void {
      console.log('Initing...');
      if(localStorage.getItem("products")){
        this.products = (JSON.parse(localStorage.getItem('products')));
        this.filteredProducts = this.performFilter(localStorage.getItem('filter') || '');
        console.log(`Current Cache: ${JSON.stringify(this.products)}`);
      }
      else{
        console.log(`need to update cache...`);
        this.productService.getProducts().subscribe(
          products => {this.products = products; this.filteredProducts = this.performFilter(localStorage.getItem('filter') || '');},
          error => this.errorMessage = <any>error
        );
      }
      this._listFilter = localStorage.getItem('filter');
    };
    onNotify(message: string): void{
      console.log(message);
    }
}