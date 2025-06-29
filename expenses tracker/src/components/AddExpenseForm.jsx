import { useContext, useState } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';

function AddExpenseForm() {
  const { addExpense, selectedMonth } = useContext(ExpenseContext);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('food');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !amount || selectedMonth === 'all') {
      alert('Fill all fields + choose a valid month');
      return;
    }

    addExpense({
      id: Date.now(),
      title,
      amount: parseFloat(amount),
      month: selectedMonth,
      category,
    });

    setTitle('');
    setAmount('');
    setCategory('food');
  };

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <input
        type="text"
        placeholder="Expense title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="number"
        placeholder="Amount (₹)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="food">🍕 Food</option>
        <option value="travel">✈️ Travel</option>
        <option value="shopping">🛍️ Shopping</option>
        <option value="entertainment">🎮 Entertainment</option>
        <option value="other">🔖 Other</option>
      </select>

      <button type="submit">Add</button>
    </form>
  );
}

export default AddExpenseForm;
