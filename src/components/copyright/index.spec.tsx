import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import React from 'react';

import { APP_NAME } from '../../constants/app-name';

import Copyright from '.';

describe('Copyright', () => {
  test('displays the correct copyright information', () => {
    render(<Copyright />, { wrapper: MemoryRouterProvider });

    const copyrightYear = screen.getByText(/2023/);
    const appNameLink = screen.getByRole('link', { name: APP_NAME });

    expect(copyrightYear).toBeInTheDocument();
    expect(appNameLink).toBeInTheDocument();
  });
});
