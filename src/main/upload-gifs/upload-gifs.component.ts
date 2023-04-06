import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { GifService } from '../gif-section/gif.service';
import { NgxFileDropModule } from 'ngx-file-drop';

@Component({
  selector: 'app-upload-gifs',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxFileDropModule],
  providers: [GifService],
  templateUrl: './upload-gifs.component.html',
  styleUrls: ['./upload-gifs.component.scss']
})
export class UploadGifsComponent {
  private readonly giphyService = inject(GifService);
  private readonly fb = inject(FormBuilder);

  public fileNames: string[] = [];

  public formUpload = this.fb.group({
    files: this.fb.control([] as File[])
  });

  onUploadFilesClick(): void {
    const files = this.formUpload.get('files')?.value as File[];

    this.giphyService.uploadGiphy(files).subscribe({
      next: resp => {
        console.log(resp);
        // TODO: update loading state, notify upload success.
        // show button go to uploaded gifs.

        // TODO: create a new page called uploaded gifs/Channel.
        this.giphyService.getUploadedGifs().subscribe({
          next: resp => console.log(resp),
          error: error => console.error(error)
        });
      },
      error: error => console.error(error)
    });
  }

  onFileDropped(files: any) {
    this.fileNames = files.map((f: any) => f?.name);
    this.formUpload.get('files')?.setValue(files);
  }

  onFileChange(event: any) {
    let files = [].slice.call(event.target.files);
    this.fileNames = files.map((f: any) => f?.name);
    this.formUpload.get('files')?.setValue(files);
  }
}
