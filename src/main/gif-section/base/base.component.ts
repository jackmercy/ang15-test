import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    MatRippleModule,
    ReactiveFormsModule,
  ]
})
export class BaseComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private router = inject(Router);
  private readonly activeRoute = inject(ActivatedRoute);

  searchForm = this.fb.group({
    q: ['']
  });

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(params => {
      const search = params?.['q'] || '';
      this.searchForm.get('q')?.setValue(search);

      if (search === '') {
        this.router.navigate(['/']);
      }
    });

  }

  public onSearchActivate() {
    const search = this.searchForm.get('q')?.value;
    this.router.navigate(['/search'], { queryParams: { q: search } });
  }
}
