import { RenderResult, render } from '@testing-library/react';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import React from 'react';

import Link from '.';

describe('Link', () => {
  test('renders link with provided href', () => {
    const href = '/example';
    const { getByText }: RenderResult = render(
      <Link href={href}>Link Text</Link>,
      { wrapper: MemoryRouterProvider },
    );
    const link = getByText('Link Text') as HTMLAnchorElement;
    expect(link.href).toContain(href);
  });

  test('applies active class when router pathname matches href', () => {
    const href = '/example';
    const activeClassName = 'active';

    const { getByText }: RenderResult = render(
      <MemoryRouterProvider url={href}>
        <Link href={href} activeClassName={activeClassName}>
          Link Text
        </Link>
      </MemoryRouterProvider>,
    );
    const link = getByText('Link Text');
    expect(link.classList.contains(activeClassName)).toBeTruthy();
  });

  test('renders external link when href starts with http or mailto', () => {
    const href = 'http://example.com';
    const { getByText }: RenderResult = render(
      <Link href={href}>External Link</Link>,
      { wrapper: MemoryRouterProvider },
    );
    const link = getByText('External Link') as HTMLAnchorElement;
    expect(link.href).toContain(href);
  });

  test('renders Next.js link with provided props', () => {
    const href = '/example';
    const as = '/custom';
    const { getByText }: RenderResult = render(
      <Link href={href} as={as} replace>
        Next.js Link
      </Link>,
      { wrapper: MemoryRouterProvider },
    );
    const link = getByText('Next.js Link') as HTMLAnchorElement;
    expect(link.href).toContain(as);
  });
});
