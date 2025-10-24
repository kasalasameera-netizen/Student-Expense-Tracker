const { useRef, useEffect } = React;

const ExpenseChart = ({ expenses }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        if (expenses.length === 0) return;

        const ctx = chartRef.current.getContext('2d');
        const categoryData = expenses.reduce((acc, expense) => {
            acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
            return acc;
        }, {});

        const labels = Object.keys(categoryData);
        const data = Object.values(categoryData);
        const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];

        chartInstance.current = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: colors.slice(0, labels.length),
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((context.parsed / total) * 100).toFixed(1);
                                return `${context.label}: ₹${context.parsed.toFixed(2)} (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [expenses]);

    return (
        <div className="chart-section">
            <h2>Expense Distribution</h2>
            <div className="chart-container" style={{height: '300px'}}>
                {expenses.length === 0 ? (
                    <div className="loading">Add expenses to see distribution</div>
                ) : (
                    <canvas ref={chartRef}></canvas>
                )}
            </div>
        </div>
    );
};

const MonthlySummary = ({ expenses }) => {
    const monthlyData = expenses.reduce((acc, expense) => {
        const month = expense.date.substring(0, 7);
        acc[month] = (acc[month] || 0) + expense.amount;
        return acc;
    }, {});

    return (
        <div className="chart-section">
            <h2>Monthly Summary</h2>
            {Object.keys(monthlyData).length === 0 ? (
                <div className="loading">No monthly data available</div>
            ) : (
                Object.entries(monthlyData).map(([month, amount]) => (
                    <div key={month} className="expense-item">
                        <div className="expense-details">
                            <h4>{new Date(month + '-01').toLocaleDateString('en-US', {month: 'long', year: 'numeric'})}</h4>
                        </div>
                        <div className="expense-amount">₹{amount.toFixed(2)}</div>
                    </div>
                ))
            )}
        </div>
    );
};

window.ExpenseChart = ExpenseChart;
window.MonthlySummary = MonthlySummary;