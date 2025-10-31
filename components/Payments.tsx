
import React from 'react';
import Card from './common/Card';
import { mockPayments } from '../services/mockData';

const Payments: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-800">Payment History</h1>
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">All Transactions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Payment ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Sale ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Method</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Amount</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {mockPayments.map(payment => (
                <tr key={payment.PaymentID}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-800">{payment.PaymentID}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{payment.SaleID}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{new Date(payment.Date).toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                     <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      payment.Method === 'Card' ? 'bg-blue-100 text-blue-800' :
                      payment.Method === 'Cash' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {payment.Method}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-semibold text-slate-800">${payment.Amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Payments;
