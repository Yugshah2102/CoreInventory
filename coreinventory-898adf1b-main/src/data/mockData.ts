export interface Product {
  id: string;
  name: string;
  sku: string;
  emoji: string;
  category: string;
  uom: string;
  pricePerUnit: number;
  priceLabel: string;
  totalStock: number;
  minStock: number;
  description: string;
  location: string;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
}

export interface Category {
  id: string;
  name: string;
  emoji: string;
  productCount: number;
}

export interface Warehouse {
  id: string;
  name: string;
  address: string;
  manager: string;
  locationCount: number;
  totalSKUs: number;
  utilization: number;
  locations: { id: string; name: string; zone: string; products: number }[];
}

export interface Receipt {
  id: string;
  receiptNumber: string;
  supplier: string;
  date: string;
  items: number;
  total: number;
  status: 'draft' | 'confirmed' | 'ready' | 'done' | 'canceled';
}

export interface Delivery {
  id: string;
  deliveryNumber: string;
  customer: string;
  date: string;
  items: number;
  total: number;
  stage: 'picking' | 'packing' | 'shipped' | 'delivered';
  status: 'draft' | 'confirmed' | 'done' | 'canceled';
}

export interface Transfer {
  id: string;
  transferNumber: string;
  from: string;
  to: string;
  date: string;
  items: number;
  status: 'draft' | 'confirmed' | 'done' | 'canceled';
}

export interface Adjustment {
  id: string;
  adjustmentNumber: string;
  location: string;
  reason: string;
  date: string;
  items: number;
  status: 'draft' | 'applied' | 'canceled';
}

export interface StockMovement {
  id: string;
  date: string;
  type: 'receipt' | 'delivery' | 'transfer_out' | 'transfer_in' | 'adjustment';
  product: string;
  sku: string;
  from: string;
  to: string;
  qty: string;
  reference: string;
  user: string;
  notes: string;
}

export const categories: Category[] = [
  { id: '1', name: 'Metals', emoji: '⚙️', productCount: 45 },
  { id: '2', name: 'Furniture', emoji: '🪑', productCount: 32 },
  { id: '3', name: 'Electronics', emoji: '💡', productCount: 28 },
  { id: '4', name: 'Raw Materials', emoji: '📦', productCount: 56 },
  { id: '5', name: 'Others', emoji: '🔷', productCount: 18 },
];

export const products: Product[] = [
  { id: '1', name: 'Steel Rods', sku: 'SR-001', emoji: '🔩', category: 'Metals', uom: 'kg', pricePerUnit: 500, priceLabel: '₹500/kg', totalStock: 248, minStock: 50, description: 'High-grade steel rods', location: 'Warehouse A - Rack 1', status: 'in_stock' },
  { id: '2', name: 'Office Chairs', sku: 'CH-101', emoji: '🪑', category: 'Furniture', uom: 'pcs', pricePerUnit: 2500, priceLabel: '₹2,500/pc', totalStock: 64, minStock: 15, description: 'Ergonomic office chairs', location: 'Warehouse B - Zone 2', status: 'in_stock' },
  { id: '3', name: 'LED Panels', sku: 'LP-305', emoji: '💡', category: 'Electronics', uom: 'pcs', pricePerUnit: 1200, priceLabel: '₹1,200/pc', totalStock: 12, minStock: 20, description: '60W LED panel lights', location: 'Warehouse A - Rack 3', status: 'low_stock' },
  { id: '4', name: 'Cardboard Boxes', sku: 'CB-010', emoji: '📦', category: 'Raw Materials', uom: 'pcs', pricePerUnit: 15, priceLabel: '₹15/pc', totalStock: 500, minStock: 100, description: 'Standard shipping boxes', location: 'Warehouse C - Floor', status: 'in_stock' },
  { id: '5', name: 'Steel Bolts', sku: 'SB-202', emoji: '⚙️', category: 'Metals', uom: 'pcs', pricePerUnit: 8, priceLabel: '₹8/pc', totalStock: 3, minStock: 50, description: 'M8 steel bolts', location: 'Warehouse A - Rack 2', status: 'out_of_stock' },
  { id: '6', name: 'Monitor Stands', sku: 'MS-401', emoji: '🖥️', category: 'Furniture', uom: 'pcs', pricePerUnit: 3800, priceLabel: '₹3,800/pc', totalStock: 28, minStock: 10, description: 'Adjustable monitor stands', location: 'Warehouse B - Zone 1', status: 'in_stock' },
  { id: '7', name: 'Copper Wire', sku: 'CW-112', emoji: '🔌', category: 'Metals', uom: 'meters', pricePerUnit: 45, priceLabel: '₹45/m', totalStock: 1200, minStock: 200, description: '2.5mm copper wire', location: 'Warehouse A - Rack 4', status: 'in_stock' },
  { id: '8', name: 'Desk Lamps', sku: 'DL-220', emoji: '💡', category: 'Electronics', uom: 'pcs', pricePerUnit: 890, priceLabel: '₹890/pc', totalStock: 45, minStock: 10, description: 'LED desk lamps', location: 'Warehouse B - Zone 3', status: 'in_stock' },
  { id: '9', name: 'Packing Tape', sku: 'PT-050', emoji: '📦', category: 'Raw Materials', uom: 'rolls', pricePerUnit: 35, priceLabel: '₹35/roll', totalStock: 8, minStock: 25, description: 'Heavy duty packing tape', location: 'Warehouse C - Shelf A', status: 'low_stock' },
  { id: '10', name: 'Aluminum Sheets', sku: 'AS-330', emoji: '🔩', category: 'Metals', uom: 'sheets', pricePerUnit: 750, priceLabel: '₹750/sheet', totalStock: 92, minStock: 20, description: '2mm aluminum sheets', location: 'Warehouse A - Rack 5', status: 'in_stock' },
];

