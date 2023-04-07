import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { BehaviorSubject, Observable, Subject, combineLatest, takeUntil } from 'rxjs';
import { GifItem } from 'src/core/model/gif.model';
import { InfiniteListComponent } from 'src/shared/components/infinite-list/infinite-list.component';
import { GifService, GiphyPagination } from '../gif.service';
import { GiphyParams } from 'src/core/model/giphy';
import { IfModule } from '@rx-angular/template/if';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    InfiniteListComponent,
    IfModule
  ],
  providers: [GifService]
})
export class TrendingComponent implements OnInit, OnDestroy {
  private readonly gifService = inject(GifService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly toastr = inject(ToastrService);

  private trendingGifs = new BehaviorSubject<GifItem[]>([]);
  public trendingGifs$: Observable<GifItem[]> = this.trendingGifs.asObservable();

  private params = new BehaviorSubject<Pick<GiphyParams, 'limit' | 'offset' | 'rating'>>({
    limit: 30,
    rating: 'g',
    offset: 0
  });

  private pagination: GiphyPagination = {
    total_count: 0,
    count: 0,
    offset: 0
  };

  private unSubscribe = new Subject<void>();

  public loading = false;

  ngOnInit(): void {
    this.params.asObservable().pipe(
      takeUntil(this.unSubscribe)
    ).subscribe((params) => {
      this.pagination.offset += params.limit;
      this.loading = true;
      this.gifService.getTrendingGifs(params).pipe(takeUntil(this.unSubscribe)).subscribe({
        next: (res) => {
          this.trendingGifs.next([...this.trendingGifs.value, ...res.data]);
          this.pagination = res.pagination;
          this.loading = false;
          this.cdr.markForCheck();
        },
        error: (err) => {
          this.loading = false;
          this.toastr.error('Something went wrong. Try again later!', 'Error');
          this.cdr.markForCheck();
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }

  onLoadMoreData() {
    this.loading = true;
    if (this.trendingGifs.value.length < this.pagination.total_count) {
      this.params.next({
        ...this.params.value,
        offset: this.params.value.offset + this.params.value.limit
      });
    }
    this.cdr.markForCheck();
  }
}
