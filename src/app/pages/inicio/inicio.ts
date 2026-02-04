import { Component, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare var anime: any;

@Component({
  selector: 'app-inicio',
  imports: [],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio implements AfterViewInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.animateIntro();
      this.createSakuraRain();
      this.initParallax();
      this.initScrollReveal();
    }
  }

  scrollToGrid() {
    const element = document.getElementById('grid-start');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  private initScrollReveal() {
    const cardsGrid = document.querySelector('.cards-grid');
    if (!cardsGrid) return;

    // Set initial state for reveal
    anime.set('.pillar-card', { opacity: 0, translateY: 50 });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          anime({
            targets: '.pillar-card',
            opacity: [0, 1],
            translateY: [50, 0],
            delay: anime.stagger(200),
            duration: 1000,
            easing: 'easeOutExpo'
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    observer.observe(cardsGrid);
  }

  private initParallax() {
    const heroSection = document.querySelector('.hero-section') as HTMLElement;
    const layerSky = document.querySelector('.layer-sky') as HTMLElement;
    const layerMountain = document.querySelector('.layer-mountain') as HTMLElement;
    const layerFore = document.querySelector('.layer-fore') as HTMLElement;

    if (!heroSection) return;

    heroSection.addEventListener('mousemove', (e) => {
      // Calculate mouse position relative to center (from -1 to 1)
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;

      // Parallax Logic: Foreground moves mostly, Background stays still
      if (layerFore) layerFore.style.transform = `translate(${x * -40}px, ${y * -20}px) scale(1.05)`;
      if (layerMountain) layerMountain.style.transform = `translate(${x * -15}px, ${y * -5}px) scale(1.02)`;
      if (layerSky) layerSky.style.transform = `translate(${x * -5}px, ${y * -2}px) scale(1.01)`;
    });
  }

  private createSakuraRain() {
    const container = document.querySelector('.sakura-container');
    if (!container) return; // Guard clause

    // Create 30 petals
    for (let i = 0; i < 30; i++) {
      const petal = document.createElement('div');
      petal.classList.add('petal');
      // Random styles
      const size = Math.random() * 15 + 10;
      petal.style.width = `${size}px`;
      petal.style.height = `${size}px`;
      petal.style.position = 'absolute';
      petal.style.background = '#FFD7E6';
      petal.style.borderRadius = '50% 0 50% 50%';
      petal.style.opacity = (Math.random() * 0.5 + 0.3).toString();
      petal.style.left = `${Math.random() * 100}vw`;
      petal.style.top = `-20px`;

      container.appendChild(petal);

      // Animate each petal
      anime({
        targets: petal,
        top: '100vh',
        left: (el: any) => {
          // Parse current left value and add variation
          return `${parseFloat(el.style.left) + (Math.random() * 20 - 10)}vw`;
        },
        rotate: () => Math.random() * 360,
        duration: () => Math.random() * 3000 + 5000, // 5-8s duration
        easing: 'linear',
        loop: true,
        delay: Math.random() * 5000
      });
    }
  }

  private animateIntro() {
    anime.timeline()
      .add({
        targets: '.hero-title',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 1200,
        easing: 'easeOutExpo'
      })
      .add({
        targets: '.hero-subtitle',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 1000,
        easing: 'easeOutExpo'
      }, '-=800')
      .add({
        targets: '.btn-primary',
        opacity: [0, 1],
        scale: [0.8, 1],
        duration: 800,
        easing: 'easeOutBack'
      }, '-=600')
      .add({
        targets: '.architecture-grid .canvas-card', /* Precise targeting for Inicio */
        opacity: [0, 1],
        translateY: [40, 0],
        duration: 900,
        delay: anime.stagger(150),
        easing: 'easeOutQuint'
      }, '-=400');
  }
}
