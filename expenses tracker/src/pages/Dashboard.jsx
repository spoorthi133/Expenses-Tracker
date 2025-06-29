import { useContext, useEffect, useRef, useState } from 'react';
import AddExpenseForm from '../components/AddExpenseForm';
import ExpenseList from '../components/ExpenseList';
import { ExpenseContext } from '../context/ExpenseContext';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Dashboard() {
  const {
    expenses,
    selectedMonth,
    setSelectedMonth,
    getTotalForMonth,
    clearMonthExpenses,
    setBudgetForMonth,
    budgets,
  } = useContext(ExpenseContext);

  const [total, setTotal] = useState(0);
  const [budgetInput, setBudgetInput] = useState('');

  const hasWarnedRef = useRef(false); // 💡 to show warning only once

  const months = [
    'all', 'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december'
  ];

  // 🧠 Auto update total & show warning once if budget exceeded
  useEffect(() => {
    const currentTotal = getTotalForMonth(selectedMonth);
    setTotal(currentTotal);

    const currentBudget = budgets?.[selectedMonth] || 0;
    const isOver = currentTotal > currentBudget;

    if (isOver && currentBudget > 0 && !hasWarnedRef.current) {
      toast.warn(`⚠️ You've exceeded your budget for ${selectedMonth}!`, {
        position: 'top-right',
        autoClose: 3000,
      });
      hasWarnedRef.current = true;
    } else if (!isOver) {
      hasWarnedRef.current = false; // Reset if they go under again
    }
  }, [expenses, selectedMonth, getTotalForMonth, budgets]);

  // 📆 Auto select current month on load
  useEffect(() => {
    const current = new Date().toLocaleString('default', { month: 'long' }).toLowerCase();
    setSelectedMonth(current);
  }, [setSelectedMonth]);

  const handleTotalClick = () => {
    setTotal(getTotalForMonth(selectedMonth));
  };

  const handleClear = () => {
    if (selectedMonth !== 'all') {
      clearMonthExpenses(selectedMonth);
      setTotal(0);
    }
  };

  const handleSetBudget = () => {
    if (!budgetInput || selectedMonth === 'all') return;
    setBudgetForMonth(selectedMonth, parseFloat(budgetInput));
    setBudgetInput('');
  };

  const currentBudget = budgets?.[selectedMonth] || 0;
  const isOverBudget = total > currentBudget && currentBudget > 0;

  return (
    <div className="dashboard">
      <h1>Expenses Tracker</h1>

      <label>Select Month: </label>
      <select
        onChange={(e) => setSelectedMonth(e.target.value)}
        value={selectedMonth}
      >
        {months.map((m) => (
          <option key={m} value={m}>
            {m.charAt(0).toUpperCase() + m.slice(1)}
          </option>
        ))}
      </select>

      {/* 💰 Budget Section */}
      <div className="budget-section">
        <input
          type="number"
          placeholder="Set Monthly Budget (₹)"
          value={budgetInput}
          onChange={(e) => setBudgetInput(e.target.value)}
        />
        <button onClick={handleSetBudget}>Set Budget</button>
      </div>

      <button onClick={handleTotalClick}>Show Total</button>
      <button onClick={handleClear} disabled={selectedMonth === 'all'}>
        Clear {(selectedMonth?.charAt(0).toUpperCase() + selectedMonth?.slice(1)) || ''} Expenses
      </button>

      <p><strong>Total: ₹{total}</strong></p>

      {currentBudget > 0 && (
  <p>
    Budget: ₹{currentBudget}
  </p>
)}

     

      <AddExpenseForm />
      <ExpenseList />
      <ToastContainer />
    </div>
  );
}

export default Dashboard;
