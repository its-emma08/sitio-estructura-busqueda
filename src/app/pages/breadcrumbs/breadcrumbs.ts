import { Component, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser, CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JsonLdService } from '../../services/json-ld.service';

declare var anime: any;

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [CommonModule, FormsModule, NgFor, NgIf],
  templateUrl: './breadcrumbs.html',
  styleUrl: './breadcrumbs.css',
})
export class Breadcrumbs implements AfterViewInit {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private jsonLd: JsonLdService
  ) { }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.animateBreadcrumbs();
      this.addBreadcrumbInteractions();

      // Inject Initial JSON-LD
      this.jsonLd.insertSchema({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://devstructure.com/" },
          { "@type": "ListItem", "position": 2, "name": "Rutas", "item": "https://devstructure.com/breadcrumbs" }
        ]
      });
    }
  }

  // Interactive Lab Logic
  inputPath: string = 'Inicio > Productos > Electrónica > Smartphones';

  get breadcrumbsList(): string[] {
    return this.inputPath.split('>').map(s => s.trim()).filter(s => s.length > 0);
  }

  get jsonLdCode(): string {
    const items = this.breadcrumbsList.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item,
      "item": `https://example.com/${item.toLowerCase().replace(/\s+/g, '-')}`
    }));

    const schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items
    };

    return JSON.stringify(schema, null, 2);
  }

  private animateBreadcrumbs() {
    anime.timeline()
      .add({
        targets: '.breadcrumb-title',
        opacity: [0, 1],
        translateY: [-25, 0],
        duration: 700,
        easing: 'easeOutExpo'
      })
      .add({
        targets: '.benefit-box',
        opacity: [0, 1],
        scale: [0.8, 1],
        duration: 700,
        delay: anime.stagger(130),
        easing: 'easeOutBack'
      }, '-=300')
      .add({
        targets: '.type-card', // Verified class in HTML
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800,
        delay: anime.stagger(150),
        easing: 'easeOutCubic'
      }, '-=200')
      .add({
        targets: '.code-section',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800,
        easing: 'easeOutQuad'
      }, '-=200');

    anime({
      targets: '.breadcrumb-icon',
      rotate: [0, 360],
      duration: 5000,
      easing: 'linear',
      loop: true
    });
  }

  private addBreadcrumbInteractions() {
    const cards = document.querySelectorAll('.breadcrumb-type-card');
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        anime({
          targets: card,
          scale: 1.05,
          boxShadow: '0px 10px 30px rgba(0,0,0,0.2)',
          duration: 400,
          easing: 'easeOutQuart'
        });
      });

      card.addEventListener('mouseleave', () => {
        anime({
          targets: card,
          scale: 1,
          boxShadow: '0px 2px 10px rgba(0,0,0,0.1)',
          duration: 400,
          easing: 'easeOutQuart'
        });
      });
    });
  }
}
