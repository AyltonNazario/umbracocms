import { Component, OnInit } from '@angular/core';
import { CarouselItem } from 'src/app/app.component';
import { ContentService } from 'src/app/core/services/content.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contentstack',
  templateUrl: './contentstack.component.html',
  styleUrls: ['./contentstack.component.scss']
})
export class ContentstackComponent implements OnInit {

  carouselItems: CarouselItem[] = [];

  constructor(protected contentService: ContentService) { }

  ngOnInit(): void {
    this.handleContentStack();
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
}
