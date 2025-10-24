# Student Expense Tracker

A Single Page Application (SPA) built with React, ReactDOM, and Babel for tracking student expenses with interactive visualizations.

## Features

### Core Components
- **ExpenseForm Component**: Add new expenses with validation
- **ExpenseList Component**: Display, filter, and manage expenses
- **Chart Component**: Interactive expense visualization using Chart.js
- **Mock API Service**: Simulated backend with localStorage persistence

### Modern ES6 Features
- **map()**: Transform expense data for display
- **filter()**: Filter expenses by category and date
- **reduce()**: Calculate totals, averages, and group data
- **async/await**: Handle asynchronous API operations

### Key Functionality
- Add expenses with title, amount, category, and date
- Filter expenses by category and month
- Sort expenses by date, amount, or category
- Delete individual expenses
- Real-time expense analytics and summaries
- Interactive doughnut chart visualization
- Responsive design for all devices

## Technology Stack
- **Frontend**: React 18, ReactDOM, Babel (JSX processing)
- **Visualization**: Chart.js
- **Storage**: localStorage (mock backend)
- **Styling**: CSS3 with Grid and Flexbox

## Project Structure
```
Student-Exp-Tracker/
├── index.html          # Main HTML file
├── styles.css          # Application styles
├── js/
│   ├── App.js          # Main application component
│   ├── ExpenseForm.js  # Expense form component
│   ├── ExpenseList.js  # Expense list component
│   ├── Chart.js        # Chart visualization component
│   └── mockApi.js      # Mock API service
└── README.md           # Project documentation
```

## Getting Started

1. Open `index.html` in a modern web browser
2. The application will load with sample data
3. Start adding your own expenses using the form
4. Use filters to analyze your spending patterns
5. View interactive charts for expense breakdown

## Features Demonstration

### ES6 Features Used
- **Array.map()**: Transform expense data for rendering
- **Array.filter()**: Filter expenses by criteria
- **Array.reduce()**: Calculate summaries and group data
- **async/await**: Handle API operations
- **Template literals**: String formatting
- **Destructuring**: Extract object properties
- **Arrow functions**: Concise function syntax

### Error Handling
- Form validation for required fields
- API error handling with user feedback
- Loading states during operations

### Responsive Design
- Mobile-friendly interface
- Flexible grid layout
- Adaptive components

## Sample Data
The application includes sample expenses to demonstrate functionality:
- Lunch ($15.50) - Food category
- Bus Fare ($5.00) - Transport category  
- Notebook ($12.99) - Education category

## Browser Compatibility
- Chrome (recommended)
- Firefox
- Safari
- Edge

All modern browsers with ES6 support are compatible.