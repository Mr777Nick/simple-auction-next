import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Import jest-dom for custom matchers
import React from 'react';

import { AuthContextProvider } from '../../libs/context/auth';
import { User } from '../../libs/types/user';

import Balance from '.';

describe('Balance', () => {
  test('displays current balance and name', () => {
    const user: User = { name: 'John Doe', balance: 100 };
    render(
      <AuthContextProvider authName="JestTesting" initialValue={{ user }}>
        <Balance />
      </AuthContextProvider>,
    );

    const balanceText = screen.getByText(/Current Balance:/i);

    expect(balanceText).toBeInTheDocument();
    expect(balanceText).toHaveTextContent('Current Balance: $ 100');
  });

  test('displays N/A if balance is not available', () => {
    const user: User = { name: 'John Doe', balance: undefined };
    render(
      <AuthContextProvider authName="JestTesting" initialValue={{ user }}>
        <Balance />
      </AuthContextProvider>,
    );

    const balanceText = screen.getByText(/Current Balance:/i);

    expect(balanceText).toBeInTheDocument();
    expect(balanceText).toHaveTextContent('Current Balance: $ N/A');
  });
});
