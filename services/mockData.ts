
import { InventoryItem, Customer, Sale } from '../types';

export const mockInventory: InventoryItem[] = [
  { ID: 'P001', Name: 'NGK Spark Plug BKR6E-11', SKU: 'NGK-BKR6E-11', Barcode: '087295146227', Category: 'Engine Parts', PriceRetail: 15.00, PriceWholesale: 12.00, Cost: 7.50, Stock: 150, LowLevel: 20, ImageURL: 'https://picsum.photos/seed/P001/100' },
  { ID: 'P002', Name: 'Bosch Oil Filter', SKU: 'BOSCH-3330', Barcode: '028851333010', Category: 'Filters', PriceRetail: 25.50, PriceWholesale: 20.40, Cost: 12.75, Stock: 80, LowLevel: 15, ImageURL: 'https://picsum.photos/seed/P002/100' },
  { ID: 'P003', Name: 'Michelin Pilot Sport 4S Tire', SKU: 'MICH-PS4S', Barcode: '086699042223', Category: 'Tires', PriceRetail: 350.00, PriceWholesale: 300.00, Cost: 220.00, Stock: 24, LowLevel: 8, ImageURL: 'https://picsum.photos/seed/P003/100' },
  { ID: 'P004', Name: 'Castrol EDGE 5W-30 Full Synthetic', SKU: 'CAST-EDGE-5W30', Barcode: '079191000185', Category: 'Oils & Fluids', PriceRetail: 45.00, PriceWholesale: 38.00, Cost: 25.00, Stock: 200, LowLevel: 50, ImageURL: 'https://picsum.photos/seed/P004/100' },
  { ID: 'P005', Name: 'Brembo Brake Pads', SKU: 'BREM-P50068', Barcode: '8020584059045', Category: 'Brakes', PriceRetail: 120.00, PriceWholesale: 95.00, Cost: 60.00, Stock: 55, LowLevel: 10, ImageURL: 'https://picsum.photos/seed/P005/100' },
  { ID: 'P006', Name: 'Optima RedTop Battery', SKU: 'OP-8004-003', Barcode: '811405008039', Category: 'Batteries', PriceRetail: 250.00, PriceWholesale: 220.00, Cost: 180.00, Stock: 30, LowLevel: 5, ImageURL: 'https://picsum.photos/seed/P006/100' },
];

export const mockCustomers: Customer[] = [
  { CustomerID: 'C001', Name: 'John Doe', Email: 'john.d@example.com', Phone: '555-1234', MembershipLevel: 'Gold', Points: 1540 },
  { CustomerID: 'C002', Name: 'Jane Smith', Email: 'jane.s@example.com', Phone: '555-5678', MembershipLevel: 'Standard', Points: 320 },
  { CustomerID: 'C003', Name: 'Pro Mechanics', Email: 'contact@promechanics.com', Phone: '555-8765', MembershipLevel: 'Platinum', Points: 8500 },
  { CustomerID: 'C004', Name: 'Walk-in Customer', Email: '', Phone: '', MembershipLevel: 'Standard', Points: 0 },
];

export const mockSales: Sale[] = [
    { SaleID: 'S001', Date: '2023-10-26T10:00:00Z', CustomerID: 'C001', Items: [{ product: mockInventory[0], quantity: 2, price: mockInventory[0].PriceRetail * 0.9 }], Total: 27.00, PaymentMethod: 'Card', HandledBy: 'U001' },
    { SaleID: 'S002', Date: '2023-10-26T11:30:00Z', CustomerID: 'C002', Items: [{ product: mockInventory[1], quantity: 1, price: mockInventory[1].PriceRetail }], Total: 25.50, PaymentMethod: 'Cash', HandledBy: 'U001' },
    { SaleID: 'S003', Date: '2023-10-25T14:00:00Z', CustomerID: 'C003', Items: [{ product: mockInventory[4], quantity: 10, price: mockInventory[4].PriceWholesale }], Total: 950.00, PaymentMethod: 'Card', HandledBy: 'U002' },
    { SaleID: 'S004', Date: '2023-10-24T09:15:00Z', CustomerID: 'C001', Items: [{ product: mockInventory[3], quantity: 1, price: mockInventory[3].PriceRetail * 0.9 }], Total: 40.50, PaymentMethod: 'Points', HandledBy: 'U001' },
];
