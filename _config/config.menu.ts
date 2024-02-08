export interface INavbarItem {
  type: string;
  id?: number;
  className: string;
  value: string;
  path: string;
  content: any[];
}

export interface INavbar {
  content: any[];
}

// menu config
const menu: INavbar = {
  content: [
    {
      type: 'link',
      path: '/client',
      content: [
        {
          type: 'text',
          value: 'Clients',
          className:
            'block text-xl text-grey-900 mb-4 py-2 px-3 hover:bg-gray-300 rounded',
        },
      ],
    },
    {
      type: 'link',
      path: '/product',
      content: [
        {
          type: 'text',
          value: 'Products',
          className:
            'block text-xl text-grey-900 mb-4 py-2 px-3 hover:bg-gray-300 rounded',
        },
      ],
    },
    {
      type: 'link',
      path: '/invoice',
      content: [
        {
          type: 'text',
          value: 'Invoices',
          className:
            'block text-xl text-grey-900 mb-4 py-2 px-3 hover:bg-gray-300 rounded',
        },
      ],
    },
    {
      type: 'link',
      path: '/client/create',
      content: [
        {
          type: 'text',
          value: 'Create Client',
          className:
            'block text-xl text-grey-900 mb-4 py-2 px-3 hover:bg-gray-300 rounded',
        },
      ],
    },
    {
      type: 'link',
      path: '/product/create',
      content: [
        {
          type: 'text',
          value: 'Create Product',
          className:
            'block text-xl text-grey-900 mb-4 py-2 px-3 hover:bg-gray-300 rounded',
        },
      ],
    },
    {
      type: 'link',
      path: '/invoice/create',
      content: [
        {
          type: 'text',
          value: 'Create Invoice',
          className:
            'block text-xl text-grey-900 mb-4 py-2 px-3 hover:bg-gray-300 rounded',
        },
      ],
    },
  ],
};

export default menu;
