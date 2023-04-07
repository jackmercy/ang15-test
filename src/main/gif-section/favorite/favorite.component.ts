import { ChangeDetectorRef, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GifService, GiphyPagination } from '../gif.service';
import { InfiniteListComponent } from 'src/shared/components/infinite-list/infinite-list.component';
import { GifItem } from 'src/core/model/gif.model';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { GiphyParams } from 'src/core/model/giphy';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [CommonModule, InfiniteListComponent, MatIconModule],
  providers: [GifService],
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit, OnDestroy {
  private readonly gifService = inject(GifService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly toastr = inject(ToastrService);

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

  public favoriteGifs: GifItem[] = [];
  public favoriteGifIds: string[] = this.gifService.favoriteGifs;
  public loading = false;

  ngOnInit(): void {
    this.params.asObservable().pipe(
      takeUntil(this.unSubscribe)
    ).subscribe((params) => {
      this.pagination.offset += params.limit;
      this.loading = true;
      this.gifService.getGifsByIds({
        ...params,
        ids: this.favoriteGifIds.join(',')
      }).pipe(takeUntil(this.unSubscribe)).subscribe({
        next: (res) => {
          this.favoriteGifs = [...this.favoriteGifs, ...res.data];
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
    if (this.favoriteGifs.length < this.pagination.total_count) {
      this.params.next({
        ...this.params.value,
        offset: this.params.value.offset + this.params.value.limit
      });
    }
    this.cdr.markForCheck();
  }
}
