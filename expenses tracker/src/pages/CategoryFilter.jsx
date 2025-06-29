
// src/pages/CategoryFilter.jsx
import { useContext, useState } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';
import ExpenseItem from '../components/ExpenseItem';

function CategoryFilter() {
  const { expenses } = useContext(ExpenseContext);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'food', 'travel', 'shopping', 'entertainment', 'other'];

  const filteredExpenses =
    selectedCategory === 'all'
      ? expenses
      : expenses.filter((exp) => exp.category === selectedCategory);

  return (
    <div className="category-filter-page">
      <h2>📂 Filter Expenses by Category</h2>

      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </option>
        ))}
      </select>

      <div className="filtered-list">
        {filteredExpenses.length === 0 ? (
          <p>No expenses found in this category 😔</p>
        ) : (
          filteredExpenses.map((expense) => (
            <ExpenseItem key={expense.id} expense={expense} />
          ))
        )}
      </div>
    </div>
  );
}

export default CategoryFilter;
