// Mock API Service
const mockApi = {
    expenses: [],
    async getAllExpenses() {
        return new Promise(resolve => setTimeout(() => resolve([...this.expenses]), 300));
    },
    async addExpense(expense) {
        return new Promise(resolve => {
            setTimeout(() => {
                const newExpense = { 
                    ...expense, 
                    id: Date.now() + Math.random(),
                    amount: Number(expense.amount)
                };
                this.expenses.push(newExpense);
                resolve(newExpense);
            }, 200);
        });
    },
    async updateExpense(id, updatedExpense) {
        return new Promise(resolve => {
            setTimeout(() => {
                const index = this.expenses.findIndex(e => e.id === id);
                if (index !== -1) {
                    this.expenses[index] = { 
                        ...updatedExpense, 
                        id,
                        amount: Number(updatedExpense.amount)
                    };
                }
                resolve(this.expenses[index]);
            }, 200);
        });
    },
    async deleteExpense(id) {
        return new Promise(resolve => {
            setTimeout(() => {
                this.expenses = this.expenses.filter(e => e.id !== id);
                resolve(true);
            }, 200);
        });
    }
};

window.mockApi = mockApi;