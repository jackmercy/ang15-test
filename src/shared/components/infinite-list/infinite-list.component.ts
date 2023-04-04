import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GifItem } from 'src/core/model/gif.model';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-infinite-list',
  standalone: true,
  imports: [CommonModule, InfiniteScrollModule],
  templateUrl: './infinite-list.component.html',
  styleUrls: ['./infinite-list.component.scss']
})
export class InfiniteListComponent {
  @Output() loadMoreData = new EventEmitter<void>();
  @Input() items: Array<Partial<GifItem>> | null = [];
  @Input() loading: boolean = false;

  onScroll() {
    console.log(`loading... emit scrollingFinished`);
    this.loadMoreData.emit();
  }
}
