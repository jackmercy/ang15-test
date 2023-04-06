import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, BehaviorSubject, map } from 'rxjs';
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
  meta: GiphyMeta
}

@Injectable({
  providedIn: 'root'
})
export class GifService {
  private readonly http = inject(HttpClient);
  private readonly apiKeyService = inject(ApiKeyService);

  public getTrendingGifs(params: Partial<GiphyParams>): Observable<GiphyQueryResponse> {
    return this.http.get<GiphyQueryResponse>(this.apiKeyService.getTrendingApi(params));
  }
}