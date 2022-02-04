import { Component } from '@angular/core';

export interface CarouselItem {
  description: string;
  img: string;
  buttonLink: string;
  buttonText: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  constructor() {}

  ngOnInit(): void {
  }

  ngOnDestroy() {
  }
}
