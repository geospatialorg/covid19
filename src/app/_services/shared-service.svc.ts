import {Injectable} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private readonly defaultTitle: string;

  constructor(private titleService: Title, private metaService: Meta) {
    this.defaultTitle = this.titleService.getTitle();
  }

  setMeta(title: string|null, keywords: string | null = null, description: string | null = null) {
    this.titleService.setTitle((title ? title + ' | ' : '') + this.defaultTitle);
    if (keywords) {
      this.metaService.addTag({name: 'keywords', content: keywords});
    }
    if (keywords) {
      this.metaService.addTag({name: 'description', content: description});
    }
  }
}
