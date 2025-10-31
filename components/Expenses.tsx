
import React from 'react';
import Card from './common/Card';
import { mockExpenses } from '../services/mockData';

const Expenses: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-800">Expenses</h1>
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Track Business Expenses</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
            Add New Expense
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Amount</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {mockExpenses.map(expense => (
                <tr key={expense.ExpenseID}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{new Date(expense.Date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-800">{expense.Category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{expense.Description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-semibold text-red-600">${expense.Amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Expenses;
