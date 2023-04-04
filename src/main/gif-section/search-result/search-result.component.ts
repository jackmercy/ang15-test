import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class SearchResultComponent implements OnInit {
  private readonly activeRoute = inject(ActivatedRoute);

  searchTerm: string = ''

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(params => {
      this.searchTerm = params?.['q'] || '';

      // load search results here
    });
  }
}
