import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'sanitize'
})
export class SanitizePipe implements PipeTransform {
  constructor(private sanitize: DomSanitizer) { };
  transform(value: string, type?: string): unknown {
      switch(type) {
          case 'html': 
          return this.sanitize.bypassSecurityTrustHtml(value)
          default: 
          return this.sanitize.bypassSecurityTrustUrl(value);
      };  
  }

}
