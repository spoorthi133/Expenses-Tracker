import { useContext } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';

function ExpenseItem({ expense }) {
  const { deleteExpense } = useContext(ExpenseContext);

  return (
    <div className="expense-item">
      <span>{expense.title}</span>
      <span>₹{expense.amount}</span>
      <button onClick={() => deleteExpense(expense.id)}>Delete</button>
    </div>
  );
}

export default ExpenseItem;
