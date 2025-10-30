import React, { useState, useMemo, FormEvent } from 'react';
import { mockInventory } from '../services/mockData';
import Card from './common/Card';
import { InventoryItem } from '../types';
import Icon from './common/Icon';

type SortKey = keyof InventoryItem;

const initialNewProductState: Partial<InventoryItem> = {
  Name: '',
  SKU: '',
  Barcode: '',
  Category: '',
  Stock: 0,
  PriceRetail: 0,
  Cost: 0,
};

const Inventory: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>(mockInventory);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: 'ascending' | 'descending' } | null>({ key: 'Name', direction: 'ascending' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState(initialNewProductState);

  const sortedInventory = useMemo(() => {
    let sortableItems = [...inventory].filter(item =>
      item.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.SKU.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Barcode.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [searchTerm, sortConfig, inventory]);

  const requestSort = (key: SortKey) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  const getSortIndicator = (key: SortKey) => {
    if (!sortConfig || sortConfig.key !== key) return null;
    return sortConfig.direction === 'ascending' ? '▲' : '▼';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleAddProduct = (e: FormEvent) => {
    e.preventDefault();
    if (!newProduct.Name || !newProduct.SKU) {
        alert("Product Name and SKU are required.");
        return;
    }
    
    const productToAdd: InventoryItem = {
      ID: `P${(inventory.length + 1).toString().padStart(3, '0')}`,
      Name: newProduct.Name!,
      SKU: newProduct.SKU!,
      Barcode: newProduct.Barcode || '',
      Category: newProduct.Category || 'Uncategorized',
      PriceRetail: newProduct.PriceRetail || 0,
      PriceWholesale: (newProduct.Cost || 0) * 1.2,
      Cost: newProduct.Cost || 0,
      Stock: newProduct.Stock || 0,
      LowLevel: 10, // Default low level
      ImageURL: `https://picsum.photos/seed/P${inventory.length + 1}/100`,
    };
    
    setInventory(prevInventory => [...prevInventory, productToAdd]);
    setNewProduct(initialNewProductState);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
       {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition-opacity duration-300">
            <Card className="w-full max-w-lg transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale">
                <form onSubmit={handleAddProduct}>
                    <div className="flex justify-between items-center border-b pb-3 mb-4">
                        <h2 className="text-xl font-semibold">Add New Product</h2>
                        <button type="button" onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-slate-800">
                            <Icon name="close" className="w-6 h-6"/>
                        </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-slate-700">Product Name</label>
                            <input type="text" name="Name" value={newProduct.Name} onChange={handleInputChange} className="mt-1 block w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700">SKU</label>
                            <input type="text" name="SKU" value={newProduct.SKU} onChange={handleInputChange} className="mt-1 block w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Barcode</label>
                            <input type="text" name="Barcode" value={newProduct.Barcode} onChange={handleInputChange} className="mt-1 block w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Category</label>
                            <input type="text" name="Category" value={newProduct.Category} onChange={handleInputChange} className="mt-1 block w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                        <div>
                           <label className="block text-sm font-medium text-slate-700">Stock</label>
                           <input type="number" name="Stock" value={newProduct.Stock} onChange={handleInputChange} className="mt-1 block w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-slate-700">Retail Price ($)</label>
                            <input type="number" name="PriceRetail" step="0.01" value={newProduct.PriceRetail} onChange={handleInputChange} className="mt-1 block w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Cost ($)</label>
                            <input type="number" name="Cost" step="0.01" value={newProduct.Cost} onChange={handleInputChange} className="mt-1 block w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end space-x-3">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="bg-slate-200 text-slate-800 px-4 py-2 rounded-md hover:bg-slate-300 transition">Cancel</button>
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">Save Product</button>
                    </div>
                </form>
            </Card>
        </div>
      )}

      <style>{`
        @keyframes fade-in-scale {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-scale {
          animation: fade-in-scale 0.2s ease-out forwards;
        }
      `}</style>

      <h1 className="text-3xl font-bold text-slate-800">Inventory Management</h1>
      <Card>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
          <input
            type="text"
            placeholder="Search by name, SKU, or barcode..."
            className="w-full sm:w-1/3 p-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            onChange={e => setSearchTerm(e.target.value)}
          />
           <button onClick={() => setIsModalOpen(true)} className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
            Add New Product
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                {['ImageURL','Name', 'SKU', 'Barcode', 'Category', 'Stock', 'PriceRetail'].map(key => (
                  <th key={key} scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort(key as SortKey)}>
                    {key === 'ImageURL' ? 'Image' : key.replace(/([A-Z])/g, ' $1').trim()} {getSortIndicator(key as SortKey)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {sortedInventory.map(item => (
                <tr key={item.ID} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img src={item.ImageURL} alt={item.Name} className="w-12 h-12 object-cover rounded-md" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-slate-900">{item.Name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{item.SKU}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{item.Barcode}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{item.Category}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      item.Stock < item.LowLevel ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {item.Stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-800">${item.PriceRetail.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Inventory;