export const warehouses: Warehouse[] = [
  { id: '1', name: 'Main Warehouse A', address: 'Plot 12, Industrial Area, Mumbai', manager: 'Rajesh Kumar', locationCount: 8, totalSKUs: 145, utilization: 78, locations: [
    { id: 'l1', name: 'Rack 1', zone: 'Zone A', products: 12 },
    { id: 'l2', name: 'Rack 2', zone: 'Zone A', products: 8 },
    { id: 'l3', name: 'Rack 3', zone: 'Zone B', products: 15 },
    { id: 'l4', name: 'Rack 4', zone: 'Zone B', products: 10 },
    { id: 'l5', name: 'Rack 5', zone: 'Zone C', products: 6 },
  ]},
  { id: '2', name: 'Distribution Center B', address: '45 Logistics Park, Pune', manager: 'Priya Sharma', locationCount: 5, totalSKUs: 89, utilization: 62, locations: [
    { id: 'l6', name: 'Zone 1', zone: 'Ground Floor', products: 20 },
    { id: 'l7', name: 'Zone 2', zone: 'Ground Floor', products: 18 },
    { id: 'l8', name: 'Zone 3', zone: 'First Floor', products: 14 },
  ]},
  { id: '3', name: 'Storage Facility C', address: '8 Warehouse Lane, Delhi', manager: 'Amit Patel', locationCount: 3, totalSKUs: 42, utilization: 45, locations: [
    { id: 'l9', name: 'Floor Storage', zone: 'Main Hall', products: 25 },
    { id: 'l10', name: 'Shelf A', zone: 'Side Wing', products: 10 },
  ]},
];

export const receipts: Receipt[] = [
  { id: '1', receiptNumber: 'REC-0001', supplier: 'Tata Steel Ltd', date: '2026-03-14', items: 3, total: 125000, status: 'done' },
  { id: '2', receiptNumber: 'REC-0002', supplier: 'Havells India', date: '2026-03-13', items: 2, total: 48000, status: 'ready' },
  { id: '3', receiptNumber: 'REC-0003', supplier: 'Gujarat Packaging', date: '2026-03-12', items: 1, total: 7500, status: 'confirmed' },
  { id: '4', receiptNumber: 'REC-0004', supplier: 'Mahindra Furniture', date: '2026-03-11', items: 4, total: 210000, status: 'draft' },
  { id: '5', receiptNumber: 'REC-0005', supplier: 'Tata Steel Ltd', date: '2026-03-10', items: 2, total: 85000, status: 'canceled' },
];

