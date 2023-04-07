import { ChangeDetectorRef, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { GifService, GiphyPagination } from '../gif-section/gif.service';
import { NgxFileDropModule } from 'ngx-file-drop';
import { BehaviorSubject, Subject, concat, concatMap, merge, takeUntil } from 'rxjs';
import { GiphyParams } from 'src/core/model/giphy';
import { GifItem } from 'src/core/model/gif.model';
import { InfiniteListComponent } from 'src/shared/components/infinite-list/infinite-list.component';
import { ToastrService } from 'ngx-toastr';
import { IfModule } from '@rx-angular/template/if';
@Component({
  selector: 'app-upload-gifs',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxFileDropModule, InfiniteListComponent, IfModule],
  providers: [GifService],
  templateUrl: './upload-gifs.component.html',
  styleUrls: ['./upload-gifs.component.scss']
})
export class UploadGifsComponent implements OnInit, OnDestroy {
  private readonly giphyService = inject(GifService);
  private readonly fb = inject(FormBuilder);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly toastr = inject(ToastrService);

  private acceptTypes = ['image/gif', 'video/mp4'];

  public fileNames: string[] = [];
  public formUpload = this.fb.group({
    files: this.fb.control([] as File[])
  });

  public loadingGifs = false;
  public loadingUploadFile = false;
  public fileError = false;
  private params = new BehaviorSubject<Pick<GiphyParams, 'limit' | 'offset' | 'rating'>>({
    limit: 30,
    rating: 'g',
    offset: 0
  });
  private unSubscribe = new Subject<void>();

  public uploadedGifs: GifItem[] = [];
  get defaultParams(): Pick<GiphyParams, 'limit' | 'offset' | 'rating'> {
    return {
      limit: 30,
      rating: 'g',
      offset: 0
    }
  }

  ngOnInit(): void {
    this.params.asObservable().pipe(
      takeUntil(this.unSubscribe)
    ).subscribe(() => { this.loadUploadedGifs(); });
  }

  ngOnDestroy(): void {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }

  loadUploadedGifs() {
    this.loadingGifs = true;
    this.giphyService.getUploadedGifs().pipe(takeUntil(this.unSubscribe)).subscribe({
      next: resp => {
        this.uploadedGifs = [...resp.results];
        this.loadingGifs = false;
        this.cdr.markForCheck();
      },
      error: error => {
        console.error(error);
        this.loadingGifs = false;
        this.toastr.error('Something went wrong. Try again later!', 'Error');
      }
    });
  }

  onLoadMoreData() {
    this.loadingGifs = true;
    this.params.next({
      ...this.params.value,
      offset: this.params.value.offset + this.params.value.limit
    });
    this.cdr.markForCheck();
  }

  onUploadFilesClick(): void {
    this.loadingUploadFile = true;
    const filesArray: File[] = [].slice.call(this.formUpload.get('files')?.value);
    const files$ = filesArray.map(f => this.giphyService.uploadGiphy(f).pipe(takeUntil(this.unSubscribe)));
    const fileNameUploaded = new BehaviorSubject<number>(0);
    // NOTE: since GIPHY only allow upload 1 file at a time, we need to use concat to make sure the order of files is correct
    concat(...files$).subscribe({
      next: resp => {
        console.log(resp);
        if (resp?.meta?.status === 200) {
          this.toastr.success(`Uploaded Gif #${fileNameUploaded.value + 1}!`, `SUCCESS`);
          fileNameUploaded.next(fileNameUploaded.value + 1);
        }
        if (fileNameUploaded.value === filesArray.length) {
          this.loadUploadedGifs();
          this.onClearFiles();
          this.loadingUploadFile = false;
        }
      },
      error: error => {
        console.error(error);
        this.loadingUploadFile = false;
        this.toastr.error('Something went wrong. Try again later!', 'Error');
      }
    });
  }

  onFileDropped(files: any) {
    this.fileError = false;
    if (this.isFilesInvalid(files) || this.isFilesOverSize(files)) {
      this.fileError = true;
      this.formUpload.get('files')?.setValue([]);
      this.fileNames = [];
      return;
    }
    this.fileNames = files.map((f: any) => f?.name);
    this.formUpload.get('files')?.setValue(files);
  }

  onFileChange(event: any) {
    const filesInput = event?.target?.files as FileList;
    this.fileError = false;
    if (this.isFilesInvalid(filesInput) || this.isFilesOverSize(filesInput)) {
      // show error
      this.fileError = true;
      this.formUpload.get('files')?.setValue([]);
      this.fileNames = [];
      return;
    }
    let files = [].slice.call(filesInput);
    this.fileNames = files.map((f: any) => f?.name);
    this.formUpload.get('files')?.setValue(files);
  }

  isFilesInvalid(files: FileList) {
    const filesArray: File[] = [].slice.call(files);
    return filesArray.some(f => !this.acceptTypes.includes(f.type));
  }

  // check file list have any file over 100MB
  isFilesOverSize(files: FileList) {
    const filesArray: File[] = [].slice.call(files);
    return filesArray.some(f => f.size > 100000000);
  }

  onClearFiles() {
    this.formUpload.reset();
    this.fileNames = [];
  }
}
