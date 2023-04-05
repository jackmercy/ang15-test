import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { BehaviorSubject, Observable, Subject, combineLatest, takeUntil } from 'rxjs';
import { GifItem } from 'src/core/model/gif.model';
import { InfiniteListComponent } from 'src/shared/components/infinite-list/infinite-list.component';
import { GifService, GiphyPagination } from '../gif.service';
import { GiphyParams } from 'src/core/model/giphy';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    InfiniteListComponent
  ],
  providers: [GifService]
})
export class TrendingComponent implements OnInit, OnDestroy {
  private readonly gifService = inject(GifService);

  private trendingGifs = new BehaviorSubject<Partial<GifItem>[]>([]);
  public trendingGifs$: Observable<Partial<GifItem>[]> = this.trendingGifs.asObservable();

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

  ngOnInit(): void {
    this.params.asObservable().pipe(
      takeUntil(this.unSubscribe)
    ).subscribe((params) => {
      this.pagination.offset += params.limit;
      this.gifService.getTrendingGifs(params).pipe(takeUntil(this.unSubscribe)).subscribe((res) => {
        this.trendingGifs.next([...this.trendingGifs.value, ...res.data]);
        this.pagination = res.pagination;
      });
    });
  }

  ngOnDestroy(): void {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }

  onLoadMoreData() {
    if (this.trendingGifs.value.length < this.pagination.total_count) {
      this.params.next({
        ...this.params.value,
        offset: this.params.value.offset + this.params.value.limit
      });
    }
  }
}
