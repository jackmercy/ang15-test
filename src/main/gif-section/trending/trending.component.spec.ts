
import { MockBuilder, MockRender } from 'ng-mocks';
import { ToastrModule } from 'ngx-toastr';
import { of } from 'rxjs';
import { mockGifs } from 'src/shared/mocks/gifs.mock';
import { GifService } from '../gif.service';
import { TrendingComponent } from './trending.component';
import { RX_RENDER_STRATEGIES_CONFIG } from '@rx-angular/cdk/render-strategies';

describe('TrendingComponent', () => {
  beforeEach(async () => {
    return MockBuilder(TrendingComponent, ToastrModule);
  });

  const setup = () => {
    const fixture = MockRender(TrendingComponent, {
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
    const spy = spyOn(service, 'getTrendingGifs').and.returnValue(of(mockGifs));
    component.params.next({
      ...component.params.value,
      offset: 0
    });
    fixture.detectChanges();
    expect(component.trendingGifs.value.length).toEqual(5);
    expect(spy).toHaveBeenCalled();

    const infiniteList = fixture.point.nativeElement.querySelector('app-infinite-list');
    expect(infiniteList).toBeTruthy();
  });
});
