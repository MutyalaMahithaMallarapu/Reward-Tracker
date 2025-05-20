import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RewardComponent from './RewardComponent'; // Update to correct relative path
import '@testing-library/jest-dom';

const mockTransactions = [
  {
    transactionId: 't1',
    customerId: 'cust1',
    amount: 120,
    date: '2025-03-15',
  },
  {
    transactionId: 't2',
    customerId: 'cust1',
    amount: 60,
    date: '2025-03-10',
  },
  {
    transactionId: 't3',
    customerId: 'cust1',
    amount: 30,
    date: '2025-03-05',
  },
  {
    transactionId: 't4',
    customerId: 'cust2',
    amount: 150,
    date: '2025-03-25',
  },
];

describe('RewardComponent', () => {

  test('renders transaction table for selected customer and month', () => {
    render(<RewardComponent transactions={mockTransactions} />);
    expect(screen.getByText('Transactions in 03/2025')).toBeInTheDocument();
    expect(screen.getAllByRole('row')).toHaveLength(3); // header + 2 rows (rowsPerPage = 2)
  });


  test('pagination buttons show and change page', () => {
    render(<RewardComponent transactions={mockTransactions} />);
    const nextPageButton = screen.getByRole('button', { name: '2' });
    expect(nextPageButton).toBeInTheDocument();

    fireEvent.click(nextPageButton);
    expect(screen.getAllByRole('row')).toHaveLength(2); // header + 1 txn on page 2
  });

  test('shows message when no transactions match filters', () => {
    const txns = [
      { transactionId: 't5', customerId: 'cust1', amount: 100, date: '2024-05-10' },
    ];
    render(<RewardComponent transactions={txns} />);
    expect(screen.getByText(/no transactions available/i)).toBeInTheDocument();
  });
});