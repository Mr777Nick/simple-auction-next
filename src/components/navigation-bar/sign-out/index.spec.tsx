import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';

import { useAuthContext } from '../../../libs/context/auth';

import SignOutNavigationItem from '.';

jest.mock('../../../libs/context/auth');

describe('SignOutNavigationItem', () => {
  test('renders sign out navigation item', () => {
    const signOutMock = jest.fn();
    (useAuthContext as jest.Mock).mockReturnValue({ signOut: signOutMock });

    render(<SignOutNavigationItem />);

    const signOutButton = screen.getByRole('button', { name: 'Sign Out' });
    expect(signOutButton).toBeInTheDocument();

    const logoutIcon = screen.getByTestId('LogoutIcon');
    expect(logoutIcon).toBeInTheDocument();

    const signOutText = screen.getByText('Sign Out');
    expect(signOutText).toBeInTheDocument();
  });

  test('calls signOut function on button click', () => {
    const signOutMock = jest.fn();
    (useAuthContext as jest.Mock).mockReturnValue({ signOut: signOutMock });

    render(<SignOutNavigationItem />);

    const signOutButton = screen.getByRole('button', { name: 'Sign Out' });
    fireEvent.click(signOutButton);

    expect(signOutMock).toHaveBeenCalledTimes(1);
  });
});
