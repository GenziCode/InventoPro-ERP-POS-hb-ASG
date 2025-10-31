
import React from 'react';
import Card from './common/Card';

const DiscountsDeals: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-800">Discounts & Deals</h1>
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Manage Promotions</h2>
        </div>
        <p className="text-slate-500">This module will allow creation and management of discounts, special offers, and promotional deals. Feature in development.</p>
      </Card>
    </div>
  );
};

export default DiscountsDeals;
