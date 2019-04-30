import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core'

@Component({
        selector: 'pm-star',
        templateUrl: './star.component.html',
        styleUrls: ['./star.component.css']
})

export class StarComponent implements OnChanges{
    starWidth: number;
    @Input() rating: number;
    @Output() notify: EventEmitter<string> = new EventEmitter<string>();
    RatingClicked(){
        this.notify.emit(`My rating is ${this.rating}.`);
    }
    ngOnChanges(): void{
        this.starWidth = this.rating * 150 / 5;
    }
}
