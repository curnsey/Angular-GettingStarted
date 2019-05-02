import { Component } from '@angular/core';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html'
//  template: `
//  <div style="text-align:center">
//  </div>
//  <pm-products></pm-products>
//  `
})

export class AppComponent {
  pageTitle: string = `Adam's Grocery Store`;
}