export const deliveries: Delivery[] = [
  { id: '1', deliveryNumber: 'DEL-0001', customer: 'TechCorp India', date: '2026-03-14', items: 2, total: 25000, stage: 'shipped', status: 'confirmed' },
  { id: '2', deliveryNumber: 'DEL-0002', customer: 'BuildRight Pvt', date: '2026-03-13', items: 3, total: 142000, stage: 'delivered', status: 'done' },
  { id: '3', deliveryNumber: 'DEL-0003', customer: 'Office Solutions', date: '2026-03-12', items: 1, total: 38000, stage: 'packing', status: 'confirmed' },
  { id: '4', deliveryNumber: 'DEL-0004', customer: 'Metro Enterprises', date: '2026-03-11', items: 5, total: 95000, stage: 'picking', status: 'draft' },
];

export const transfers: Transfer[] = [
  { id: '1', transferNumber: 'TRF-0001', from: 'Warehouse A', to: 'Warehouse B', date: '2026-03-14', items: 2, status: 'done' },
  { id: '2', transferNumber: 'TRF-0002', from: 'Warehouse B', to: 'Warehouse C', date: '2026-03-13', items: 1, status: 'confirmed' },
  { id: '3', transferNumber: 'TRF-0003', from: 'Warehouse A', to: 'Warehouse C', date: '2026-03-12', items: 3, status: 'draft' },
];

export const adjustments: Adjustment[] = [
  { id: '1', adjustmentNumber: 'ADJ-0001', location: 'Warehouse A - Rack 2', reason: 'Physical Count', date: '2026-03-14', items: 2, status: 'applied' },
  { id: '2', adjustmentNumber: 'ADJ-0002', location: 'Warehouse B - Zone 1', reason: 'Damage', date: '2026-03-13', items: 1, status: 'draft' },
  { id: '3', adjustmentNumber: 'ADJ-0003', location: 'Warehouse C - Floor', reason: 'Loss', date: '2026-03-12', items: 1, status: 'applied' },
];

export const stockMovements: StockMovement[] = [
  { id: '1', date: '2026-03-14 14:30', type: 'receipt', product: 'Steel Rods', sku: 'SR-001', from: 'Tata Steel', to: 'Warehouse A', qty: '+50 kg', reference: 'REC-0001', user: 'Rajesh K.', notes: 'Monthly restock' },
  { id: '2', date: '2026-03-14 12:15', type: 'delivery', product: 'Office Chairs', sku: 'CH-101', from: 'Warehouse B', to: 'TechCorp', qty: '-10 pcs', reference: 'DEL-0001', user: 'Priya S.', notes: 'Order #TC-445' },
  { id: '3', date: '2026-03-14 10:00', type: 'transfer_in', product: 'LED Panels', sku: 'LP-305', from: 'Warehouse A', to: 'Warehouse B', qty: '+20 pcs', reference: 'TRF-0001', user: 'Amit P.', notes: 'Rebalancing stock' },
  { id: '4', date: '2026-03-13 16:45', type: 'adjustment', product: 'Steel Bolts', sku: 'SB-202', from: '-', to: 'Warehouse A', qty: '-3 pcs', reference: 'ADJ-0001', user: 'Rajesh K.', notes: 'Physical count mismatch' },
  { id: '5', date: '2026-03-13 14:20', type: 'receipt', product: 'Copper Wire', sku: 'CW-112', from: 'Havells India', to: 'Warehouse A', qty: '+200 m', reference: 'REC-0002', user: 'Priya S.', notes: 'Urgent order' },
  { id: '6', date: '2026-03-13 11:00', type: 'delivery', product: 'Monitor Stands', sku: 'MS-401', from: 'Warehouse B', to: 'BuildRight', qty: '-5 pcs', reference: 'DEL-0002', user: 'Amit P.', notes: '' },
  { id: '7', date: '2026-03-12 15:30', type: 'transfer_out', product: 'Cardboard Boxes', sku: 'CB-010', from: 'Warehouse C', to: 'Warehouse A', qty: '-100 pcs', reference: 'TRF-0002', user: 'Rajesh K.', notes: 'Production need' },
  { id: '8', date: '2026-03-12 09:15', type: 'receipt', product: 'Desk Lamps', sku: 'DL-220', from: 'Havells India', to: 'Warehouse B', qty: '+30 pcs', reference: 'REC-0003', user: 'Priya S.', notes: '' },
  { id: '9', date: '2026-03-11 17:00', type: 'adjustment', product: 'Packing Tape', sku: 'PT-050', from: '-', to: 'Warehouse C', qty: '-5 rolls', reference: 'ADJ-0002', user: 'Amit P.', notes: 'Water damage' },
  { id: '10', date: '2026-03-11 13:45', type: 'delivery', product: 'Aluminum Sheets', sku: 'AS-330', from: 'Warehouse A', to: 'Metro Ent.', qty: '-15 sheets', reference: 'DEL-0003', user: 'Rajesh K.', notes: '' },
];

