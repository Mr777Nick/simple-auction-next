import { render, screen } from '@testing-library/react';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import React from 'react';
import '@testing-library/jest-dom';

import NavigationItem from '.';

describe('NavigationItem', () => {
  test('renders navigation item with text and URL', () => {
    const text = 'Home';
    const url = '/home';
    const { getByText, getByTestId } = render(
      <NavigationItem text={text} url={url} dataTestId="navigation-link" />,
      { wrapper: MemoryRouterProvider },
    );

    const linkElement = getByTestId('navigation-link');
    expect(linkElement).toHaveAttribute('href', url);

    const textElement = getByText(text);
    expect(textElement).toBeInTheDocument();
  });

  test('renders navigation item with icon when provided', () => {
    const text = 'About';
    const url = '/about';
    const icon = (
      <svg data-testid="icon" viewBox="0 0 24 24">
        <path d="M12 2L1 21h22L12 2zM9 18h6v-2H9v2zm0-4h6v-2H9v2zm0-4h6V8H9v2zm0-4h6V4H9v2z" />
      </svg>
    );
    render(<NavigationItem text={text} url={url} icon={icon} />, {
      wrapper: MemoryRouterProvider,
    });

    const iconElement = screen.getByTestId('icon');
    expect(iconElement).toBeInTheDocument();
  });

  test('applies custom styles when provided', () => {
    const text = 'Contact';
    const url = '/contact';
    const customStyles = { color: 'red' };
    render(<NavigationItem text={text} url={url} sx={customStyles} />, {
      wrapper: MemoryRouterProvider,
    });

    const listItemElement = screen.getByText(text).closest('li');
    expect(listItemElement).toHaveStyle(customStyles);
  });

  test('sets data-testid attribute when provided', () => {
    const text = 'Products';
    const url = '/products';
    const dataTestId = 'navigation-item';
    const { getByTestId } = render(
      <NavigationItem text={text} url={url} dataTestId={dataTestId} />,
      { wrapper: MemoryRouterProvider },
    );

    const listItemElement = getByTestId(dataTestId);
    expect(listItemElement).toBeInTheDocument();
  });
});
