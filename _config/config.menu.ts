export interface INavbar {
  className: string;
  content: any[];
}

// menu config
const menu: INavbar = {
  className: 'border-gray-200 bg-gray-50 max-w-screen flex flex-wrap flex-row p-2',
  content: [
    {
      type: 'link',
      path: '/client',
      content: [
        {
          type: 'text',
          value: 'Clients',
          className:
            'block text-lg text-grey-900 py-2 px-3 hover:bg-gray-300 rounded',
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
            'bblock text-lg text-grey-900 py-2 px-3 hover:bg-gray-300 rounded',
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
            'block text-lg text-grey-900 py-2 px-3 hover:bg-gray-300 rounded',
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
            'block text-lg text-grey-900 py-2 px-3 hover:bg-gray-300 rounded',
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
            'block text-lg text-grey-900 py-2 px-3 hover:bg-gray-300 rounded',
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
            'block text-lg text-grey-900 py-2 px-3 hover:bg-gray-300 rounded',
        },
      ],
    },
  ],
};

export default menu;
