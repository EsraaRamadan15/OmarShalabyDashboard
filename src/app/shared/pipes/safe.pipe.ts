import { Input, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safe',
})
export class SafePipe implements PipeTransform {
  @Input() site: string = '';
  @Input() key: string | null = null;
  videoUrl: SafeResourceUrl = '';
  constructor(private sanitizer: DomSanitizer) {}

  transform(url: any) {
    console.log(url, 'ueyyyyy');
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
