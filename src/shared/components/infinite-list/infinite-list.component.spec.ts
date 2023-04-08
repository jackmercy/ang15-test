import { MatDialog } from '@angular/material/dialog';
import { RX_RENDER_STRATEGIES_CONFIG } from '@rx-angular/cdk/render-strategies';
import { render, screen } from '@testing-library/angular';
import { GifDetailComponent } from 'src/shared/dialog/gif-detail/gif-detail.component';
import { mockGifs } from 'src/shared/mocks/gifs.mock';
import { InfiniteListComponent } from './infinite-list.component';

describe('InfiniteListComponent', () => {
  const setup = async (data = mockGifs.data, isLoading = false) => {
    let rendered = await render(InfiniteListComponent, {
      componentInputs: {
        items: data,
        loading: isLoading,
      },
      providers: [
        {
          provide: RX_RENDER_STRATEGIES_CONFIG,
          useValue: {
            primaryStrategy: 'native',
          },
        },
      ]
    });
    return {
      component: rendered.fixture.componentInstance,
      fixture: rendered.fixture,
      rendered
    };
  };

  it('should create', async () => {
    const { component } = await setup();
    expect(component).toBeTruthy();
    expect(component.items.length).toEqual(5);
  });

  it('call onScroll should emit event', async () => {
    const { component, fixture } = await setup();
    const spy = spyOn(component.loadMoreData, 'emit');
    component.onScroll();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('call getGifItemStyles should return correct styles', async () => {
    const { component } = await setup();
    spyOn(component, 'getRandomColor').and.returnValue('orange');

    const styles = component.getGifItemStyles(0);
    expect(styles).toEqual('background-color: orange;');
  });

  it('should show loading spinner', async () => {
    const { component, fixture } = await setup(mockGifs.data, true);
    const loadingEl = screen.getByTestId('loading');
    expect(loadingEl).toBeTruthy();
  });

  it('should show no data message', async () => {
    const { component, fixture } = await setup([]);

    expect(component.items.length).toEqual(0);
    fixture.detectChanges();
    const noDataEl = screen.getByTestId('no-data');
    expect(noDataEl).toBeTruthy();
    expect(noDataEl.textContent).toContain('No gif found');
  });

  it('should show dialog on call onOpenGifDetail', async () => {
    const { component, fixture } = await setup();
    const dialog = fixture.debugElement.injector.get(MatDialog);
    const spy = spyOn(dialog, 'open');
    component.onOpenGifDetail(mockGifs.data[0]);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(GifDetailComponent, {
      data: mockGifs.data[0],
      panelClass: 'dialog-fullscreen'
    });
  });

  it('should show gif items', async () => {
    const { component, fixture } = await setup();
    const dialog = fixture.debugElement.injector.get(MatDialog);
    const spy = spyOn(dialog, 'open');
    fixture.detectChanges();
    const gifItems = screen.getAllByTestId('gif-item');
    expect(gifItems.length).toEqual(5);
    expect(gifItems[0].className).toContain('masonry-layout-item');
    expect(gifItems[0].querySelector('img')?.getAttribute('src')).toBe(mockGifs.data[0].images.fixed_width.url);
    expect(gifItems[0].querySelector('img')?.getAttribute('alt')).toBe(mockGifs.data[0].title);

    gifItems[0].click();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(GifDetailComponent, {
      data: mockGifs.data[0],
      panelClass: 'dialog-fullscreen'
    });
  });
});
