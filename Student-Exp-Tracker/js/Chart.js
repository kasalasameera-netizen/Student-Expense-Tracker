const { useEffect, useRef } = React;

const ExpenseChart = ({ expenses }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        const ctx = chartRef.current.getContext('2d');
        
        // ES6 features: reduce to group data by category
        const categoryData = expenses.reduce((acc, expense) => {
            acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
            return acc;
        }, {});

        const labels = Object.keys(categoryData);
        const data = Object.values(categoryData);
        const colors = [
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
            '#9966FF', '#FF9F40', '#FF6384', '#C9CBCF'
        ];

        chartInstance.current = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: colors.slice(0, labels.length),
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.parsed;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((value / total) * 100).toFixed(1);
                                return `${label}: $${value.toFixed(2)} (${percentage}%)`;
                            }
                        }
                    }
                },
                animation: {
                    animateRotate: true,
                    duration: 1000
                }
            }
        });

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [expenses]);

    // Monthly trend chart data using ES6 features
    const monthlyData = expenses.reduce((acc, expense) => {
        const month = expense.date.substring(0, 7); // YYYY-MM format
        acc[month] = (acc[month] || 0) + expense.amount;
        return acc;
    }, {});

    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const avgExpense = expenses.length > 0 ? totalExpenses / expenses.length : 0;

    return (
        <div className="chart-section">
            <h2>Expense Analytics</h2>
            
            <div className="summary">
                <div className="summary-card">
                    <h3>Total Spent</h3>
                    <div className="amount">
                        ${totalExpenses.toFixed(2)}
                    </div>
                </div>
                <div className="summary-card">
                    <h3>Average Expense</h3>
                    <div className="amount">
                        ${avgExpense.toFixed(2)}
                    </div>
                </div>
                <div className="summary-card">
                    <h3>Categories</h3>
                    <div className="amount">
                        {Object.keys(expenses.reduce((acc, exp) => {
                            acc[exp.category] = true;
                            return acc;
                        }, {})).length}
                    </div>
                </div>
                <div className="summary-card">
                    <h3>This Month</h3>
                    <div className="amount">
                        ${expenses
                            .filter(exp => exp.date.startsWith(new Date().toISOString().substring(0, 7)))
                            .reduce((sum, exp) => sum + exp.amount, 0)
                            .toFixed(2)}
                    </div>
                </div>
            </div>

            <div className="chart-container">
                {expenses.length === 0 ? (
                    <div className="loading">No data to display</div>
                ) : (
                    <canvas ref={chartRef}></canvas>
                )}
            </div>
        </div>
    );
};

window.ExpenseChart = ExpenseChart;