
export type ModuleType = 'Dashboard' | 'Inventory' | 'POS' | 'Customers' | 'Vendors' | 'Purchase Orders' | 'Payments' | 'Expenses' | 'Cargo' | 'Reports' | 'Memberships' | 'Discounts & Deals' | 'Ecommerce Sync' | 'Admin Panel';

export interface InventoryItem {
  ID: string;
  Name: string;
  SKU: string;
  Barcode: string;
  Category: string;
  PriceRetail: number;
  PriceWholesale: number;
  Cost: number;
  Stock: number;
  LowLevel: number;
  ImageURL: string;
}

export interface Customer {
  CustomerID: string;
  Name: string;
  Email: string;
  Phone: string;
  MembershipLevel: 'Standard' | 'Gold' | 'Platinum';
  Points: number;
}

export interface SaleItem {
  product: InventoryItem;
  quantity: number;
  price: number;
}

export interface Sale {
  SaleID: string;
  Date: string;
  CustomerID: string;
  Items: SaleItem[];
  Total: number;
  PaymentMethod: 'Cash' | 'Card' | 'Points';
  HandledBy: string;
}
