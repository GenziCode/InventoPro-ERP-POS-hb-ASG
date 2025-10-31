
import React, { useState, FormEvent } from 'react';
import { mockCustomers } from '../services/mockData';
import Card from './common/Card';
import { Customer } from '../types';
import Icon from './common/Icon';

const initialNewCustomerState: Partial<Customer> = {
  Name: '',
  Email: '',
  Phone: '',
  MembershipLevel: 'Standard',
};

const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState(initialNewCustomerState);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewCustomer(prev => ({ ...prev, [name]: value }));
  };

  const handleAddCustomer = (e: FormEvent) => {
    e.preventDefault();
    if (!newCustomer.Name) {
      alert("Customer Name is required.");
      return;
    }

    const customerToAdd: Customer = {
      CustomerID: `C${(customers.length + 1).toString().padStart(3, '0')}`,
      Name: newCustomer.Name!,
      Email: newCustomer.Email || '',
      Phone: newCustomer.Phone || '',
      MembershipLevel: newCustomer.MembershipLevel || 'Standard',
      Points: 0,
    };

    setCustomers(prev => [...prev, customerToAdd]);
    setNewCustomer(initialNewCustomerState);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <Card className="w-full max-w-lg animate-fade-in-scale">
            <form onSubmit={handleAddCustomer}>
              <div className="flex justify-between items-center border-b pb-3 mb-4">
                <h2 className="text-xl font-semibold">Add New Customer</h2>
                <button type="button" onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-slate-800">
                  <Icon name="close" className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">Customer Name</label>
                  <input type="text" name="Name" value={newCustomer.Name} onChange={handleInputChange} className="mt-1 block w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Email</label>
                  <input type="email" name="Email" value={newCustomer.Email} onChange={handleInputChange} className="mt-1 block w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Phone</label>
                  <input type="tel" name="Phone" value={newCustomer.Phone} onChange={handleInputChange} className="mt-1 block w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Membership Level</label>
                  <select name="MembershipLevel" value={newCustomer.MembershipLevel} onChange={handleInputChange} className="mt-1 block w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                    <option>Standard</option>
                    <option>Gold</option>
                    <option>Platinum</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="bg-slate-200 text-slate-800 px-4 py-2 rounded-md hover:bg-slate-300 transition">Cancel</button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">Save Customer</button>
              </div>
            </form>
          </Card>
        </div>
      )}

      <h1 className="text-3xl font-bold text-slate-800">Customer Management</h1>
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">All Customers</h2>
          <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
            Add New Customer
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Membership Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Points</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {customers.map(customer => (
                <tr key={customer.CustomerID}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-slate-900">{customer.Name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-900">{customer.Email}</div>
                    <div className="text-sm text-slate-500">{customer.Phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      customer.MembershipLevel === 'Gold' ? 'bg-yellow-100 text-yellow-800' : 
                      customer.MembershipLevel === 'Platinum' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {customer.MembershipLevel}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{customer.Points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Customers;
