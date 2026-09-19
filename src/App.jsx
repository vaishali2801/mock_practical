import React from 'react'
import AddExpense from './components/AddExpense'
import ExpenseData from "./components/ExpenseData"

const App = () => {
  return (
    <div className='pt-4 p-3'>
            <h1 className='text-center mb-4'>Expense Tracker</h1>
      <AddExpense/>
      <ExpenseData/>
    </div>
  )
}

export default App
