export interface IPages {
  [path: string]: object;
}

// pages config
const pages: IPages = {
  // INVOICE LIST
  '/invoice': {
    pageTitle: 'Invoices',
    content: [
      {
        type: 'table',
        id: 'invoice_table',
        className: 'min-w-full leading-normal',
        content: [
          {
            type: 'tableEntries',
            select: 'invoice_get_all',
            content: [
              {
                type: 'tableHeading',
                className:
                  'px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider',
                name: 'ID',
                cell: {
                  data: '$id',
                  className:
                    'px-5 py-5 border-b border-gray-200 bg-white text-sm',
                },
              },
              {
                type: 'tableHeading',
                className:
                  'px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider',
                name: 'Products',
                cell: {
                  data: '$products',
                  className:
                    'px-5 py-5 border-b border-gray-200 bg-white text-sm',
                  listElem: {
                    className: '',
                    data: '$name',
                  },
                  separator: ', ',
                },
              },
              {
                type: 'tableHeading',
                className:
                  'px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider',
                name: 'Client',
                cell: {
                  data: '$client.lastName',
                  className:
                    'px-5 py-5 border-b border-gray-200 bg-white text-sm',
                },
              },
              {
                type: 'tableHeading',
                className:
                  'px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider',
                name: 'Total',
                cell: {
                  data: '$products[0].price',
                  className:
                    'px-5 py-5 border-b border-gray-200 bg-white text-sm',
                },
              },
            ],
          },
        ],
      },
    ],
  },

  // INVOICE CREATE
  '/invoice/create': {
    pageTitle: 'Create Invoice',
    content: [
      {
        type: 'row',
        className: 'mt-2 grid grid-cols-12 gap-x-6 gap-y-2',
        content: [
          {
            type: 'column',
            className: 'col-span-6',
            content: [
              {
                type: 'form',
                id: 'invoice_create_form',
                fields: [
                  {
                    name: 'product',
                    label: 'Product',
                    type: 'string',
                    required: true,
                    defaultValue: '',
                  },
                  {
                    name: 'client',
                    label: 'Client',
                    type: 'string',
                    required: true,
                    defaultValue: '',
                  },
                ],
                actions: [
                  {
                    type: 'button',
                    style: 'primary',
                    label: 'Submit',
                    className: 'btn btn-primary',
                    serverHandler: 'form_create_invoice_submit',
                  },
                  {
                    type: 'button',
                    style: 'secondary',
                    label: 'Create and Add New',
                    className: 'btn btn-primary',
                    serverHandler: 'form_create_invoice_cancel',
                  },
                ],
                handlers: [{ name: 'onSubmit' }],
              },
            ],
          },
        ],
      },
    ],
  },

  // CLIENT LIST
  '/client': {
    pageTitle: 'Clients',
    content: [
      {
        type: 'table',
        id: 'client_table',
        className: 'min-w-full leading-normal',
        content: [
          {
            type: 'tableEntries',
            select: 'client_get_all',
            content: [
              {
                type: 'tableHeading',
                className:
                  'px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider',
                name: 'ID',
                cell: {
                  data: '$id',
                  className:
                    'px-5 py-5 border-b border-gray-200 bg-white text-sm',
                },
              },
              {
                type: 'tableHeading',
                className:
                  'px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider',
                name: 'First Name',
                cell: {
                  data: '$firstName',
                  className:
                    'px-5 py-5 border-b border-gray-200 bg-white text-sm',
                },
              },
              {
                type: 'tableHeading',
                className:
                  'px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider',
                name: 'Last Name',
                cell: {
                  data: '$lastName',
                  className:
                    'px-5 py-5 border-b border-gray-200 bg-white text-sm',
                },
              },
              {
                type: 'tableHeading',
                className:
                  'px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider',
                name: 'Phone',
                cell: {
                  data: '$phone',
                  className:
                    'px-5 py-5 border-b border-gray-200 bg-white text-sm',
                },
              },
              {
                type: 'tableHeading',
                className:
                  'px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider',
                name: 'Invoices',
                cell: {
                  data: '$invoices',
                  className:
                    'px-5 py-5 border-b border-gray-200 bg-white text-sm',
                  listElem: {
                    className: '',
                    data: '$id',
                  },
                  prefix: '#',
                  separator: ', ',
                },
              },
            ],
          },
        ],
      },
    ],
  },

  // PAYMENT LIST
  '/payment': {
    id: 2,
    pageTitle: 'Payments',
    content: [
      {
        type: 'row',
        className: 'mt-2 grid grid-cols-12 gap-x-6 gap-y-2',
        // 3 columns
        content: [
          {
            type: 'column',
            className: 'col-span-4',
            content: [
              {
                type: 'text',
                value: 'Hello world',
              },
            ],
          },
          {
            type: 'column',
            className: 'col-span-4',
            content: [
              {
                type: 'text',
                value: 'Hello world',
              },
              {
                type: 'form',
                id: 'product_create_form',
                fields: [
                  {
                    name: 'name',
                    label: 'Name',
                    type: 'string',
                    required: true,
                    defaultValue: 'Item',
                    validation: 'min:3|max:10',
                  },
                ],
                actions: [
                  {
                    type: 'button',
                    style: 'primary',
                    label: 'Pay',
                    className: 'btn btn-primary',
                    serverHandler: 'form_create_product_submit',
                  },
                ],
              },
            ],
          },
          {
            type: 'column',
            className: 'col-span-4',
            content: [
              {
                type: 'text',
                value: 'Hello world',
              },
            ],
          },
        ],
      },
    ],
  },

  // CLIENT CREATE
  '/client/create': {
    pageTitle: 'Create Client',
    content: [
      {
        type: 'form',
        id: 'client_create_form',
        fields: [
          {
            name: 'firstName',
            label: 'First Name',
            type: 'string',
            required: true,
            defaultValue: '',
          },
          {
            name: 'lastName',
            label: 'Last Name',
            type: 'string',
            required: true,
            defaultValue: '',
          },
          {
            name: 'phone',
            label: 'Phone',
            type: 'string',
            required: true,
            defaultValue: '',
          },
        ],
        actions: [
          {
            type: 'button',
            style: 'primary',
            label: 'Create',
            serverHandler: 'form_create_client_submit',
          },
        ],
      },
    ],
  },

  // PRODUCT CREATE
  '/product/create': {
    pageTitle: 'Create Product',
    content: [
      {
        type: 'row',
        className: 'mt-2 grid grid-cols-12 gap-x-6 gap-y-2',
        content: [
          {
            type: 'column',
            className: 'col-span-6',
            content: [
              {
                type: 'form',
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
                    validation: 'min:3|max:10',
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
                    style: 'primary',
                    label: 'Submit',
                    className: 'btn btn-primary',
                    serverHandler: 'form_create_product_submit',
                  },
                  {
                    type: 'button',
                    style: 'secondary',
                    label: 'Create and Add New',
                    className: 'btn btn-primary',
                    serverHandler: 'form_create_product_cancel',
                  },
                ],
                handlers: [{ name: 'onSubmit' }],
              },
            ],
          },
        ],
      },
    ],
  },

  // PRODUCT LIST
  '/product': {
    pageTitle: 'Products',
    content: [
      {
        type: 'table',
        id: 'product_table',
        className: 'min-w-full leading-normal',
        content: [
          {
            type: 'tableEntries',
            select: 'product_get_all',
            content: [
              {
                type: 'tableHeading',
                className:
                  'px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider',
                name: 'ID',
                cell: {
                  data: '$id',
                  className:
                    'px-5 py-5 border-b border-gray-200 bg-white text-sm',
                },
              },
              {
                type: 'tableHeading',
                className:
                  'px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider',
                name: 'Name',
                cell: {
                  data: '$name',
                  className:
                    'px-5 py-5 border-b border-gray-200 bg-white text-sm',
                },
              },
              {
                type: 'tableHeading',
                className:
                  'px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider',
                name: 'Price',
                cell: {
                  data: '$price',
                  className:
                    'px-5 py-5 border-b border-gray-200 bg-white text-sm',
                },
              },
              {
                type: 'tableHeading',
                className:
                  'px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider',
                name: 'Description',
                cell: {
                  data: '$description',
                  className:
                    'px-5 py-5 border-b border-gray-200 bg-white text-sm',
                },
              },
            ],
          },
        ],
      },
    ],
  },

  // USER LIST
  '/user': {
    pageTitle: 'User List',
    contentType: 'table',
  },
};

export default pages;
