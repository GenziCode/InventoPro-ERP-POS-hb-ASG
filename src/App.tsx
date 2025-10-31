
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Inventory from './components/Inventory';
import POS from './components/POS';
import Customers from './components/Customers';
import AdminPanel from './components/AdminPanel';
import { ModuleType } from './types';
import Vendors from './components/Vendors';
import PurchaseOrders from './components/PurchaseOrders';
import Payments from './components/Payments';
import Expenses from './components/Expenses';
import Cargo from './components/Cargo';
import Reports from './components/Reports';
import Memberships from './components/Memberships';
import DiscountsDeals from './components/DiscountsDeals';
import EcommerceSync from './components/EcommerceSync';

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<ModuleType>('Dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const renderModule = () => {
    switch (activeModule) {
      case 'Dashboard': return <Dashboard />;
      case 'Inventory': return <Inventory />;
      case 'POS': return <POS />;
      case 'Customers': return <Customers />;
      case 'Vendors': return <Vendors />;
      case 'Purchase Orders': return <PurchaseOrders />;
      case 'Payments': return <Payments />;
      case 'Expenses': return <Expenses />;
      case 'Cargo': return <Cargo />;
      case 'Reports': return <Reports />;
      case 'Memberships': return <Memberships />;
      case 'Discounts & Deals': return <DiscountsDeals />;
      case 'Ecommerce Sync': return <EcommerceSync />;
      case 'Admin Panel': return <AdminPanel />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-100 text-slate-800">
      <Sidebar
        activeModule={activeModule}
        setActiveModule={setActiveModule}
        isOpen={isSidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header sidebarToggle={() => setSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-100 p-4 sm:p-6 lg:p-8">
          {renderModule()}
        </main>
      </div>
    </div>
  );
};

export default App;