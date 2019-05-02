import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { IProduct } from './product';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private errorMessage: string;
    private productUrl = 'https://api.mockaroo.com/api/f00a95b0?count=200&key=38387980';
    constructor(private http: HttpClient){}
    products: IProduct[];
    getProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.productUrl).pipe(
            tap(data => {
              localStorage.setItem("products", JSON.stringify(data));
              console.log('All: ' + JSON.stringify(data));
            }), 
            catchError(this.handleError)
        );
    }
    getProduct(id: number): Observable<IProduct | undefined> {
      return this.getProducts().pipe(
        map((products: IProduct[]) => products.find(p => p.productId === id))
      );
    }

    private handleError(err: HttpErrorResponse){
        let errorMessage = '';
        if(err.error instanceof ErrorEvent) errorMessage = `An error occurred: ${err.error.message}`;
        else errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        console.log(errorMessage);
        return throwError(errorMessage);
    }
}