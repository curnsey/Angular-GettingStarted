import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { IProduct } from './product';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private productUrl = 'api/products/products.json';
    constructor(private http: HttpClient){}
    products: IProduct[] = [
        {
          "productId": 1,
          "productName": "Leaf Rake",
          "productCode": "GDN-0011",
          "releaseDate": "March 19, 2016",
          "description": "Leaf rake with 48-inch wooden handle.",
          "price": 19.95,
          "starRating": 3.2,
          "imageUrl": "./assets/images/rake.jpg"
        },
        {
          "productId": 2,
          "productName": "Lawn Mower",
          "productCode": "GPM-0023",
          "releaseDate": "March 18, 2016",
          "description": "139cc Gas Powered Lawn Mower",
          "price": 32.99,
          "starRating": 4.2,
          "imageUrl": "./assets/images/lawn-equipment.png"
        },
        {
          "productId": 5,
          "productName": "Hammer",
          "productCode": "TBX-0048",
          "releaseDate": "May 21, 2016",
          "description": "Curved claw steel hammer",
          "price": 8.9,
          "starRating": 4.8,
          "imageUrl": "./assets/images/hammer.jpg"
        },
        {
          "productId": 8,
          "productName": "Saw",
          "productCode": "TBX-0022",
          "releaseDate": "May 15, 2016",
          "description": "15-inch steel blade hand saw",
          "price": 11.55,
          "starRating": 3.7,
          "imageUrl": "./assets/images/saw.gif"
        },
        {
          "productId": 10,
          "productName": "Video Game Controller",
          "productCode": "GMG-0042",
          "releaseDate": "October 15, 2015",
          "description": "Standard two-button video game controller",
          "price": 35.95,
          "starRating": 4.6,
          "imageUrl": "./assets/images/vg-cont.jpg"
        }
      ];
    getProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.productUrl).pipe(
            tap(data => console.log(`All: ${JSON.stringify(data)}`)), 
            catchError(this.handleError)
        );
    }
    getProduct(id: number){
        this.products.forEach(element => {
            if(element.productId == id) return element;
        });
    }

    private handleError(err: HttpErrorResponse){
        let errorMessage = '';
        if(err.error instanceof ErrorEvent) errorMessage = `An error occurred: ${err.error.message}`;
        else errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        console.log(errorMessage);
        return throwError(errorMessage);
    }
}