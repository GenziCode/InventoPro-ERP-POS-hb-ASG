
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

export interface Vendor {
  VendorID: string;
  Name: string;
  ContactPerson: string;
  Email: string;
  Phone: string;
  Category: string;
}

export interface PurchaseOrderItem {
  productName: string;
  quantity: number;
  cost: number;
}

export interface PurchaseOrder {
  PO_ID: string;
  VendorName: string;
  Date: string;
  Items: PurchaseOrderItem[];
  Total: number;
  Status: 'Pending' | 'Received' | 'Cancelled';
}

export interface Payment {
  PaymentID: string;
  SaleID: string;
  Date: string;
  Amount: number;
  Method: 'Cash' | 'Card' | 'Points';
}

export interface Expense {
  ExpenseID: string;
  Date: string;
  Category: 'Rent' | 'Utilities' | 'Salaries' | 'Supplies' | 'Marketing';
  Description: string;
  Amount: number;
}