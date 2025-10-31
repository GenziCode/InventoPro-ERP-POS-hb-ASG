
import React from 'react';
import Card from './common/Card';

const EcommerceSync: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-800">Ecommerce Sync</h1>
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Online Store Integration</h2>
        </div>
        <p className="text-slate-500">This module will synchronize products, stock levels, and orders with platforms like Shopify, WooCommerce, etc. Feature in development.</p>
      </Card>
    </div>
  );
};

export default EcommerceSync;
