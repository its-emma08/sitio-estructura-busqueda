import { Component, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare var anime: any;

@Component({
  selector: 'app-elementos-sitio',
  imports: [],
  templateUrl: './elementos-sitio.html',
  styleUrl: './elementos-sitio.css',
})
export class ElementosSitio implements AfterViewInit {

  // Interactive Diagram State
  hoveredElement: string | null = null;

  setHover(section: string) {
    this.hoveredElement = section;
  }

  clearHover() {
    this.hoveredElement = null;
  }

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.animateElements();
    }
  }

  private animateElements() {
    anime.timeline()
      .add({
        targets: '.section-title',
        opacity: [0, 1],
        translateX: [-40, 0],
        duration: 900,
        easing: 'easeOutExpo'
      })
      .add({
        targets: '.element-card', // Verified class in HTML
        opacity: [0, 1],
        scale: [0.95, 1], // Subtle scale
        translateY: [20, 0],
        duration: 800,
        delay: anime.stagger(150),
        easing: 'easeOutExpo'
      }, '-=400');

    anime({
      targets: '.element-icon',
      rotate: [0, 360],
      duration: 4000,
      delay: anime.stagger(250),
      easing: 'linear',
      loop: true
    });

    anime({
      targets: '.info-box',
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 800,
      delay: 1200,
      easing: 'easeOutQuad'
    });
  }
}
