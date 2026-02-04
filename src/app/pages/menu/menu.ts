import { Component, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare var anime: any;

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu implements AfterViewInit {
  // Playground State
  isMockMenuOpen = false;

  toggleMockMenu() {
    this.isMockMenuOpen = !this.isMockMenuOpen;
  }

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.animateMenuItems();
      this.addMenuInteractions();
    }
  }

  private animateMenuItems() {
    anime.timeline()
      .add({
        targets: '.menu-title',
        opacity: [0, 1],
        translateY: [-25, 0],
        duration: 700,
        easing: 'easeOutExpo'
      })
      .add({
        targets: '.menu-item-row', // Verified class in HTML
        opacity: [0, 1],
        translateX: [-30, 0],
        duration: 800,
        delay: anime.stagger(150),
        easing: 'easeOutQuint'
      }, '-=300')
      .add({
        targets: '.benefit-section',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800,
        easing: 'easeOutQuad'
      }, '-=200');
  }

  private addMenuInteractions() {
    const cards = document.querySelectorAll('.menu-item-card');
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        anime({
          targets: card.querySelector('.menu-item-icon'),
          scale: 1.2,
          rotate: 10,
          duration: 400,
          easing: 'easeOutQuart'
        });
      });

      card.addEventListener('mouseleave', () => {
        anime({
          targets: card.querySelector('.menu-item-icon'),
          scale: 1,
          rotate: 0,
          duration: 400,
          easing: 'easeOutQuart'
        });
      });
    });
  }
}
