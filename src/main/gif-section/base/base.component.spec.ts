import { TestBed } from '@angular/core/testing';
import { BaseComponent } from './base.component';
import { render, screen, fireEvent, RenderResult } from '@testing-library/angular';
import { Router } from '@angular/router';

describe('BaseComponent', () => {
  let component: RenderResult<BaseComponent>;
  let searchControl: HTMLInputElement;

  beforeEach(async () => {
    component = await render(BaseComponent);
    searchControl = screen.getByTestId('search-control');
  });

  it('should create', async () => {
    expect(screen).toBeTruthy();
  });

  it('should have search control', async () => {
    expect(searchControl).toBeTruthy();
    expect(searchControl.getAttribute('placeholder')).toBe('Search all the GIFs');

    const spy = spyOn(component.fixture.componentInstance, 'onSearchActivate').and.callThrough();
    const router = TestBed.inject(Router);
    const navigateSpy = spyOn(router, 'navigate');
    fireEvent.input(searchControl, { target: { value: 'frenchie' } });
    fireEvent.keyDown(searchControl, { key: 'Enter' });
    component.fixture.detectChanges();
    expect(searchControl.value).toBe('frenchie');
    expect(spy).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/search'], { queryParams: { q: 'frenchie' } });
  });

  it('should have search icon', async () => {
    const icon = screen.getByTestId('search-icon');
    expect(icon).toBeTruthy();
    expect(icon.querySelector('img')?.getAttribute('src')).toBe('assets/search-icon.svg');
    const spy = spyOn(component.fixture.componentInstance, 'onSearchActivate');
    fireEvent.click(icon);
    component.fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('should have child route', async () => {
    expect(screen.getByTestId('gif-section-route')).toBeTruthy();
  });
});
