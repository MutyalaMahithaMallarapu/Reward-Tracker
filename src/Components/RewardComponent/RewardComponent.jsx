import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { calculateRewardPoints } from '../../utils/calculateRewardPoints';
import '../../Styles/Styles.css';

const RewardComponent = ({ transactions }) => {
  const customers = Array.from(new Set(transactions.map(txn => txn.customerId)));
  const [selectedCustomer, setSelectedCustomer] = useState(customers[0]);
  const [month, setMonth] = useState('03');
  const [year, setYear] = useState('2025');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 2;

  const filteredTransactions = transactions.filter(txn => {
    const date = new Date(txn.date);
    return txn.customerId === selectedCustomer &&
      (date.getMonth() + 1).toString().padStart(2, '0') === month &&
      date.getFullYear().toString() === year;
  });

  const monthlyRewards = transactions.reduce((acc, txn) => {
    if (txn.customerId === selectedCustomer) {
      const date = new Date(txn.date);
      const key = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
      acc[key] = (acc[key] || 0) + calculateRewardPoints(txn.amount);
    }
    return acc;
  }, {});

  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredTransactions.length / rowsPerPage);

  return (
    <div className="container">
      <label>Select Customer: </label>
      <select className="select" onChange={(e) => setSelectedCustomer(e.target.value)} value={selectedCustomer}>
        {customers.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
      <label>Month: </label>
      <select className="select" onChange={(e) => setMonth(e.target.value)} value={month}>
        {[...Array(12).keys()].map(i => {
          const monthVal = (i + 1).toString().padStart(2, '0');
          return <option key={monthVal} value={monthVal}>{new Date(0, i).toLocaleString('default', { month: 'long' })}</option>;
        })}
      </select>
      <label>Year: </label>
      <select className="select" onChange={(e) => setYear(e.target.value)} value={year}>
        <option value="2025">2025</option>
        <option value="2024">2024</option>
      </select>

      <h3>Monthly Rewards</h3>
      <ul>
        {Object.entries(monthlyRewards).map(([month, points]) => (
          <li key={month}>{month}: {points} points</li>
        ))}
      </ul>

      <h3>Transactions in {month}/{year}</h3>
      {currentTransactions.length === 0 ? (
        <p>No transactions available for the selected period.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th className="th">Date</th>
              <th className="th">Amount</th>
              <th className="th">Points</th>
            </tr>
          </thead>
          <tbody>
            {currentTransactions.map(txn => (
              <tr key={txn.transactionId}>
                <td className="td">{txn.date}</td>
                <td className="td">${txn.amount.toFixed(2)}</td>
                <td className="td">{calculateRewardPoints(txn.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {filteredTransactions.length > rowsPerPage && (
        <div className="pagination">
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx + 1}
              className={`page-button ${currentPage === idx + 1 ? 'active' : ''}`}
              onClick={() => setCurrentPage(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

RewardComponent.propTypes = {
  transactions: PropTypes.array.isRequired,
};

export default RewardComponent;