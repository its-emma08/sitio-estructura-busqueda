import { Component, AfterViewInit, ElementRef, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterModule, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { isPlatformBrowser, AsyncPipe, NgIf } from '@angular/common'; // AsyncPipe for observable
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../services/theme.service';

declare var anime: any;

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, FormsModule, AsyncPipe, NgIf],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout implements AfterViewInit {

  isMobileMenuOpen = false;
  searchQuery = ''; // For Header Input sync
  isDark$;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private themeService: ThemeService
  ) {
    this.isDark$ = this.themeService.darkMode$;
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.animateHeader();
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  toggleTheme() {
    this.themeService.toggle();
  }

  goToSearch() {
    if (this.searchQuery && this.searchQuery.trim().length > 0) {
      this.router.navigate(['/busqueda'], { queryParams: { q: this.searchQuery } });
      // Optional: clear header input or keep it synced? 
      // Keeping it allows user to refine, clearing it feels cleaner.
      // Let's clear to avoid confusion if they navigate back.
      this.searchQuery = '';
    }
  }

  private animateHeader() {
    // Simple entry animation for header
    anime({
      targets: '.top-header',
      translateY: [-70, 0],
      opacity: [0, 1],
      easing: 'easeOutExpo',
      duration: 1000
    });
  }
}