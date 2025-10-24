const { useState, useMemo } = React;

const ExpenseList = ({ expenses, onDeleteExpense, loading }) => {
    const [filters, setFilters] = useState({
        category: '',
        month: '',
        sortBy: 'date'
    });

    const categories = ['Food', 'Transport', 'Education', 'Entertainment', 'Health', 'Other'];

    // ES6 features: filter, map, reduce, sort
    const filteredAndSortedExpenses = useMemo(() => {
        return expenses
            .filter(expense => {
                const categoryMatch = !filters.category || expense.category === filters.category;
                const monthMatch = !filters.month || expense.date.startsWith(filters.month);
                return categoryMatch && monthMatch;
            })
            .sort((a, b) => {
                switch (filters.sortBy) {
                    case 'amount':
                        return b.amount - a.amount;
                    case 'category':
                        return a.category.localeCompare(b.category);
                    case 'date':
                    default:
                        return new Date(b.date) - new Date(a.date);
                }
            });
    }, [expenses, filters]);

    const summary = useMemo(() => {
        return filteredAndSortedExpenses.reduce((acc, expense) => {
            acc.total += expense.amount;
            acc.count += 1;
            acc.average = acc.total / acc.count;
            return acc;
        }, { total: 0, count: 0, average: 0 });
    }, [filteredAndSortedExpenses]);

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="list-section">
            <h2>Expense List</h2>
            
            <div className="summary">
                <div className="summary-card">
                    <h3>Total Expenses</h3>
                    <div className="amount">{formatCurrency(summary.total)}</div>
                </div>
                <div className="summary-card">
                    <h3>Total Items</h3>
                    <div className="amount">{summary.count}</div>
                </div>
                <div className="summary-card">
                    <h3>Average</h3>
                    <div className="amount">{formatCurrency(summary.average)}</div>
                </div>
            </div>

            <div className="filters">
                <div className="filter-group">
                    <label>Category</label>
                    <select name="category" value={filters.category} onChange={handleFilterChange}>
                        <option value="">All Categories</option>
                        {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
                <div className="filter-group">
                    <label>Month</label>
                    <input
                        type="month"
                        name="month"
                        value={filters.month}
                        onChange={handleFilterChange}
                    />
                </div>
                <div className="filter-group">
                    <label>Sort By</label>
                    <select name="sortBy" value={filters.sortBy} onChange={handleFilterChange}>
                        <option value="date">Date</option>
                        <option value="amount">Amount</option>
                        <option value="category">Category</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="loading">Loading expenses...</div>
            ) : (
                <div className="expense-list">
                    {filteredAndSortedExpenses.length === 0 ? (
                        <div className="loading">No expenses found</div>
                    ) : (
                        filteredAndSortedExpenses.map(expense => (
                            <div key={expense.id} className="expense-item">
                                <div className="expense-details">
                                    <h4>{expense.title}</h4>
                                    <p>Category: {expense.category}</p>
                                    <p>Date: {formatDate(expense.date)}</p>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <div className="expense-amount">
                                        {formatCurrency(expense.amount)}
                                    </div>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => onDeleteExpense(expense.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

window.ExpenseList = ExpenseList;