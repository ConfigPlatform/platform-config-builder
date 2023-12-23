export interface IMenuItem {
  id: number;
  name: string;
  path: string;
  count?: number;
}

export interface IMenu {
  [id: number]: IMenuItem;
}

// menu config
const menu: IMenu = [
  {
    id: 1,
    name: 'Clients',
    path: '/client',
  },
  {
    id: 2,
    name: 'Products',
    path: '/product',
  },
  {
    id: 3,
    name: 'Invoices',
    path: '/invoice',
  },
  {
    id: 4,
    name: 'Create Client',
    path: '/client/create'
  },
  {
    id: 5,
    name: 'Create Product',
    path: '/product/create',
  },
  {
    id: 6,
    name: 'Create Invoice',
    path: '/invoice/create',
  },
];

export default menu;
