import { useContext } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';
import CategoryPieChart from '../components/CategoryPieChart';

function Analytics() {
  const { selectedMonth } = useContext(ExpenseContext);

  // Capitalize month name
  const displayMonth = selectedMonth.charAt(0).toUpperCase() + selectedMonth.slice(1);

  return (
    <div className="dash">
      <h1>📊 Analytics</h1>
      <p style={{ marginBottom: '10px', fontWeight: 'bold', color: '#555' }}>
        Showing insights for: <span style={{ color: '#ff6f61' }}>{displayMonth}</span>
      </p>

      <CategoryPieChart />
    </div>
  );
}

export default Analytics;
