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
    name: 'Create Client',
    path: '/client/create'
  },
  {
    id: 4,
    name: 'Create Product',
    path: '/product/create',
  },
  {
    id: 5,
    name: 'Orders',
    path: '/order',
  },
  {
    id: 6,
    name: 'Payments',
    path: '/payment',
    count: 2,
  },
];

export default menu;
