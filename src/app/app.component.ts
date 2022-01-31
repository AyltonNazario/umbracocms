import { environment } from 'src/environments/environment';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContentService } from './core/services/content.service';

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

  constructor(protected router: Router,
              protected contentService: ContentService) {}

  ngOnInit(): void {
    this.contentService.buildRequest('api/page/carousel').subscribe((content: any) => {

      this.carouselItems = [];
      content.blocks.forEach((block: any) => {
        if (block.$type.startsWith('Piranha.Extend.Blocks.HtmlBlock')) {
          let div: HTMLDivElement = this.createDiv(block.body.value);
          let carouselItem: CarouselItem = this.buildCarouselItem(div);
          this.carouselItems.push(carouselItem);
        }
      });
    })

  }

  private createDiv(content: string): HTMLDivElement {
    let div = document.createElement("div");
    div.innerHTML = content;
    return div;
  }

  private buildCarouselItem(content: HTMLDivElement): CarouselItem {
    let img = content.getElementsByTagName('img')[0];
    let imgUrl = environment.assetsURL + '/' + img.src.replace(img.baseURI, '');
    let a = content.getElementsByTagName('a')[0];
    let pCollectionLength = content.getElementsByTagName('p').length;
    let desc: string = '';
    for (let i = 0; i < pCollectionLength; i++) {
      if (content.getElementsByTagName('p')[i].childElementCount === 0) {
        desc = content.getElementsByTagName('p')[i].innerText;
      }
    }
    let carouselItem: CarouselItem = {
        description: desc,
        img: imgUrl,
        buttonLink: a.href,
        buttonText: a.innerText
      };

    return carouselItem;
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
      // if (link.indexOf('http') === -1) {
      //   link = environment.assetsURL.replace('5000', '4200') + link;
      // }
      window.open(link, '_blank');
    }
  }

  ngOnDestroy() {
  }
}
