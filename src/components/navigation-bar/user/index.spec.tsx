import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';

import { useAuthContext } from '../../../libs/context/auth';

import UserNavigationItem from '.';

jest.mock('../../../libs/context/auth');

describe('UserNavigationItem', () => {
  test('renders user navigation item with name and balance', () => {
    const user = {
      name: 'John Doe',
      balance: 100,
    };
    (useAuthContext as jest.Mock).mockReturnValue({ user });

    render(<UserNavigationItem />);

    const nameElement = screen.getByText('John Doe');
    expect(nameElement).toBeInTheDocument();

    const balanceElement = screen.getByText('100');
    expect(balanceElement).toBeInTheDocument();
  });

  test('renders user navigation item with empty name if user is not provided', () => {
    (useAuthContext as jest.Mock).mockReturnValue({ user: null });

    render(<UserNavigationItem />);

    const nameElement = screen.getByTestId('user-name');
    expect(nameElement).toBeInTheDocument();
  });
});
