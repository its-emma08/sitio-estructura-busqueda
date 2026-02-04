import { Component, OnDestroy, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { NgFor, NgIf, isPlatformBrowser } from '@angular/common';

type Crumb = {
  label: string;
  url: string;
};

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [RouterModule, NgFor, NgIf],
  templateUrl: './breadcrumb.html',
  styleUrls: ['./breadcrumb.css'],
})
export class Breadcrumb implements OnInit, OnDestroy {

  crumbs: Crumb[] = [];
  private subscription?: Subscription;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    // 🔐 SOLO en navegador (evita crash en SSR)
    if (isPlatformBrowser(this.platformId)) {
      this.subscription = this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe(() => this.buildBreadcrumbs());
    }

    // Construcción inicial (segura)
    this.buildBreadcrumbs();
  }

  private buildBreadcrumbs(): void {
    const url = this.router.url.split('?')[0].split('#')[0];
    const segments = url.split('/').filter(Boolean);

    const labelMap: Record<string, string> = {
      elementos: 'Elementos',
      menu: 'Menú',
      breadcrumbs: 'Breadcrumb',
      'mapa-sitio': 'Mapa del sitio',
    };

    const breadcrumbs: Crumb[] = [{ label: 'Inicio', url: '/' }];

    let currentUrl = '';
    for (const segment of segments) {
      currentUrl += `/${segment}`;
      breadcrumbs.push({
        label: labelMap[segment] ?? this.formatLabel(segment),
        url: currentUrl,
      });
    }

    this.crumbs = breadcrumbs;
  }

  private formatLabel(text: string): string {
    return text
      .replace(/-/g, ' ')
      .replace(/\b\w/g, letter => letter.toUpperCase());
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
