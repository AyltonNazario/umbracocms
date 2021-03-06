import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private httpClient: HttpClient,
    private sanitizer: DomSanitizer) { }

  public buildRequest(path: string, options?: any, domain?: string, method?: string, body?: any): any  {

    switch (method?.toUpperCase()) {
      case 'POST':
        return this.httpClient.post(`${domain? domain : environment.defaultURL}/${path}`,
        body,
        options);
      default:
        return this.httpClient.get(`${domain? domain : environment.defaultURL}/${path}`, options);
    };
  }
}
