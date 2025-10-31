
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mockInventory, mockSales } from '../services/mockData';
import { getDashboardInsights } from '../services/geminiService';
import Card from './common/Card';
import Icon from './common/Icon';

const parseMarkdown = (text: string) => {
  const lines = text.split('\n').filter(line => line.trim() !== '');
  let html = '';
  let inList = false;

  lines.forEach(line => {
    line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
      const listItem = `<li>${line.replace(/^\s*(\*|-)\s/, '')}</li>`;
      if (!inList) {
        html += `<ul>${listItem}`;
        inList = true;
      } else {
        html += listItem;
      }
    } else {
      if (inList) {
        html += '</ul>';
        inList = false;
      }
      html += `<p>${line}</p>`;
    }
  });

  if (inList) {
    html += '</ul>';
  }

  return html;
};

const Dashboard: React.FC = () => {
  const [aiInsights, setAiInsights] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const totalRevenue = mockSales.reduce((sum, sale) => sum + sale.Total, 0);
  const lowStockItems = mockInventory.filter(item => item.Stock < item.LowLevel).length;
  const salesToday = mockSales.filter(sale => new Date(sale.Date).toDateString() === new Date().toDateString()).length;
  
  const salesDataForChart = mockSales.map(sale => ({
      name: `Sale ${sale.SaleID.slice(-3)}`,
      amount: sale.Total,
  }));

  const handleFetchInsights = async () => {
    setIsLoading(true);
    try {
      const insights = await getDashboardInsights(mockInventory, mockSales);
      setAiInsights(parseMarkdown(insights));
    } catch (error) {
      setAiInsights('<p class="text-red-500">Failed to load AI insights. Please try again.</p>');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleFetchInsights();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <h3 className="text-slate-500 font-medium">Total Revenue</h3>
          <p className="text-3xl font-bold text-slate-800 mt-2">${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        </Card>
        <Card>
          <h3 className="text-slate-500 font-medium">Sales Today</h3>
          <p className="text-3xl font-bold text-slate-800 mt-2">{salesToday}</p>
        </Card>
        <Card>
          <h3 className="text-slate-500 font-medium">Low Stock Alerts</h3>
          <p className="text-3xl font-bold text-red-500 mt-2">{lowStockItems}</p>
        </Card>
        <Card>
          <h3 className="text-slate-500 font-medium">New Customers</h3>
          <p className="text-3xl font-bold text-slate-800 mt-2">2</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <Card className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Recent Sales Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesDataForChart}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
              <Legend />
              <Bar dataKey="amount" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        
        {/* AI Insights */}
        <Card>
          <div className="flex justify-between items-center mb-4">
             <h2 className="text-xl font-semibold">AI Insights</h2>
             <button onClick={handleFetchInsights} disabled={isLoading} className="text-blue-500 hover:text-blue-700 disabled:opacity-50">
                {isLoading ? (
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                ) : <Icon name="admin" className="w-5 h-5"/>}
             </button>
          </div>
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
                <p className="text-slate-500">Generating insights...</p>
            </div>
          ) : (
            <div className="prose prose-sm text-slate-600 max-w-none" dangerouslySetInnerHTML={{ __html: aiInsights }} />
          )}
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;