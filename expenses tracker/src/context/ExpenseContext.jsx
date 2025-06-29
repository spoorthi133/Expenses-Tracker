// src/context/ExpenseContext.jsx
import { createContext, useState, useEffect } from 'react';

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const currentMonth = new Date().toLocaleString('default', { month: 'long' }).toLowerCase();

  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem("expenses");
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  const [budgets, setBudgets] = useState(() => {
    const savedBudgets = localStorage.getItem("budgets");
    return savedBudgets ? JSON.parse(savedBudgets) : {};
  });

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  // Save to localStorage whenever expenses change
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  // Save to localStorage whenever budgets change
  useEffect(() => {
    localStorage.setItem("budgets", JSON.stringify(budgets));
  }, [budgets]);

  // Add new expense
  const addExpense = (expense) => {
    const withMonth = {
      ...expense,
      month: expense.month || selectedMonth,
    };
    setExpenses((prev) => [...prev, withMonth]);
  };

  // Get total expenses for a specific month
  const getTotalForMonth = (month) => {
    const filtered = month === 'all'
      ? expenses
      : expenses.filter((exp) => exp.month === month);

    return filtered.reduce((total, exp) => total + Number(exp.amount), 0);
  };

  // Clear all expenses for a specific month
  const clearMonthExpenses = (month) => {
    setExpenses((prev) => prev.filter((exp) => exp.month !== month));
  };

  // Delete a single expense
  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((exp) => exp.id !== id));
  };

  // Set monthly budget
  const setBudgetForMonth = (month, amount) => {
    setBudgets((prev) => ({
      ...prev,
      [month]: amount,
    }));
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        selectedMonth,
        setSelectedMonth,
        addExpense,
        getTotalForMonth,
        clearMonthExpenses,
        deleteExpense,
        setBudgetForMonth,
        budgets,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
