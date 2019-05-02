import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router} from '@angular/router';


import { IProduct } from './product'
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  private errorMessage: string;
  pageTitle: string = 'Product Detail';
  product: IProduct | undefined;
  constructor(private route: ActivatedRoute, 
    private router: Router,
    private productService: ProductService) { 
    console.log(this.route.snapshot.paramMap.get('id'));
  }

  onBack(): void{
    this.router.navigate(['/products']);
  }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id'); //the plus converts from string to numeric Id
    this.pageTitle += `: ${id}`;
    if(localStorage.getItem('products')){
      this.product = (<IProduct[]>JSON.parse(localStorage.getItem('products'))).filter(x=>x.productId == id)[0];
    }
    else{
    this.productService.getProduct(id).subscribe(
      product => this.product = product,
      error => this.errorMessage = <any>error);
    }
  }

}
