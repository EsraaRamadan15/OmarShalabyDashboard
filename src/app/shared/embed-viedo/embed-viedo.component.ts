import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-embed-viedo',
  templateUrl: './embed-viedo.component.html',
  styleUrls: ['./embed-viedo.component.css'],
})
export class EmbedViedoComponent implements OnInit {
  @Input() key: string = '';

  videoUrl: SafeResourceUrl = '';
  constructor(private sanatizer: DomSanitizer) {}

  ngOnInit(): void {
    // this.videoUrl = this.transform(
    //   'https://hykerz.business-book.site/' + this.key
    // );
  }
  // transform(url: string) {
  //   return this.sanatizer.bypassSecurityTrustResourceUrl(url);
  // }
  // getSaveUrl(url: string) {
  //   return this.sanatizer.bypassSecurityTrustResourceUrl(url);
  // }
}
