export const fetchTransactions = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          resolve([
            { customerId: 'C001', transactionId: 'T001', amount: 120.75, date: '2025-03-15' },
            { customerId: 'C001', transactionId: 'T002', amount: 99.99, date: '2025-02-11' },
            { customerId: 'C002', transactionId: 'T003', amount: 150, date: '2025-03-20' },
            { customerId: 'C003', transactionId: 'T004', amount: 47.5, date: '2025-01-05' },
            { customerId: 'C001', transactionId: 'T005', amount: 85, date: '2025-03-22' },
            { customerId: 'C001', transactionId: 'T006', amount: 60, date: '2025-03-28' },
            { customerId: 'C001', transactionId: 'T007', amount: 200, date: '2025-03-30' },
            { customerId: 'C002', transactionId: 'T008', amount: 40, date: '2025-03-10' }
          ]);
        } catch (error) {
          reject('Error fetching data');
        }
      }, 1000);
    });
  };