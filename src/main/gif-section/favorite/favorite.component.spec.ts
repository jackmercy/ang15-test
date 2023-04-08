import { MockBuilder, MockRender } from 'ng-mocks';
import { ToastrModule } from 'ngx-toastr';
import { FavoriteComponent } from './favorite.component';
import { RX_RENDER_STRATEGIES_CONFIG } from '@rx-angular/cdk/render-strategies';
import { GifService } from '../gif.service';
import { mockGifs } from 'src/shared/mocks/gifs.mock';
import { of } from 'rxjs';

describe('FavoriteComponent', () => {
  beforeEach(async () => {
    return MockBuilder(FavoriteComponent, ToastrModule);
  });

  const setup = () => {
    const fixture = MockRender(FavoriteComponent, {
      providers: [
        {
          provide: RX_RENDER_STRATEGIES_CONFIG,
          useValue: {
            primaryStrategy: 'native',
          },
        }
      ]
    });
    const component = fixture.point.componentInstance;
    return { fixture, component };
  };

  it('should create', () => {
    const { fixture, component } = setup();
    expect(fixture).toBeTruthy();
    expect(component).toBeTruthy();
  });

  it('should have infinite list', () => {
    const { fixture, component } = setup();
    const service = fixture.point.injector.get(GifService);
    const spy = spyOn(service, 'getGifsByIds').and.returnValue(of(mockGifs));

    spyOnProperty(service, 'favoriteGifs', 'get').and.returnValue(['1', '2', '3', '4', '5']);
    component.params.next({
      ...component.params.value,
      offset: 0
    });
    fixture.detectChanges();
    expect(component.favoriteGifs.length).toEqual(5);
    expect(spy).toHaveBeenCalled();

    const infiniteList = fixture.point.nativeElement.querySelector('app-infinite-list');
    expect(infiniteList).toBeTruthy();
  });
});
