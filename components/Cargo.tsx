
import React from 'react';
import Card from './common/Card';

const Cargo: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-800">Cargo & Shipments</h1>
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Track Shipments</h2>
        </div>
        <p className="text-slate-500">This module will integrate with shipping carriers to track incoming and outgoing cargo. Feature in development.</p>
      </Card>
    </div>
  );
};

export default Cargo;
