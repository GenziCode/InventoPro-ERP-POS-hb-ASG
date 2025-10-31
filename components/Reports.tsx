
import React from 'react';
import Card from './common/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mockSales } from '../services/mockData';

const Reports: React.FC = () => {
  const salesDataForChart = mockSales.map(sale => ({
      name: `Sale ${sale.SaleID.slice(-3)}`,
      amount: sale.Total,
  }));

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-800">Reports</h1>
      <Card>
        <h2 className="text-xl font-semibold mb-4">Sales Report</h2>
        <p className="text-slate-500 mb-4">This module will offer a variety of customizable reports for sales, inventory, customers, and financials. Below is a sample sales chart.</p>
        <ResponsiveContainer width="100%" height={400}>
            <BarChart data={salesDataForChart}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
              <Legend />
              <Bar dataKey="amount" fill="#3b82f6" name="Sale Amount" />
            </BarChart>
          </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default Reports;
