const { useState, useEffect } = React;

const ExpenseForm = ({ onAddExpense, onUpdateExpense, editingExpense, setEditingExpense }) => {
    const [formData, setFormData] = useState({
        title: '', amount: '', category: 'Food', date: new Date().toISOString().split('T')[0], description: ''
    });

    useEffect(() => {
        if (editingExpense) {
            setFormData({
                title: editingExpense.title || '',
                amount: editingExpense.amount || '',
                category: editingExpense.category || 'Food',
                date: editingExpense.date || new Date().toISOString().split('T')[0],
                description: editingExpense.description || ''
            });
        }
    }, [editingExpense]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.title && formData.amount > 0) {
            const expenseData = {
                title: formData.title,
                amount: Number(formData.amount),
                category: formData.category,
                date: formData.date,
                description: formData.description
            };
            
            if (editingExpense) {
                await onUpdateExpense(editingExpense.id, expenseData);
                setEditingExpense(null);
            } else {
                await onAddExpense(expenseData);
            }
            setFormData({ title: '', amount: '', category: 'Food', date: new Date().toISOString().split('T')[0], description: '' });
        }
    };

    const handleCancel = () => {
        setEditingExpense(null);
        setFormData({ title: '', amount: '', category: 'Food', date: new Date().toISOString().split('T')[0], description: '' });
    };

    return (
        <div className="form-section">
            <h2>{editingExpense ? 'Edit Expense' : 'Add New Expense'}</h2>
            <form className="expense-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
                </div>
                <div className="form-group">
                    <label>Amount (₹)</label>
                    <input type="number" step="0.01" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} required />
                </div>
                <div className="form-group">
                    <label>Category</label>
                    <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                        <option value="Food">Food</option>
                        <option value="Transport">Transport</option>
                        <option value="Education">Education</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Health">Health</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Date</label>
                    <input type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} required />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Optional description" rows="3" style={{padding: '12px', border: '2px solid #ddd', borderRadius: '8px', fontSize: '16px', resize: 'vertical'}} />
                </div>
                <div style={{display: 'flex', gap: '10px'}}>
                    <button type="submit" className="btn btn-primary">
                        {editingExpense ? 'Update Expense' : 'Add Expense'}
                    </button>
                    {editingExpense && (
                        <button type="button" className="btn btn-danger" onClick={handleCancel}>
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

window.ExpenseForm = ExpenseForm;