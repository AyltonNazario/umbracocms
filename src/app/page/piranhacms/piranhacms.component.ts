import { Component, OnInit } from '@angular/core';
import { CarouselItem } from 'src/app/app.component';
import { ContentService } from 'src/app/core/services/content.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-piranhacms',
  templateUrl: './piranhacms.component.html',
  styleUrls: ['./piranhacms.component.scss']
})
export class PiranhacmsComponent implements OnInit {

  carouselItems: CarouselItem[] = [];

  constructor(protected contentService: ContentService) { }

  ngOnInit(): void {
    this.handlePiranhaCMS();
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

  private createDiv(content: string): HTMLDivElement {
    let div = document.createElement("div");
    div.innerHTML = content;
    return div;
  }

  private buildCarouselItem(content: HTMLDivElement): CarouselItem {
    let img = content.getElementsByTagName('img')[0];
    let imgUrl = environment.defaultURL + '/' + img.src.replace(img.baseURI, '');
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

}
