import React, { useState, useEffect, useRef, useCallback } from 'react';
import { mockInventory, mockCustomers } from '../services/mockData';
import { InventoryItem, Customer, SaleItem } from '../types';
import Card from './common/Card';
import Icon from './common/Icon';

// Declare Html5Qrcode at the component level
declare var Html5Qrcode: any;

const POS: React.FC = () => {
  const [cart, setCart] = useState<SaleItem[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer>(mockCustomers[3]); // Default to Walk-in
  const [isScannerModalOpen, setScannerModalOpen] = useState(false);
  const html5QrCodeRef = useRef<any>(null);

  const getPriceForCustomer = useCallback((item: InventoryItem, customer: Customer) => {
    if (customer.MembershipLevel === 'Platinum' || customer.MembershipLevel === 'Gold') {
      return item.PriceRetail * 0.9; // 10% discount for premium members
    }
    return item.PriceRetail;
  }, []);

  const addToCart = useCallback((item: InventoryItem) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(cartItem => cartItem.product.ID === item.ID);
      if (existingItem) {
        return currentCart.map(cartItem =>
          cartItem.product.ID === item.ID ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      } else {
        return [...currentCart, { product: item, quantity: 1, price: getPriceForCustomer(item, selectedCustomer) }];
      }
    });
  }, [getPriceForCustomer, selectedCustomer]);

  const handleBarcodeScan = useCallback((barcode: string) => {
    const product = mockInventory.find(p => p.Barcode === barcode);
    if (product) {
      addToCart(product);
    } else {
      alert('Product not found!');
    }
  }, [addToCart]);


  useEffect(() => {
    if (!isScannerModalOpen) {
      return;
    }

    // Initialize the scanner
    const qrCodeScanner = new Html5Qrcode("qr-reader");
    html5QrCodeRef.current = qrCodeScanner;

    const onScanSuccess = (decodedText: string, decodedResult: any) => {
        handleBarcodeScan(decodedText);
        setScannerModalOpen(false); // Close modal on successful scan
    };

    const onScanFailure = (error: any) => {
        // This callback is called frequently, so keep it minimal or for debug purposes.
        // console.warn(`Code scan error = ${error}`);
    };
    
    const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
    };

    const startScanner = async () => {
        try {
            const cameras = await Html5Qrcode.getCameras();
            if (cameras && cameras.length > 0) {
                const rearCamera = cameras.find(camera => 
                    camera.label.toLowerCase().includes('back') || 
                    camera.label.toLowerCase().includes('rear')
                );
                const cameraId = rearCamera ? rearCamera.id : cameras[0].id;
                await qrCodeScanner.start(cameraId, config, onScanSuccess, onScanFailure);
            } else {
                // Fallback for devices that don't enumerate cameras, let browser decide
                await qrCodeScanner.start({ facingMode: "environment" }, config, onScanSuccess, onScanFailure);
            }
        } catch (err) {
            console.error("Failed to start scanner:", err);
            alert("Could not initialize the camera. Please check permissions and ensure a camera is connected.");
            setScannerModalOpen(false);
        }
    };
    
    startScanner();

    // Cleanup function to stop the scanner
    return () => {
        if (html5QrCodeRef.current?.isScanning) {
             html5QrCodeRef.current.stop()
                 .then(() => console.log("Scanner stopped successfully."))
                 .catch((err: any) => console.error("Failed to stop scanner.", err));
        }
    };
  }, [isScannerModalOpen, handleBarcodeScan]);

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart(cart.filter(item => item.product.ID !== productId));
    } else {
      setCart(cart.map(item => item.product.ID === productId ? {...item, quantity} : item));
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <div className="space-y-6">
       {isScannerModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg shadow-xl relative w-full max-w-md">
                 <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Scan Barcode</h3>
                 <div id="qr-reader" style={{ width: '100%' }}></div>
                 <button onClick={() => setScannerModalOpen(false)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
                    <Icon name="close" className="w-6 h-6"/>
                 </button>
            </div>
        </div>
      )}
      <h1 className="text-3xl font-bold text-slate-800">Point of Sale</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
            <Card>
                <div className="flex justify-between items-center">
                    <select
                        className="p-2 border border-slate-300 rounded-md"
                        value={selectedCustomer.CustomerID}
                        onChange={e => setSelectedCustomer(mockCustomers.find(c => c.CustomerID === e.target.value)!)}
                    >
                        {mockCustomers.map(c => <option key={c.CustomerID} value={c.CustomerID}>{c.Name}</option>)}
                    </select>
                    <button
                        onClick={() => setScannerModalOpen(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition flex items-center gap-2"
                    >
                       <Icon name="scan" className="w-5 h-5" /> Scan Product
                    </button>
                </div>
            </Card>
            <Card>
                 <h2 className="text-xl font-semibold mb-4">Cart Items</h2>
                 <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left p-2">Product</th>
                                <th className="text-center p-2">Qty</th>
                                <th className="text-right p-2">Price</th>
                                <th className="text-right p-2">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.length > 0 ? cart.map(item => (
                                <tr key={item.product.ID} className="border-b">
                                    <td className="p-2 font-medium">{item.product.Name}</td>
                                    <td className="p-2 text-center">
                                        <input 
                                          type="number" 
                                          value={item.quantity} 
                                          onChange={(e) => updateQuantity(item.product.ID, parseInt(e.target.value))}
                                          className="w-16 p-1 text-center border rounded"
                                        />
                                    </td>
                                    <td className="p-2 text-right">${item.price.toFixed(2)}</td>
                                    <td className="p-2 text-right font-semibold">${(item.price * item.quantity).toFixed(2)}</td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={4} className="text-center p-8 text-slate-500">Cart is empty. Scan a product to begin.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                 </div>
            </Card>
        </div>
        <div className="lg:col-span-1">
            <Card className="sticky top-24">
                <h2 className="text-xl font-semibold mb-4 border-b pb-2">Order Summary</h2>
                <div className="space-y-2 text-slate-600">
                    <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                    <div className="flex justify-between"><span>Tax (8%)</span><span>${tax.toFixed(2)}</span></div>
                    <div className="flex justify-between font-bold text-xl text-slate-800 border-t pt-2 mt-2">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </div>
                <button 
                    disabled={cart.length === 0}
                    className="w-full mt-6 bg-green-600 text-white p-3 rounded-lg font-bold text-lg hover:bg-green-700 transition disabled:bg-slate-400"
                >
                    Complete Payment
                </button>
            </Card>
        </div>
      </div>
    </div>
  );
};

export default POS;