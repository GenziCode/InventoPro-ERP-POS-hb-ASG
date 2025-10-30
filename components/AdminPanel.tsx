
import React, { useState } from 'react';
import Card from './common/Card';

type AdminTab = 'Settings' | 'Role Manager' | 'Sync Manager' | 'AI Configuration';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('Settings');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Settings':
        return <div>General system settings will be configured here. (e.g., currency, time zone, unit systems).</div>;
      case 'Role Manager':
        return <div>User roles and permissions management interface.</div>;
      case 'Sync Manager':
        return <div>Configure and monitor data synchronization with external platforms like Google Sheets.</div>;
      case 'AI Configuration':
        return (
            <div>
                <h3 className="text-lg font-semibold mb-2">AI Module Configuration</h3>
                <p>Toggle AI features, set thresholds, and manage API keys for services like Gemini.</p>
                <div className="mt-4 space-y-2">
                    <label className="flex items-center">
                        <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" defaultChecked/>
                        <span className="ml-2 text-slate-700">Enable Sales Forecasting</span>
                    </label>
                    <label className="flex items-center">
                        <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" defaultChecked/>
                        <span className="ml-2 text-slate-700">Enable Smart Notifications</span>
                    </label>
                    <label className="flex items-center">
                        <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600"/>
                        <span className="ml-2 text-slate-700">Enable AI Auto-Fix</span>
                    </label>
                </div>
            </div>
        );
      default:
        return null;
    }
  };

  const tabs: AdminTab[] = ['Settings', 'Role Manager', 'Sync Manager', 'AI Configuration'];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-800">Admin Panel</h1>
      <Card>
        <div className="border-b border-slate-200">
          <nav className="-mb-px flex space-x-6" aria-label="Tabs">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
        <div className="pt-6">
          {renderTabContent()}
        </div>
      </Card>
    </div>
  );
};

export default AdminPanel;
