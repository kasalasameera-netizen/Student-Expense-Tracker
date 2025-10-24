const { useState, useEffect } = React;

const App = () => {
    const [expenses, setExpenses] = useState([]);
    const [editingExpense, setEditingExpense] = useState(null);

    useEffect(() => {
        window.mockApi.getAllExpenses().then(setExpenses);
    }, []);

    const handleAddExpense = async (expenseData) => {
        const newExpense = await window.mockApi.addExpense(expenseData);
        setExpenses(prev => [...prev, newExpense]);
    };

    const handleUpdateExpense = async (id, updatedData) => {
        const updatedExpense = await window.mockApi.updateExpense(id, updatedData);
        setExpenses(prev => prev.map(exp => exp.id === id ? updatedExpense : exp));
    };

    const handleDeleteExpense = async (id) => {
        await window.mockApi.deleteExpense(id);
        setExpenses(prev => prev.filter(exp => exp.id !== id));
    };

    const handleEditExpense = (expense) => {
        setEditingExpense(expense);
    };

    return (
        <div className="container">
            <header className="header">
                <h1>Student Expense Tracker</h1>
                <p>Track your daily expenses and visualize your spending patterns</p>
            </header>
            <div style={{padding: '30px'}}>
                <window.ExpenseForm 
                    onAddExpense={handleAddExpense} 
                    onUpdateExpense={handleUpdateExpense}
                    editingExpense={editingExpense}
                    setEditingExpense={setEditingExpense}
                />
            </div>
            <div style={{padding: '0 30px 30px'}}>
                <window.ExpenseList 
                    expenses={expenses} 
                    onDeleteExpense={handleDeleteExpense}
                    onEditExpense={handleEditExpense}
                />
            </div>
            <div style={{padding: '0 30px 30px'}}>
                <window.ExpenseChart expenses={expenses} />
            </div>
            <div style={{padding: '0 30px 30px'}}>
                <window.MonthlySummary expenses={expenses} />
            </div>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));