export const recentActivity = [
  { id: '1', type: 'receipt' as const, badge: '📥', text: 'Steel Rods +50kg received', time: '2 min ago', user: 'RK' },
  { id: '2', type: 'delivery' as const, badge: '📤', text: 'Office Chairs -10pcs shipped', time: '15 min ago', user: 'PS' },
  { id: '3', type: 'transfer_in' as const, badge: '🔄', text: 'LED Panels transferred to Warehouse B', time: '1hr ago', user: 'AP' },
  { id: '4', type: 'adjustment' as const, badge: '🔧', text: 'Steel Bolts -3pcs adjusted', time: '2hr ago', user: 'RK' },
  { id: '5', type: 'receipt' as const, badge: '📥', text: 'Copper Wire +200m received', time: '3hr ago', user: 'PS' },
  { id: '6', type: 'delivery' as const, badge: '📤', text: 'Monitor Stands -5pcs delivered', time: '5hr ago', user: 'AP' },
  { id: '7', type: 'transfer_out' as const, badge: '🔄', text: 'Cardboard Boxes moved to WH-A', time: '6hr ago', user: 'RK' },
  { id: '8', type: 'receipt' as const, badge: '📥', text: 'Desk Lamps +30pcs restocked', time: '8hr ago', user: 'PS' },
  { id: '9', type: 'adjustment' as const, badge: '🔧', text: 'Packing Tape -5rolls damaged', time: '12hr ago', user: 'AP' },
  { id: '10', type: 'delivery' as const, badge: '📤', text: 'Aluminum Sheets -15 shipped', time: '1d ago', user: 'RK' },
];

export const suppliers = [
  { id: '1', name: 'Tata Steel Ltd' },
  { id: '2', name: 'Havells India' },
  { id: '3', name: 'Gujarat Packaging' },
  { id: '4', name: 'Mahindra Furniture' },
];

export const customers = [
  { id: '1', name: 'TechCorp India' },
  { id: '2', name: 'BuildRight Pvt' },
  { id: '3', name: 'Office Solutions' },
  { id: '4', name: 'Metro Enterprises' },
];

export function getStatusColor(status: string) {
  switch (status) {
    case 'draft': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    case 'confirmed': case 'waiting': return 'bg-neon-yellow/10 text-neon-yellow border-neon-yellow/30';
    case 'ready': return 'bg-neon-cyan/10 text-neon-cyan border-neon-cyan/30';
    case 'done': case 'applied': case 'delivered': return 'bg-neon-green/10 text-neon-green border-neon-green/30';
    case 'canceled': return 'bg-neon-red/10 text-neon-red border-neon-red/30';
    default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  }
}

export function getStockDot(status: string) {
  switch (status) {
    case 'in_stock': return '🟢';
    case 'low_stock': return '🟡';
    case 'out_of_stock': return '🔴';
    default: return '⚪';
  }
}

export function getStageInfo(stage: string) {
  switch (stage) {
    case 'picking': return { emoji: '🔍', label: 'Picking', color: 'text-neon-yellow' };
    case 'packing': return { emoji: '📦', label: 'Packing', color: 'text-neon-cyan' };
    case 'shipped': return { emoji: '🚚', label: 'Shipped', color: 'text-neon-blue' };
    case 'delivered': return { emoji: '✅', label: 'Delivered', color: 'text-neon-green' };
    default: return { emoji: '⏳', label: stage, color: 'text-muted-foreground' };
  }
}

export function getMovementTypeBadge(type: string) {
  switch (type) {
    case 'receipt': return { label: '📥 Receipt', color: 'bg-neon-cyan/10 text-neon-cyan border-neon-cyan/30' };
    case 'delivery': return { label: '📤 Delivery', color: 'bg-neon-purple/10 text-neon-purple border-neon-purple/30' };
    case 'transfer_out': case 'transfer_in': return { label: '🔄 Transfer', color: 'bg-neon-blue/10 text-neon-blue border-neon-blue/30' };
    case 'adjustment': return { label: '🔧 Adjustment', color: 'bg-neon-yellow/10 text-neon-yellow border-neon-yellow/30' };
    default: return { label: type, color: 'bg-gray-500/20 text-gray-400' };
  }
}
