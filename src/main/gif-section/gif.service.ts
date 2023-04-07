import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, BehaviorSubject, map, of, catchError } from 'rxjs';
import { GifItem } from 'src/core/model/gif.model';
import { GiphyParams } from 'src/core/model/giphy';
import { ApiKeyService } from 'src/core/services/api-key.service';

export interface GiphyPagination {
  total_count: number;
  count?: number;
  offset: number;
}

export interface GiphyMeta {
  status: number;
  msg: string;
  response_id: string;
}
export interface GiphyQueryResponse {
  data: GifItem[];
  pagination: GiphyPagination;
  meta: GiphyMeta;
}

export interface GiphyUploadResponse {
  data: { id: string; }[];
  meta: GiphyMeta;
}

export interface GiphyChannelResponse {
  results: GifItem[];
}

@Injectable({
  providedIn: 'root'
})
export class GifService {
  private readonly localFavoriteKey = 'local_favorite_gifs' as const;
  private readonly http = inject(HttpClient);
  private readonly apiKeyService = inject(ApiKeyService);
  private _favoriteGifs: string[] = this.localStorageFavoriteGifs;

  private get localStorageFavoriteGifs(): string[] {
    return JSON.parse(localStorage.getItem(this.localFavoriteKey) || '[]');
  }

  public get favoriteGifs(): string[] {
    return this.localStorageFavoriteGifs;
  }

  public getTrendingGifs(params: Partial<GiphyParams>): Observable<GiphyQueryResponse> {
    return this.http.get<GiphyQueryResponse>(this.apiKeyService.getTrendingApi(params));
  }

  public getUploadedGifs(): Observable<GiphyChannelResponse> {
    // Since Giphy not support query uploaded gifs, we use a hardcode channel id to get uploaded gifs.
    return this.http.get<GiphyChannelResponse>('https://giphy.com/api/v4/channels/48603625/feed/');
  }

  uploadGiphy(files: File[]): Observable<GiphyUploadResponse> {
    const formData = new FormData();
  
    for (const file of files) {
      formData.append('file', file, file.name);
    }

    formData.append('api_key', this.apiKeyService.GIPHY.upload.api_key);
  
    return this.http.post<GiphyUploadResponse>(this.apiKeyService.getUploadApi(), formData).pipe(
      catchError(error => {
        console.error(error);
        return of(error);
      })
    );
  }
  

  public searchGifs(params: Partial<GiphyParams>): Observable<GiphyQueryResponse> {
    return this.http.get<GiphyQueryResponse>(this.apiKeyService.getSearchApi(params));
  }

  public getGifsByIds(params: Partial<GiphyParams>): Observable<GiphyQueryResponse> {
    return this.http.get<GiphyQueryResponse>(this.apiKeyService.getGifsByIdsApi(params));
  }

  public addFavoriteGif(item: GifItem): void {
    const index = this._favoriteGifs.findIndex(id => id === item.id);
    if (index === -1) {
      this._favoriteGifs.push(item.id);
      localStorage.setItem(this.localFavoriteKey, JSON.stringify(this._favoriteGifs));
    }
  }

  public removeFavoriteGif(item: GifItem): void {
    const index = this._favoriteGifs.findIndex(id => id === item.id);
    if (index !== -1) {
      this._favoriteGifs.splice(index, 1);
    }
  }

  public isFavoriteGif(item: GifItem): boolean {
    return this._favoriteGifs.some(id => id === item.id);
  }
}