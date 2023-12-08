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
    id: 10,
    name: 'Clients',
    path: '/client',
  },
  {
    id: 1,
    name: 'Products',
    path: '/product',
  },
  {
    id: 2,
    name: 'Create Product',
    path: '/product/create',
  },
  {
    id: 3,
    name: 'Orders',
    path: '/order',
  },
  {
    id: 4,
    name: 'Payments',
    path: '/payment',
    count: 2,
  },
];

export default menu;
