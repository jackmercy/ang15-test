import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxMasonryModule, NgxMasonryOptions } from 'ngx-masonry';
import { TW_COLORS_NAME } from 'src/core/model/color';
import { GifItem } from 'src/core/model/gif.model';

@Component({
  selector: 'app-infinite-list',
  standalone: true,
  imports: [CommonModule, InfiniteScrollModule, NgxMasonryModule],
  templateUrl: './infinite-list.component.html',
  styleUrls: ['./infinite-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfiniteListComponent {
  @Output() loadMoreData = new EventEmitter<void>();
  @Input() items: Array<Partial<GifItem>> | null = [];
  @Input() loading: boolean = false;

  private removeBgIndexes = new Set<number>();

  public masonryOptions: NgxMasonryOptions = {
    gutter: 10,
    itemSelector: '.masonry-layout-item',
  };

  onScroll() {
    this.loadMoreData.emit();
  }

  getGifItemStyles(i: number): string {
    const randomBg = `background-color: ${this.removeBgIndexes.has(i) ? '' : this.getRanDomColor()};`;
    return `${randomBg}`;
  }

  getRandomHex(): string {
    const randomBg = `background: ${this.getRanDomColor()};`;
    return `${randomBg}`;
  }

  getRanDomColor(): string {
    const colors = TW_COLORS_NAME;
    const index = Math.floor(Math.random() * 16);
    
    return colors[index].hex;
  }

  onImageLoad(event: Event, i: number) {
    this.removeBgIndexes.add(i);
  }
}
