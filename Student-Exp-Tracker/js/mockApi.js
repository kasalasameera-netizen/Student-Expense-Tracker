// Mock API Service with localStorage persistence
class MockApiService {
    constructor() {
        this.storageKey = 'studentExpenses';
        this.initializeData();
    }

    initializeData() {
        if (!localStorage.getItem(this.storageKey)) {
            const sampleData = [
                { id: 1, title: 'Lunch', amount: 15.50, category: 'Food', date: '2024-01-15' },
                { id: 2, title: 'Bus Fare', amount: 5.00, category: 'Transport', date: '2024-01-15' },
                { id: 3, title: 'Notebook', amount: 12.99, category: 'Education', date: '2024-01-14' }
            ];
            localStorage.setItem(this.storageKey, JSON.stringify(sampleData));
        }
    }

    async getAllExpenses() {
        return new Promise((resolve) => {
            setTimeout(() => {
                const expenses = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
                resolve(expenses);
            }, 300);
        });
    }

    async addExpense(expense) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const expenses = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
                    const newExpense = {
                        ...expense,
                        id: Date.now(),
                        date: expense.date || new Date().toISOString().split('T')[0]
                    };
                    expenses.push(newExpense);
                    localStorage.setItem(this.storageKey, JSON.stringify(expenses));
                    resolve(newExpense);
                } catch (error) {
                    reject(error);
                }
            }, 200);
        });
    }

    async deleteExpense(id) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const expenses = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
                const filteredExpenses = expenses.filter(expense => expense.id !== id);
                localStorage.setItem(this.storageKey, JSON.stringify(filteredExpenses));
                resolve(true);
            }, 200);
        });
    }

    async getExpensesByCategory() {
        return new Promise((resolve) => {
            setTimeout(() => {
                const expenses = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
                const categoryData = expenses.reduce((acc, expense) => {
                    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
                    return acc;
                }, {});
                resolve(categoryData);
            }, 200);
        });
    }
}

window.mockApi = new MockApiService();