/* MODULES */
import { RouterModule } from '@angular/router'
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

/* COMPONENTS */
import { AppComponent } from './app.component';
import { ProductListComponent } from './products/product-list.component';
import { StarComponent } from './shared/star-rating/star.component';
import { ProductDetailComponent } from './products/product-detail.component';
import { WelcomeComponent } from './home/welcome.component';

/* PIPES */
import { ConvertToSpacesPipe } from './shared/convert-to-spaces.pipe';

/* GUARDS */
import { ProductDetailGuard } from './products/product-detail.guard';

@NgModule({
  declarations: [
    AppComponent, 
    ProductListComponent,
    ConvertToSpacesPipe,
    StarComponent,
    ProductDetailComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'products', component: ProductListComponent },
      { path: 'products/:id', canActivate: [ ProductDetailGuard ], component: ProductDetailComponent }, 
      { path: 'welcome', component: WelcomeComponent, pathMatch: 'full' }, 
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' } // wildcard usually redirects to 404 page
    ])
    //RouterModule.forRoot([], { useHash: true }) // to use hash routing
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
