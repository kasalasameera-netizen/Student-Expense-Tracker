const { useState, useEffect } = React;

const App = () => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Load expenses on component mount using async/await
    useEffect(() => {
        loadExpenses();
    }, []);

    const loadExpenses = async () => {
        try {
            setLoading(true);
            setError('');
            const data = await window.mockApi.getAllExpenses();
            setExpenses(data);
        } catch (err) {
            setError('Failed to load expenses');
            console.error('Error loading expenses:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddExpense = async (expenseData) => {
        try {
            setLoading(true);
            const newExpense = await window.mockApi.addExpense(expenseData);
            setExpenses(prevExpenses => [...prevExpenses, newExpense]);
        } catch (err) {
            setError('Failed to add expense');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteExpense = async (id) => {
        try {
            await window.mockApi.deleteExpense(id);
            setExpenses(prevExpenses => 
                prevExpenses.filter(expense => expense.id !== id)
            );
        } catch (err) {
            setError('Failed to delete expense');
            console.error('Error deleting expense:', err);
        }
    };

    return (
        <div className="container">
            <header className="header">
                <h1>Student Expense Tracker</h1>
                <p>Track your daily expenses and visualize your spending patterns</p>
            </header>

            {error && (
                <div className="error" style={{ margin: '20px 30px' }}>
                    {error}
                </div>
            )}

            <div className="main-content">
                <window.ExpenseForm 
                    onAddExpense={handleAddExpense}
                    loading={loading}
                />
                
                <window.ExpenseList 
                    expenses={expenses}
                    onDeleteExpense={handleDeleteExpense}
                    loading={loading}
                />
            </div>

            <window.ExpenseChart expenses={expenses} />
        </div>
    );
};

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);