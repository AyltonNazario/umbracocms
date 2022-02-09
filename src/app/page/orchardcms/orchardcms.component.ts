import { Component, OnInit } from '@angular/core';
import { CarouselItem } from 'src/app/app.component';
import { ContentService } from 'src/app/core/services/content.service';
import { environment } from 'src/environments/environment';

interface common {
  common: {
    link: {
      text: string;
      url: string;
    };
    media: {
      paths: Array<string>;
      urls: Array<string>;
    };
    text: string;
  };
}

interface orchardPostResponse {
  data: {
    post: Array<common>
  }
}

@Component({
  selector: 'app-orchardcms',
  templateUrl: './orchardcms.component.html',
  styleUrls: ['./orchardcms.component.scss']
})
export class OrchardcmsComponent implements OnInit {

  carouselItems: CarouselItem[] = [];

  constructor(protected contentService: ContentService) { }

  ngOnInit(): void {
    this.handleOrchardCMS();
  }

  private handleOrchardCMS() {
    let path = 'api/graphql';
    let options = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    };
    let method = 'POST';
    let query = `query MyQuery {
      post {
        common {
          text
          link {
            text
            url
          }
          media {
            paths
            urls
          }
        }
      }
    }
    `
    let domain = environment.orchardcms.endpoint;

    this.contentService.buildRequest(path, options, domain, method, JSON.stringify({ query })).subscribe((content: orchardPostResponse) => {

      this.carouselItems = [];
      content.data.post.forEach((item) => {
        let carouselItem: CarouselItem = {
          description: '',
          img: '',
          buttonLink: '',
          buttonText: '',
        };
        carouselItem.buttonLink = item.common.link.url;
        carouselItem.buttonText = item.common.link.text;
        carouselItem.img = `${environment.orchardcms.endpoint}${item.common.media.urls[0]}`;
        carouselItem.description = item.common.text;
        this.carouselItems.push(carouselItem);
      });
    })
  }
}
