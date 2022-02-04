import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarouselItem } from 'src/app/app.component';
import { ContentService } from 'src/app/core/services/content.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  @Input() isPiranha: string | undefined;
  @Input() isContentStack: string | undefined;

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
              protected contentService: ContentService) { }

  ngOnInit(): void {
    if (this.isPiranha) this.handlePiranhaCMS();
    if (this.isContentStack) this.handleContentStack();
  }

  private handlePiranhaCMS() {
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

  private handleContentStack() {
    let path = `v3/content_types/${environment.contentStack.content_type_uid}/entries?environment=${environment.contentStack.environment}`;
    let options = {
      headers: {
        api_key: environment.contentStack.api_key,
        access_token: environment.contentStack.delivery_token,
      },
    };
    this.contentService
    .buildRequest(path, options, environment.contentStack.endpoint)
    .subscribe((content: any) => {

      this.carouselItems = [];
      content.entries.forEach((entrie: any) => {
        let carouselItem: CarouselItem = {
          description: entrie.newstext,
          img: entrie.newsimage.url,
          buttonLink: entrie.url,
          buttonText: 'Saiba mais'
        };

        this.carouselItems.push(carouselItem);
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
      window.open(link, '_blank');
    }
  }
}
