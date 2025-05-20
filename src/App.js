import React, { useEffect, useState } from 'react';
import { fetchTransactions } from './api/fetchTransactions';
import RewardComponent from './Components/RewardComponent/RewardComponent';
import './Styles/Styles.css';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTransactions()
      .then((data) => {
        setTransactions(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="appContainer">
      <h2>Rewardify - Customer Rewards Program</h2>
      {loading && <p>Loading transactions...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && <RewardComponent transactions={transactions} />}
    </div>
  );
}
export default App