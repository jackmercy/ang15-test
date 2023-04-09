import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingComponent } from './loading.component';
import { render, screen } from '@testing-library/angular';
import { RX_RENDER_STRATEGIES_CONFIG } from '@rx-angular/cdk/render-strategies';

describe('LoadingComponent', () => {
  const setup = async (isLoading = false) => {
    let rendered = await render(LoadingComponent, {
      componentInputs: {
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
    const { component, fixture } = await setup();
    expect(component).toBeTruthy();
    expect(fixture).toBeTruthy();
  });

  it('should show loading spinner', async () => {
    const { component } = await setup(true);
    const loadingEl = screen.getByTestId('loading');
    expect(loadingEl).toBeTruthy();
  });

  it('should not show loading spinner', async () => {
    const { component } = await setup(false);
    const loadingEl = screen.queryByTestId('loading');
    expect(loadingEl).toBeFalsy();
  });
});
