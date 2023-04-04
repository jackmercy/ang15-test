import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { GifItem } from 'src/core/model/gif.model';

@Injectable({
  providedIn: 'root'
})
export class GifService {

  loadMore() {
    return Array.from({length: 50}).map((_, i) => ({
      id: `${i}`,
      url: 'https://media0.giphy.com/media/3o7TKsQ8UQ1wWu1GZK/giphy.gif',
      images: {
        original: {
          url: 'https://media2.giphy.com/media/MRQ83Jbg9C6lG79Ryk/giphy.gif?cid=beeb6e295ze1839az3jld7st7ym1kwncffhpxd4wbehpipiv&rid=giphy.gif&ct=g',
        }
      }
    } as Partial<GifItem>));
  }
}