function ExpenseItem({ expense }) {
  const { title, amount, category, month } = expense;

  return (
    <div className="expense-item">
      <div className="expense-left">
        <h3>{title}</h3>
        <p>₹{amount}</p>
      </div>

      <div className="expense-right">
        <span>📅 {month.charAt(0).toUpperCase() + month.slice(1)}</span>
        <span>🏷️ {category}</span>
      </div>
    </div>
  );
}

export default ExpenseItem;
