import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AsyncPipe, NgIf, NgFor, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { SearchApi, SearchFilters } from '../../services/search';
import { SiteItem } from '../../data/site-index';

@Component({
  selector: 'app-busqueda',
  standalone: true,
  imports: [RouterModule, AsyncPipe, FormsModule, NgIf, NgFor, UpperCasePipe],
  templateUrl: './busqueda.html',
  styleUrl: './busqueda.css',
})
export class Busqueda {
  query = '';
  filters: SearchFilters = {
    type: 'todos',
    section: 'todas',
  };

  sections: string[] = [];
  results$!: Observable<SiteItem[]>;

  constructor(private route: ActivatedRoute, private api: SearchApi) {
    this.sections = this.api.getSections();

    // Sincronización con URL (Header Search -> Busqueda Page)
    this.route.queryParamMap.subscribe(params => {
      const q = params.get('q');
      if (q) {
        this.query = q;
        this.doSearch();
      }
    });
  }

  doSearch(): void {
    // ANALOGÍA: Llamada al servicio (Walkie-Talkie envía mensaje)
    this.results$ = this.api.search(this.query, this.filters);
  }

  clear(): void {
    this.query = '';
    this.filters = { type: 'todos', section: 'todas' };
    this.doSearch();
  }
}