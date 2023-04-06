import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { GifItem } from 'src/core/model/gif.model';

@Component({
  selector: 'app-gif-detail',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './gif-detail.component.html',
  styleUrls: ['./gif-detail.component.scss']
})
export class GifDetailComponent {
  private readonly dialogRef = inject(MatDialogRef<GifDetailComponent>);
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: GifItem,
  ) { }
}
