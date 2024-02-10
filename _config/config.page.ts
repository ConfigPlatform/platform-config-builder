export interface IPages {
  [path: string]: any;
}

// pages config
const pages: IPages = {
  // INVOICE LIST
  '/invoice': {
    content: [
      {
        type: 'text',
        value: 'Invoices',
        className: 'text-3xl text-gray-900 font-medium',
      },
      {
        type: 'button',
        content: [{ type: 'text', value: 'Add Invoice' }],
        className:
          'btn btn-primary btn btn-primary px-3 py-2 text-sm text-white duration-150 cursor-pointer bg-blue-700 rounded hover:bg-blue-900 active:shadow-lg my-4',
        serverHandler: 'open_invoice_create_sidepanel',
      },
      {
        type: 'table',
        id: 'invoice_table',
        className: 'min-w-full leading-normal',
        select: 'invoice_get_all',
        columns: [
          {
            type: 'column',
            className:
              'px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider',
            name: 'ID',
            sortBy: 'id',
            cell: {
              className: 'px-5 py-5 border-b border-gray-200 bg-white text-sm',
              content: [
                {
                  type: 'text',
                  value: '$id',
                  vars: { id: '$id' },
                },
              ],
            },
          },
          {
            type: 'column',
            className:
              'px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider',
            name: 'Client',
            cell: {
              className: 'px-5 py-5 border-b border-gray-200 bg-white text-sm',
              content: [
                {
                  type: 'text',
                  value: '$name',
                  vars: { 'client.lastName': '$name' },
                },
              ],
            },
          },
          {
            type: 'column',
            className:
              'px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider',
            name: 'Products',
            cell: {
              className: 'px-5 py-5 border-b border-gray-200 bg-white text-sm',
              content: [
                {
                  type: 'list',
                  data: 'products',
                  separator: ', ',
                  content: [
                    {
                      type: 'text',
                      value: '$name',
                      vars: { name: '$name' },
                    },
                  ],
                },
              ],
            },
          },
        ],
      },
      {
        type: 'pagination',
        select: 'invoice_get_all',
        className:
          'md:w-2/5 w-full flex items-center justify-center py-5 lg:px-0 sm:px-6 px-4',
        previousButton: {
          className:
            'flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white',
        },
        nextButton: {
          className:
            'flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white',
        },
        pagesWrapper: { className: 'flex items-center' },
        page: {
          className:
            'flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white',
        },
        pageActive: {
          className:
            'flex items-center justify-center px-3 h-8 text-blue-600 border border-e-0 border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white',
        },
      },
    ],
  },

  // INVOICE CREATE
  '/invoice/create': {
    content: [
      {
        type: 'text',
        value: 'Create Invoice',
        className: 'text-3xl text-gray-900 font-medium',
      },
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
                className: 'space-y-3',
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
                    content: [{ type: 'text', value: 'Submit' }],
                    className:
                      'btn btn-primary btn btn-primary px-3 py-2 text-sm text-white duration-150 cursor-pointer bg-blue-700 rounded hover:bg-blue-900 active:shadow-lg',
                    serverHandler: 'form_create_invoice_submit',
                  },
                  {
                    type: 'reset',
                    content: [{ type: 'text', value: 'Cancel' }],
                    className:
                      'btn btn-primary px-3 py-2 text-sm text-gray-700 duration-100 cursor-pointer border rounded hover:border-indigo-600 active:shadow-lg',
                    serverHandler: 'form_create_invoice_cancel',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  // CLIENT LIST
  '/client': {
    content: [
      {
        type: 'text',
        value: 'Clients',
        className: 'text-3xl text-gray-900 font-medium',
      },
      {
        type: 'filter',
        placeholder: 'Search by First Name...',
        filterBy: 'firstName',
        select: 'client_get_all',
      },
      {
        type: 'button',
        content: [{ type: 'text', value: 'Add Client' }],
        className:
          'btn btn-primary btn btn-primary px-3 py-2 text-sm text-white duration-150 cursor-pointer bg-blue-700 rounded hover:bg-blue-900 active:shadow-lg my-4',
        serverHandler: 'open_client_create_sidepanel',
      },
      {
        type: 'table',
        id: 'client_table',
        className: 'min-w-full leading-normal',
        select: 'client_get_all',
        columns: [
          {
            type: 'column',
            className:
              'px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider',
            name: 'ID',
            sortable: true,
            cell: {
              className: 'px-5 py-5 border-b border-gray-200 bg-white text-sm',
              content: [
                {
                  type: 'text',
                  value: '$id',
                  vars: { id: '$id' },
                },
              ],
            },
          },
          {
            type: 'column',
            className:
              'px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider',
            name: 'First Name',
            sortable: true,
            cell: {
              className: 'px-5 py-5 border-b border-gray-200 bg-white text-sm',
              content: [
                {
                  type: 'text',
                  value: '$firstName',
                  vars: { firstName: '$firstName' },
                },
              ],
            },
          },
          {
            type: 'column',
            className:
              'px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider',
            name: 'Last Name',
            sortable: true,
            cell: {
              className: 'px-5 py-5 border-b border-gray-200 bg-white text-sm',
              content: [
                {
                  type: 'text',
                  value: '$lastName',
                  vars: { lastName: '$lastName' },
                },
              ],
            },
          },
          {
            type: 'column',
            className:
              'px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider',
            name: 'Phone',
            cell: {
              className: 'px-5 py-5 border-b border-gray-200 bg-white text-sm',
              content: [
                {
                  type: 'text',
                  value: '$phone',
                  vars: { phone: '$phone' },
                },
              ],
            },
          },
          {
            type: 'column',
            className:
              'px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider',
            name: 'Invoices',
            cell: {
              className: 'px-5 py-5 border-b border-gray-200 bg-white text-sm',
              content: [
                {
                  type: 'list',
                  data: 'invoices',
                  separator: ', ',
                  content: [
                    {
                      type: 'text',
                      value: '$id',
                      vars: { id: '$id' },
                    },
                  ],
                },
              ],
            },
          },
          {
            type: 'column',
            className:
              'px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider',
            name: 'Controls',
            cell: {
              className: 'px-5 py-5 border-b border-gray-200 bg-white text-sm',
              content: [
                {
                  type: 'dropdown',
                  width: '80px',
                  button: {
                    content: [
                      {
                        type: 'svg',
                        element: `<svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
<path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
</svg>`,
                      },
                    ],
                  },
                  action: 'click',
                  options: [
                    {
                      type: 'button',
                      className:
                        'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mb-1 w-full',
                      content: [
                        {
                          type: 'text',
                          value: 'Edit',
                        },
                      ],
                    },
                    {
                      type: 'button',
                      className:
                        'focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 w-full',
                      data: { id: '$id' },
                      serverHandler: 'client_delete_one',
                      content: [
                        {
                          type: 'text',
                          value: 'Delete',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          },
        ],
      },
      {
        type: 'pagination',
        select: 'client_get_all',
        className:
          'md:w-2/5 w-full flex items-center justify-center py-5 lg:px-0 sm:px-6 px-4',
        previousButton: {
          className:
            'flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white',
        },
        nextButton: {
          className:
            'flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white',
        },
        pagesWrapper: { className: 'flex items-center' },
        page: {
          className:
            'flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white',
        },
        pageActive: {
          className:
            'flex items-center justify-center px-3 h-8 text-blue-600 border border-e-0 border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white',
        },
      },
    ],
  },

  // CLIENT CREATE
  '/client/create': {
    content: [
      {
        type: 'text',
        value: 'Create Client',
        className: 'text-3xl text-gray-900 font-medium',
      },
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
            pattern: '^[a-zA-Z]+$',
          },
          {
            name: 'lastName',
            label: 'Last Name',
            type: 'string',
            required: true,
            pattern: '^[a-zA-Z]+$',
          },
          {
            name: 'phone',
            label: 'Phone',
            type: 'string',
            required: true,
            pattern: '^\\d{3}-\\d{3}-\\d{4}$',
          },
        ],
        actions: [
          {
            type: 'button',
            htmlType: 'submit',
            className:
              'btn btn-primary btn btn-primary px-3 py-2 text-sm text-white duration-150 cursor-pointer bg-blue-700 rounded hover:bg-blue-900 active:shadow-lg',
            content: [{ type: 'text', value: 'Create' }],
            serverHandler: 'form_create_client_submit',
          },
        ],
      },
    ],
  },

  // PRODUCT CREATE
  '/product/create': {
    content: [
      {
        type: 'text',
        value: 'Create Product',
        className: 'text-3xl text-gray-900 font-medium',
      },
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
                className: 'space-y-3',
                id: 'product_create_form',
                fields: [
                  {
                    name: 'price',
                    label: 'Price',
                    type: 'number',
                    required: true,
                    defaultValue: 100,
                    pattern: '^[0-9]+$',
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
                    content: [{ type: 'text', value: 'Submit' }],
                    className:
                      'btn btn-primary btn btn-primary px-3 py-2 text-sm text-white duration-150 cursor-pointer bg-blue-700 rounded hover:bg-blue-900 active:shadow-lg',
                    serverHandler: 'form_create_product_submit',
                  },
                  {
                    type: 'reset',
                    content: [{ type: 'text', value: 'Cancel' }],
                    className:
                      'btn btn-primary px-3 py-2 text-sm text-gray-700 duration-100 cursor-pointer border rounded hover:border-indigo-600 active:shadow-lg',
                    serverHandler: 'form_create_product_cancel',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  // PRODUCT LIST
  '/product': {
    content: [
      {
        type: 'text',
        value: 'Products',
        className: 'text-3xl text-gray-900 font-medium',
      },
      {
        type: 'button',
        content: [{ type: 'text', value: 'Add Product' }],
        className:
          'btn btn-primary btn btn-primary px-3 py-2 text-sm text-white duration-150 cursor-pointer bg-blue-700 rounded hover:bg-blue-900 active:shadow-lg my-4',
        serverHandler: 'open_product_create_sidepanel',
      },
      {
        type: 'table',
        id: 'product_table',
        className: 'min-w-full leading-normal',
        select: 'product_get_all',
        columns: [
          {
            type: 'column',
            className:
              'px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider',
            name: 'ID',
            sortable: true,
            cell: {
              className: 'px-5 py-5 border-b border-gray-200 bg-white text-sm',
              content: [
                {
                  type: 'text',
                  value: '$id',
                  vars: { id: '$id' },
                },
              ],
            },
          },
          {
            type: 'column',
            className:
              'px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider',
            name: 'Name',
            sortable: true,
            cell: {
              className: 'px-5 py-5 border-b border-gray-200 bg-white text-sm',
              content: [
                {
                  type: 'text',
                  value: '$name',
                  vars: { name: '$name' },
                },
              ],
            },
          },
          {
            type: 'column',
            className:
              'px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider',
            name: 'Price',
            sortable: true,
            cell: {
              className: 'px-5 py-5 border-b border-gray-200 bg-white text-sm',
              content: [
                {
                  type: 'text',
                  value: '$$price',
                  vars: { price: '$price' },
                },
              ],
            },
          },
          {
            type: 'column',
            className:
              'px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider',
            name: 'Description',
            cell: {
              className: 'px-5 py-5 border-b border-gray-200 bg-white text-sm',
              content: [
                {
                  type: 'text',
                  value: '$description',
                  vars: { description: '$description' },
                },
              ],
            },
          },
        ],
      },
      {
        type: 'pagination',
        select: 'product_get_all',
        className:
          'md:w-2/5 w-full flex items-center justify-center py-5 lg:px-0 sm:px-6 px-4',
        previousButton: {
          className:
            'flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white',
        },
        nextButton: {
          className:
            'flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white',
        },
        pagesWrapper: { className: 'flex items-center' },
        page: {
          className:
            'flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white',
        },
        pageActive: {
          className:
            'flex items-center justify-center px-3 h-8 text-blue-600 border border-e-0 border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white',
        },
      },
    ],
  },

  // USER LIST
  '/user': {
    content: [
      {
        type: 'text',
        value: 'User List',
        className: 'text-3xl text-gray-900 font-medium',
      },
      {
        type: 'table',
      },
    ],
  },
};

export default pages;
