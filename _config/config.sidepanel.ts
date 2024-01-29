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
      type: 'column',
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
            },
            {
              name: 'name',
              label: 'Name',
              type: 'string',
              required: true,
            },
            {
              name: 'description',
              label: 'Description',
              type: 'string',
              required: true,
            },
          ],
          actions: [
            {
              type: 'button',
              htmlType: 'submit',
              label: 'Submit',
              className:
                'btn btn-primary btn btn-primary px-3 py-2 text-sm text-white duration-150 cursor-pointer bg-blue-700 rounded hover:bg-blue-900 active:shadow-lg',
              serverHandler: 'product_create_sidepanel_submit',
            },
            {
              type: 'button',
              label: 'Cancel',
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
      type: 'column',
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
            },
            {
              name: 'client',
              label: 'Client',
              type: 'string',
              required: true,
            },
          ],
          actions: [
            {
              type: 'button',
              htmlType: 'submit',
              label: 'Submit',
              className:
                'btn btn-primary btn btn-primary px-3 py-2 text-sm text-white duration-150 cursor-pointer bg-blue-700 rounded hover:bg-blue-900 active:shadow-lg',
              serverHandler: 'invoice_create_sidepanel_submit',
            },
            {
              type: 'button',
              label: 'Cancel',
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
      type: 'column',
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
            },
            {
              name: 'lastName',
              label: 'Last Name',
              type: 'string',
              required: true,
            },
            {
              name: 'phone',
              label: 'Phone',
              type: 'number',
              required: true,
            },
          ],
          actions: [
            {
              type: 'button',
              htmlType: 'submit',
              label: 'Submit',
              className:
                'btn btn-primary btn btn-primary px-3 py-2 text-sm text-white duration-150 cursor-pointer bg-blue-700 rounded hover:bg-blue-900 active:shadow-lg',
              serverHandler: 'client_create_sidepanel_submit',
            },
            {
              type: 'button',
              htmlType: 'cancel',
              label: 'Cancel',
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
