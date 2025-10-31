
import React from 'react';
import Card from './common/Card';

const Memberships: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-800">Memberships</h1>
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Loyalty Programs</h2>
        </div>
        <p className="text-slate-500">This module will handle customer memberships, points, and loyalty tiers. Feature in development.</p>
      </Card>
    </div>
  );
};

export default Memberships;
