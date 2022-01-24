import { Component } from '@angular/core';
import { Router } from '@angular/router';

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

  carouselItems: CarouselItem[] = [
    { description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ut ante lorem.",
      img: "assets/hi-tech-enterprise-smart-assistant.jpg",
      buttonLink: "https://www.itau.com.br",
      buttonText: "Saiba mais"
    },
    { description: "Aliquam ullamcorper laoreet malesuada. Aliquam metus nisi, posuere blandit dignissim sit amet, sodales non libero.",
      img: "assets/lightbulb-illuminating-floor-background.jpg",
      buttonLink: "https://www.itau.com.br",
      buttonText: "Saiba mais"
    }
  ];
  carouselImgNF: string = 'assets/images/carousel-img-notfound.png';
  currentSlide: number = 0;

  constructor(protected router: Router) {}

  ngOnInit(): void {
  }

  onPreviousClick() {
    const previous = this.currentSlide - 1;
    this.currentSlide = previous < 0 ? this.carouselItems?.length - 1 : previous;
  }

  onNextClick() {
    const next = this.currentSlide + 1;
    this.currentSlide = next === this.carouselItems?.length ? 0 : next;
  }

  setCurrent($event: any) {
    this.currentSlide = +$event.target.id;
  }

  onLinkClick(link: string){
    if (link) {
      window.open(link, '_blank');
    }
  }

  ngOnDestroy() {
  }
}
