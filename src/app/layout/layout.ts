import { Component, AfterViewInit, ElementRef, ViewChild, Inject, PLATFORM_ID, inject } from '@angular/core';
import { Router, RouterModule, RouterLink, RouterLinkActive, RouterOutlet, ChildrenOutletContexts } from '@angular/router';
import { isPlatformBrowser, AsyncPipe, NgIf } from '@angular/common'; // AsyncPipe for observable
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../services/theme.service';
import { fadeAnimation } from '../animations';

declare var anime: any;

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, FormsModule, AsyncPipe, NgIf],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
  animations: [fadeAnimation]
})
export class Layout implements AfterViewInit {

  isMobileMenuOpen = false;
  searchQuery = ''; // For Header Input sync
  isDark$;

  private contexts = inject(ChildrenOutletContexts);

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
      this.searchQuery = '';
    }
  }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
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