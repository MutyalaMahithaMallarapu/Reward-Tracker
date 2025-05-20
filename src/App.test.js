import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import * as fetchModule from './api/fetchTransactions';

jest.mock('./api/fetchTransactions');

describe('App Component', () => {
  test('renders loading state initially', () => {
    fetchModule.fetchTransactions.mockReturnValue(new Promise(() => {}));
    render(<App />);
    expect(screen.getByText(/loading transactions/i)).toBeInTheDocument();
  });

  test('renders transactions after successful fetch', async () => {
    fetchModule.fetchTransactions.mockResolvedValue([
      { customerId: 'C001', transactionId: 'T001', amount: 120.75, date: '2025-03-15' }
    ]);

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/rewardify/i)).toBeInTheDocument();
      expect(screen.getByText(/transactions in/i)).toBeInTheDocument();
    });
  });

  test('shows error message on fetch failure', async () => {
    fetchModule.fetchTransactions.mockRejectedValue('Error fetching data');

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/error fetching data/i)).toBeInTheDocument();
    });
  });
});
