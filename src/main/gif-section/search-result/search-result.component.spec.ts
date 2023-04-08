
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { render, screen } from '@testing-library/angular';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { mockGifs } from 'src/shared/mocks/gifs.mock';
import { GifService } from '../gif.service';
import { SearchResultComponent } from './search-result.component';

describe('SearchResultComponent', () => {
  const setup = async () => {
    let rendered = await render(SearchResultComponent, {
      imports: [HttpClientModule, ToastrModule.forRoot()],
      providers: [
        ToastrService,
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ q: 'frenchie' })
          }
        },
      ]
    });
    return {
      component: rendered.fixture.componentInstance,
      fixture: rendered.fixture,
      service: rendered.fixture.debugElement.injector.get(GifService),
      rendered
    };
  };

  it('should create', async () => {
    await setup();
    expect(screen).toBeTruthy();
  });

  it('should have search result', async () => {
    const { component, fixture, service } = await setup();
    const spy = spyOn(service, 'searchGifs').and.returnValue(of(mockGifs));
    const titleEl = screen.getByTestId('search-result');
    expect(titleEl).toBeTruthy();
    expect(titleEl.textContent).toContain('Search Result:');
    expect(titleEl.querySelector('img')?.getAttribute('src')).toBe('assets/search-icon.svg');
    expect(component.searchTerm.value).toBe('frenchie');
    component.params.next({
      ...component.params.value,
      offset: 0
    });
    fixture.detectChanges();
    expect(titleEl.textContent).toContain('Search Result:  3597 GIFs');
    expect(spy).toHaveBeenCalled();
  });

  it('should have infinite list component', async () => {
    const { component, fixture, service } = await setup();
    const spy = spyOn(service, 'searchGifs').and.returnValue(of(mockGifs));
    component.params.next({
      ...component.params.value,
      offset: 0
    });
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();

    expect(screen.getByTestId('infinite-list')).toBeTruthy();
  });
});
