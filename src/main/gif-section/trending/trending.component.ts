import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GifItem } from 'src/core/model/gif.model';
import { InfiniteListComponent } from 'src/shared/components/infinite-list/infinite-list.component';
import { GifService } from '../gif.service';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    InfiniteListComponent
  ]
})
export class TrendingComponent {
  private readonly gifService = inject(GifService);

  private trendingGifs = new BehaviorSubject<Partial<GifItem>[]>([
    ...this.gifService.loadMore()
  ]);
  public trendingGifs$: Observable<Partial<GifItem>[]> = this.trendingGifs.asObservable();
  

  onLoadMoreData() {
    console.log('load more');
    if (this.trendingGifs.value.length < 400) {
      this.trendingGifs.next([...this.trendingGifs.getValue(), ...this.gifService.loadMore()]);
    }
  }
}
