import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useContext } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';

const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#7c4dff', '#4db6ac'];

function CategoryPieChart() {
  const { expenses, selectedMonth } = useContext(ExpenseContext);

  const filtered = selectedMonth === 'all'
    ? expenses
    : expenses.filter((e) => e.month === selectedMonth);

  const totalSpent = filtered.reduce((sum, item) => sum + item.amount, 0);

  const categoryTotals = filtered.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});

  const data = Object.entries(categoryTotals).map(([category, amount]) => ({
    name: category,
    value: amount,
    percent: ((amount / totalSpent) * 100).toFixed(1),
  }));

  if (data.length === 0) return <p>No data to show chart.</p>;

  return (
    <div style={{ width: '100%', height: 350, marginTop: '20px' }}>
      <h3 style={{ marginBottom: '10px' }}>💡 Category Spending Chart</h3>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={({ name, percent }) => `${name}: ${percent}%`}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `₹${value}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CategoryPieChart;
