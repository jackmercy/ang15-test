import { MockBuilder, MockRender, ngMocks } from 'ng-mocks';
import { ToolbarComponent } from './toolbar.component';

describe('ToolbarComponent', () => {
  beforeEach(async () => {
    return MockBuilder(ToolbarComponent);
  });

  it('should create', () => {
    const fixture = MockRender(ToolbarComponent);
    expect(fixture).toBeTruthy();
  });

  it('should contain app logo', () => {
    const fixture = MockRender(ToolbarComponent);
    const logoEl = ngMocks.find('#logo img');
    expect(logoEl).toBeTruthy();

    expect(logoEl.nativeElement.getAttribute('src')).toBe('assets/logo.svg');
  });

  it('should have upload button', () => {
    const fixture = MockRender(ToolbarComponent);
    const uploadBtn = ngMocks.find('#upload-btn');
    expect(uploadBtn).toBeTruthy();

    expect(uploadBtn.nativeElement.textContent.trim()).toBe('Upload');
    expect(uploadBtn.nativeElement.getAttribute('routerLink')).toBe('/upload');
    expect(uploadBtn.nativeElement.getAttribute('data-te-ripple-color')).toBe('light');
    expect(uploadBtn.classes['bg-violet-500']).toBe(true);
  });

  it('should have Favorites button', () => {
    const fixture = MockRender(ToolbarComponent);
    const favoritesBtn = ngMocks.find('#favorite-btn');
    expect(favoritesBtn).toBeTruthy();

    expect(favoritesBtn.nativeElement.textContent.trim()).toBe('Favorites');
    expect(favoritesBtn.nativeElement.getAttribute('routerLink')).toBe('/favorite');
    expect(favoritesBtn.nativeElement.getAttribute('data-te-ripple-color')).toBe('light');
    expect(favoritesBtn.classes['bg-cyan-500']).toBe(true);
  });
});
