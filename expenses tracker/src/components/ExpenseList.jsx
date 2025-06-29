import { useContext } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';
import ExpenseItem from './ExpenseItem';

function ExpenseList() {
  const { expenses, selectedMonth } = useContext(ExpenseContext);

  // 🧠 Filter expenses based on selected month (case handled)
  const filtered =
    selectedMonth === 'all'
      ? expenses
      : expenses.filter((e) => e.month === selectedMonth);

  return (
    <div className="expense-list">
      {filtered.length === 0 && (
        <p>No expenses for {selectedMonth.charAt(0).toUpperCase() + selectedMonth.slice(1)}.</p>
      )}

      {filtered.map((exp) => (
        <ExpenseItem key={exp.id} expense={exp} />
      ))}
    </div>
  );
}

export default ExpenseList;
