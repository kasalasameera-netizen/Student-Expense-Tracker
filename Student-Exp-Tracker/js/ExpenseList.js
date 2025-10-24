const ExpenseList = ({ expenses, onDeleteExpense, onEditExpense }) => {
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    
    // Calculate top category
    const categoryTotals = expenses.reduce((acc, exp) => {
        acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
        return acc;
    }, {});
    
    const topCategory = Object.keys(categoryTotals).length > 0 
        ? Object.entries(categoryTotals).reduce((a, b) => categoryTotals[a[0]] > categoryTotals[b[0]] ? a : b)[0]
        : 'None';
    
    return (
        <div className="list-section">
            <h2>Expense List</h2>
            <div className="summary">
                <div className="summary-card">
                    <h3>Total Expenses</h3>
                    <div className="amount">₹{total.toFixed(2)}</div>
                </div>
                <div className="summary-card">
                    <h3>Total Items</h3>
                    <div className="amount">{expenses.length}</div>
                </div>
                <div className="summary-card">
                    <h3>Top Category</h3>
                    <div className="amount">{topCategory}</div>
                </div>
            </div>
            <div className="expense-list">
                {expenses.length === 0 ? (
                    <div className="loading">No expenses added yet</div>
                ) : (
                    expenses.map(expense => (
                        <div key={expense.id} className="expense-item">
                            <div className="expense-details">
                                <h4>{expense.title}</h4>
                                <p>Category: {expense.category}</p>
                                <p>Date: {expense.date}</p>
                                {expense.description && <p>Description: {expense.description}</p>}
                            </div>
                            <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                                <div className="expense-amount">₹{expense.amount.toFixed(2)}</div>
                                <button className="btn btn-primary" style={{fontSize: '12px', padding: '6px 12px'}} onClick={() => onEditExpense(expense)}>Edit</button>
                                <button className="btn btn-danger" onClick={() => onDeleteExpense(expense.id)}>Delete</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

window.ExpenseList = ExpenseList;