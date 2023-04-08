import { render, screen } from '@testing-library/angular';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  it('should create', async () => {
    await render(FooterComponent);
    expect(screen.getByText('© 2023 Copyright: Cao Minh Khôi')).toBeTruthy();
  });

  it('should have email link', async () => {
    await render(FooterComponent);
    const emailLink = screen.getByTestId('email-link');
    expect(emailLink).toBeTruthy();
    expect(emailLink.getAttribute('href')).toBe('mailto:khoicaominh.mmt@gmail.com');
  });

  it('should have facebook link', async () => {
    await render(FooterComponent);
    const facebookLink = screen.getByTestId('github-link');
    expect(facebookLink).toBeTruthy();
    expect(facebookLink.getAttribute('href')).toBe('https://github.com/jackmercy');
  });

  it('should have linkedin link', async () => {
    await render(FooterComponent);
    const linkedinLink = screen.getByTestId('linkedin-link');
    expect(linkedinLink).toBeTruthy();
    expect(linkedinLink.getAttribute('href')).toBe('https://www.linkedin.com/in/khoi-cao-minh-687098200/');
  });

});

