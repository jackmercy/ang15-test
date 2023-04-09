import { HttpClientModule } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { RX_RENDER_STRATEGIES_CONFIG } from '@rx-angular/cdk/render-strategies';
import { fireEvent, render, screen } from '@testing-library/angular';
import { mockGifs } from 'src/shared/mocks/gifs.mock';
import { GifDetailComponent } from './gif-detail.component';
import { GifService } from 'src/main/gif-section/gif.service';

describe('GifDetailComponent', () => {
  const setup = async () => {
    let rendered = await render(GifDetailComponent, {
      imports: [
        MatDialogModule,
        HttpClientModule
      ],
      providers: [
        {
          provide: MAT_DIALOG_DATA, useValue: mockGifs.data[0]
        },
        { provide: MatDialogRef, useValue: {} },
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
      service: rendered.fixture.debugElement.injector.get(GifService),
      rendered
    };
  };

  it('should create', async () => {
    const { component } = await setup();
    expect(component).toBeTruthy();
  });

  it('should show gif title', async () => {
    const { component, fixture } = await setup();
    const title = screen.getByText(mockGifs.data[0].title);
    expect(title.textContent).toEqual(mockGifs.data[0].title);
  });

  it('should show gif image', async () => {
    const { component, fixture } = await setup();
    const image = screen.getByTestId('gif-detail-image');
    expect(image).toBeTruthy();
    expect(image.getAttribute('src')).toEqual(mockGifs.data[0].images.fixed_width.url);
  });

  it('should show gif user avatar', async () => {
    const { component, fixture } = await setup();
    const avatar = screen.getByTestId('gif-detail-avatar');
    expect(avatar).toBeTruthy();
    expect(avatar.getAttribute('src')).toEqual(mockGifs.data[0].user.avatar_url);
  });

  it('should show gif user name', async () => {
    const { component, fixture } = await setup();
    const name = screen.getByTestId('gif-detail-username');
    expect(name.textContent?.trim()).toEqual(`@${mockGifs.data[0].user.username}`);

    const verified = screen.getByTestId('gif-detail-user-verified');
    expect(verified).toBeTruthy();
  });


  it('should show gif user description', async () => {
    const { component, fixture } = await setup();
    const description = screen.getByTestId('gif-detail-user-description');
    expect(description.textContent?.trim()).toEqual(mockGifs.data[0].user.description);
  });

  it('should show gif user source', async () => {
    const { component, fixture } = await setup();
    const source = screen.getByTestId('gif-detail-user-source');
    expect(source.textContent?.trim()).toEqual(`Source:${mockGifs.data[0].user.website_url}`);
    const link = source.querySelector('a');
    expect(link).toBeTruthy();
    expect(link?.getAttribute('href')).toEqual(mockGifs.data[0].user.website_url);
  });

  it('should show gif rating', async () => {
    const { component, fixture } = await setup();
    const rating = screen.getByTestId('gif-detail-rating');
    expect(rating.textContent?.trim()).toEqual(`Rating: Rated ${mockGifs.data[0].rating.toUpperCase()}`);
  });

  it('should show icon functions', async () => {
    const { component, fixture, service } = await setup();
    const spy = spyOn(service, 'isFavoriteGif').and.returnValue(true);
    const toggleFavoriteSpy = spyOn(component, 'toggleFavorite').and.callFake(() => {});
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();

    const iconFunc = screen.getByTestId('gif-detail-icon-func');
    expect(iconFunc).toBeTruthy();

    const iconFavorite = iconFunc.querySelector('mat-icon');
    expect(iconFavorite).toBeTruthy();
    expect(iconFavorite?.classList).toContain('favorite-icon');
    fireEvent.click(iconFavorite!);
    fixture.detectChanges();
    expect(toggleFavoriteSpy).toHaveBeenCalled();

    const iconShare = iconFunc.querySelector('a');
    expect(iconShare).toBeTruthy();
    expect(iconShare?.getAttribute('href')).toEqual(`${mockGifs.data[0].bitly_gif_url}`);
    expect(iconShare?.getAttribute('target')).toEqual('_blank');
  });

  it('should show close button', async () => {
    const { component, fixture } = await setup();
    const closeBtn = screen.getByTestId('gif-detail-close');
    expect(closeBtn).toBeTruthy();
    expect(closeBtn.textContent?.trim()).toEqual('Close');
  });
});
