export interface ISidepanel {
  id: string;
  width: string;
  placement: 'left' | 'right';
  content: any[];
}

const create_product_sidepanel: ISidepanel = {
  id: 'create_product',
  width: '30%',
  placement: 'right',
  content: [
    {
      type: 'text',
      className: 'text-xl text-gray-900 mb-4',
      value: 'Create Product',
    },
    {
      type: 'container',
      className: 'col-span-6',
      content: [
        {
          type: 'form',
          className: 'space-y-3',
          id: 'product_create_form',
          fields: [
            {
              name: 'price',
              label: 'Price',
              type: 'number',
              required: true,
              defaultValue: 100,
              className:
                'py-2 px-2 block w-full border border-gray-200 rounded text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none',
            },
            {
              name: 'name',
              label: 'Name',
              type: 'string',
              required: true,
              className:
                'py-2 px-2 block w-full border border-gray-200 rounded text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none',
            },
            {
              name: 'description',
              label: 'Description',
              type: 'string',
              required: true,
              className:
                'py-2 px-2 block w-full border border-gray-200 rounded text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none',
            },
          ],
          actions: [
            {
              type: 'button',
              htmlType: 'submit',
              content: [{ type: 'text', value: 'Submit' }],
              className:
                'btn btn-primary btn btn-primary px-3 py-2 text-sm text-white duration-150 cursor-pointer bg-blue-700 rounded hover:bg-blue-900 active:shadow-lg',
              serverHandler: 'product_create_sidepanel_submit',
            },
            {
              type: 'button',
              content: [{ type: 'text', value: 'Cancel' }],
              className:
                'btn btn-primary px-3 py-2 text-sm text-gray-700 duration-100 cursor-pointer border rounded hover:border-indigo-600 active:shadow-lg',
              serverHandler: 'close_product_create_sidepanel',
            },
          ],
        },
      ],
    },
  ],
};

const create_invoice_sidepanel: ISidepanel = {
  id: 'create_invoice',
  width: '30%',
  placement: 'right',
  content: [
    {
      type: 'text',
      className: 'text-xl text-gray-900 mb-4',
      value: 'Create Invoice',
    },
    {
      type: 'container',
      className: 'col-span-6',
      content: [
        {
          type: 'form',
          className: 'space-y-3',
          id: 'invoice_create_form',
          fields: [
            {
              name: 'product',
              label: 'Product',
              type: 'string',
              required: true,
              className:
                'py-2 px-2 block w-full border border-gray-200 rounded text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none',
            },
            {
              name: 'client',
              label: 'Client',
              type: 'string',
              required: true,
              className:
                'py-2 px-2 block w-full border border-gray-200 rounded text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none',
            },
          ],
          actions: [
            {
              type: 'button',
              htmlType: 'submit',
              content: [{ type: 'text', value: 'Submit' }],
              className:
                'btn btn-primary btn btn-primary px-3 py-2 text-sm text-white duration-150 cursor-pointer bg-blue-700 rounded hover:bg-blue-900 active:shadow-lg',
              serverHandler: 'invoice_create_sidepanel_submit',
            },
            {
              type: 'button',
              content: [{ type: 'text', value: 'Cancel' }],
              className:
                'btn btn-primary px-3 py-2 text-sm text-gray-700 duration-100 cursor-pointer border rounded hover:border-indigo-600 active:shadow-lg',
              serverHandler: 'close_invoice_create_sidepanel',
            },
          ],
        },
      ],
    },
  ],
};
const create_client_sidepanel: ISidepanel = {
  id: 'create_client',
  width: '30%',
  placement: 'right',
  content: [
    {
      type: 'text',
      className: 'text-xl text-gray-900 mb-4',
      value: 'Create Client',
    },
    {
      type: 'container',
      className: 'col-span-6',
      content: [
        {
          type: 'form',
          className: 'space-y-3',
          id: 'client_create_form',
          fields: [
            {
              name: 'firstName',
              label: 'First Name',
              type: 'string',
              required: true,
              className:
                'py-2 px-2 block w-full border border-gray-200 rounded text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none',
            },
            {
              name: 'lastName',
              label: 'Last Name',
              type: 'string',
              required: true,
              className:
                'py-2 px-2 block w-full border border-gray-200 rounded text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none',
            },
            {
              name: 'phone',
              label: 'Phone',
              type: 'string',
              required: true,
              pattern: '^\\d{3}-\\d{3}-\\d{4}$',
              className:
                'py-2 px-2 block w-full border border-gray-200 rounded text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none',
            },
          ],
          actions: [
            {
              type: 'button',
              htmlType: 'submit',
              content: [{ type: 'text', value: 'Submit' }],
              className:
                'btn btn-primary btn btn-primary px-3 py-2 text-sm text-white duration-150 cursor-pointer bg-blue-700 rounded hover:bg-blue-900 active:shadow-lg',
              serverHandler: 'client_create_sidepanel_submit',
            },
            {
              type: 'button',
              content: [{ type: 'text', value: 'Cancel' }],
              className:
                'btn btn-primary px-3 py-2 text-sm text-gray-700 duration-100 cursor-pointer border rounded hover:border-indigo-600 active:shadow-lg',
              serverHandler: 'close_client_create_sidepanel',
            },
          ],
        },
      ],
    },
  ],
};
const sidepanels = [
  create_product_sidepanel,
  create_invoice_sidepanel,
  create_client_sidepanel,
];

export default sidepanels;
