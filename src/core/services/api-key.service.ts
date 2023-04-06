import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { GIPHY_API, GiphyApiObject, GiphyParams } from '../model/giphy';

@Injectable({
  providedIn: 'root'
})
export class ApiKeyService {
  public readonly GIPHY = GIPHY_API;
  private readonly http = inject(HttpClient);

  private getQueryApi(api: GiphyApiObject, params: Partial<GiphyParams>): string {
    const paramObj = { 
      ...params,
      api_key: api.api_key
    };

    const queryParams = new HttpParams({ fromObject: paramObj }).toString();

    return `${api.url}?${queryParams}`;
  }

  public getTrendingApi(params: Partial<GiphyParams>): string {
    return this.getQueryApi(this.GIPHY.trending, params);
  }

  public getSearchApi(params: Partial<GiphyParams>): string {
    return this.getQueryApi(this.GIPHY.search, params);
  }

  public getUploadApi(): string {
    return this.GIPHY.upload.url;
  }
}
