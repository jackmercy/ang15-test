import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ForModule } from "@rx-angular/template/for";
import { IfModule } from '@rx-angular/template/if';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxMasonryModule, NgxMasonryOptions } from 'ngx-masonry';
import { TW_COLORS_NAME } from 'src/core/model/color';
import { GifItem } from 'src/core/model/gif.model';
import { GifDetailComponent } from 'src/shared/dialog/gif-detail/gif-detail.component';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-infinite-list',
  standalone: true,
  imports: [
    CommonModule, InfiniteScrollModule, NgxMasonryModule, ForModule, IfModule, LoadingComponent, MatDialogModule,
    GifDetailComponent
  ],
  templateUrl: './infinite-list.component.html',
  styleUrls: ['./infinite-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfiniteListComponent {
  private readonly dialog = inject(MatDialog);

  @Output() loadMoreData = new EventEmitter<void>();
  @Input() items: GifItem[] = [];
  @Input() loading: boolean = false;

  private removeBgIndexes = new Set<number>();

  public masonryOptions: NgxMasonryOptions = {
    gutter: 10,
    itemSelector: '.masonry-layout-item',
    resize: true
  };

  onScroll() {
    this.loadMoreData.emit();
  }

  getGifItemStyles(i: number): string {
    const randomBg = `background-color: ${this.removeBgIndexes.has(i) ? '' : this.getRanDomColor()};`;
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

  onOpenGifDetail(item: Partial<GifItem>) {
    this.dialog.open(GifDetailComponent, {
      data: item,
      panelClass: 'dialog-fullscreen',      
    });
  }
}
