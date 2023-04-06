import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { GifItem } from 'src/core/model/gif.model';
import { MatIconModule } from '@angular/material/icon';
import { GifService } from 'src/main/gif-section/gif.service';

@Component({
  selector: 'app-gif-detail',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatIconModule],
  providers: [GifService],
  templateUrl: './gif-detail.component.html',
  styleUrls: ['./gif-detail.component.scss'],
})
export class GifDetailComponent {
  private readonly gifService = inject(GifService);
  private readonly dialogRef = inject(MatDialogRef<GifDetailComponent>);
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: GifItem,
  ) { }

  isFavorite(): boolean {
    return this.gifService.isFavoriteGif(this.data);
  }

  toggleFavorite(): void {
    if (this.isFavorite()) {
      this.gifService.removeFavoriteGif(this.data);
    } else {
      this.gifService.addFavoriteGif(this.data);
    }
  }
}
