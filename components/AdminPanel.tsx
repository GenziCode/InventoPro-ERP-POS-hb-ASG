
import React, { useState } from 'react';
import Card from './common/Card';

type AdminTab = 'Settings' | 'Role Manager' | 'Sync Manager' | 'AI Configuration';

const SettingsTab = () => (
    <div className="space-y-6">
        <div>
            <h3 className="text-lg font-semibold mb-2 text-slate-800">Store Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700">Store Name</label>
                    <input type="text" defaultValue="InventoPro Auto Parts" className="mt-1 block w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700">Contact Email</label>
                    <input type="email" defaultValue="contact@inventopro.com" className="mt-1 block w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
                </div>
            </div>
        </div>
        <div>
            <h3 className="text-lg font-semibold mb-2 text-slate-800">Localization</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700">Currency</label>
                    <select className="mt-1 block w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                        <option>USD ($)</option>
                        <option>EUR (€)</option>
                        <option>GBP (£)</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700">Time Zone</label>
                    <select className="mt-1 block w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                        <option>UTC-5 (Eastern Time)</option>
                        <option>UTC-8 (Pacific Time)</option>
                        <option>UTC+0 (Greenwich Mean Time)</option>
                    </select>
                </div>
            </div>
        </div>
        <div className="flex justify-end">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">Save Settings</button>
        </div>
    </div>
);

const RoleManagerTab = () => (
    <div>
        <h3 className="text-lg font-semibold mb-4 text-slate-800">User Roles & Permissions</h3>
        <div className="overflow-x-auto">
            <table className="min-w-full">
                <thead className="bg-slate-50">
                    <tr>
                        <th className="p-3 text-left text-sm font-semibold text-slate-600">Role</th>
                        <th className="p-3 text-center text-sm font-semibold text-slate-600">Access POS</th>
                        <th className="p-3 text-center text-sm font-semibold text-slate-600">Edit Inventory</th>
                        <th className="p-3 text-center text-sm font-semibold text-slate-600">View Reports</th>
                        <th className="p-3 text-center text-sm font-semibold text-slate-600">Admin Access</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                    {['Administrator', 'Manager', 'Cashier'].map(role => (
                        <tr key={role}>
                            <td className="p-3 font-medium text-slate-800">{role}</td>
                            {[1,2,3,4].map(p => (
                                <td key={p} className="p-3 text-center">
                                    <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500" defaultChecked={role === 'Administrator' || (role === 'Manager' && p < 4) || (role === 'Cashier' && p === 1)} />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

const SyncManagerTab = () => (
    <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-800">External Platform Sync</h3>
        <div className="p-4 border rounded-lg bg-slate-50">
            <h4 className="font-semibold text-slate-700">Google Sheets</h4>
            <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2">
                    <span className="inline-block h-3 w-3 rounded-full bg-green-500"></span>
                    <span className="text-slate-600">Connected</span>
                </div>
                <span className="text-sm text-slate-500">Last Synced: 5 minutes ago</span>
            </div>
            <button className="mt-4 bg-white text-slate-700 px-4 py-2 rounded-md border border-slate-300 hover:bg-slate-100 transition">Sync Now</button>
        </div>
         <div className="p-4 border rounded-lg bg-slate-50">
            <h4 className="font-semibold text-slate-700">QuickBooks</h4>
            <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2">
                    <span className="inline-block h-3 w-3 rounded-full bg-slate-400"></span>
                    <span className="text-slate-600">Not Connected</span>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">Connect</button>
            </div>
        </div>
    </div>
);

const AIConfigTab = () => (
    <div>
        <h3 className="text-lg font-semibold mb-2">AI Module Configuration</h3>
        <p className="text-slate-600 mb-4">Toggle AI features, set thresholds, and manage API keys for services like Gemini.</p>
        <div className="space-y-3">
            <label className="flex items-center p-3 bg-slate-50 rounded-lg">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500" defaultChecked/>
                <span className="ml-3 text-slate-700">Enable Dashboard Insights</span>
            </label>
            <label className="flex items-center p-3 bg-slate-50 rounded-lg">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500" defaultChecked/>
                <span className="ml-3 text-slate-700">Enable Smart Reorder Notifications</span>
            </label>
            <label className="flex items-center p-3 bg-slate-50 rounded-lg">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"/>
                <span className="ml-3 text-slate-700">Enable AI Sales Forecasting</span>
            </label>
        </div>
    </div>
);

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('Settings');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Settings': return <SettingsTab />;
      case 'Role Manager': return <RoleManagerTab />;
      case 'Sync Manager': return <SyncManagerTab />;
      case 'AI Configuration': return <AIConfigTab />;
      default: return null;
    }
  };

  const tabs: AdminTab[] = ['Settings', 'Role Manager', 'Sync Manager', 'AI Configuration'];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-800">Admin Panel</h1>
      <Card>
        <div className="border-b border-slate-200">
          <nav className="-mb-px flex space-x-6 overflow-x-auto" aria-label="Tabs">
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
