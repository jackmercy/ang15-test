import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GifService } from '../gif.service';
import { InfiniteListComponent } from 'src/shared/components/infinite-list/infinite-list.component';
import { GifItem } from 'src/core/model/gif.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [CommonModule, InfiniteListComponent, MatIconModule],
  providers: [GifService],
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent {
  private readonly gifService = inject(GifService);
  
  public favoriteGifs: GifItem[] = this.gifService.favoriteGifs;
}
