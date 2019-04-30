import { Component } from '@angular/core';

@Component({
  selector: 'pm-root',
  //templateUrl: './app.component.html',
  template: `
  <div style="text-align:center">
      <h1>
        Welcome to {{pageTitle}}
      </h1>
    </div>
    <pm-products></pm-products>
    `
})

export class AppComponent {
  pageTitle: string = `Adam's Corner Store`;
}
