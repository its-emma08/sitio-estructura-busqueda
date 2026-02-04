import { Component, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare var anime: any;

@Component({
  selector: 'app-mapa-sitio',
  imports: [],
  templateUrl: './mapa-sitio.html',
  styleUrl: './mapa-sitio.css',
})
export class MapaSitio implements AfterViewInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.animateSitemap();
    }
  }

  private animateSitemap() {
    anime.timeline()
      .add({
        targets: '.section-title',
        opacity: [0, 1],
        translateY: [-20, 0],
        duration: 800,
        easing: 'easeOutExpo'
      })
      .add({
        targets: '.tree-node',
        scale: [0, 1],
        opacity: [0, 1],
        delay: anime.stagger(150, { grid: [3, 5], from: 'center' }),
        duration: 800,
        easing: 'spring(1, 80, 10, 0)'
      })
      .add({
        targets: '.connector',
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: 1000,
        easing: 'easeInOutSine'
      }, '-=600');
  }
}
