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
                  prefix: '$',
                },
              },
            ],
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
                    label: 'Submit',
                    className:
                      'btn btn-primary btn btn-primary px-3 py-2 text-sm text-white duration-150 cursor-pointer bg-blue-700 rounded hover:bg-blue-900 active:shadow-lg',
                    serverHandler: 'form_create_invoice_submit',
                  },
                  {
                    type: 'button',
                    htmlType: 'submit',
                    label: 'Create and Add New',
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
    pageTitle: 'Clients',
    content: [
      {
        type: 'button',
        label: 'Add client',
        className:
          'btn btn-primary btn btn-primary px-3 py-2 text-sm text-white duration-150 cursor-pointer bg-blue-700 rounded hover:bg-blue-900 active:shadow-lg my-4',
        serverHandler: 'open_client_create_modal',
      },
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
    pageTitle: 'Create Client',
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
            pattern:'^[a-zA-Z]+$'
          },
          {
            name: 'lastName',
            label: 'Last Name',
            type: 'string',
            required: true,
            pattern:'^[a-zA-Z]+$'
          },
          {
            name: 'phone',
            label: 'Phone',
            type: 'string',
            required: true,
            pattern: '^\d{3}-\d{3}-\d{4}$'
          },
        ],
        actions: [
          {
            type: 'button',
            htmlType: 'submit',
            className:
              'btn btn-primary btn btn-primary px-3 py-2 text-sm text-white duration-150 cursor-pointer bg-blue-700 rounded hover:bg-blue-900 active:shadow-lg',
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
                className: 'space-y-3',
                id: 'product_create_form',
                fields: [
                  {
                    name: 'price',
                    label: 'Price',
                    type: 'number',
                    required: true,
                    defaultValue: 100,
                    pattern: '^[0-9]+$'
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
                    serverHandler: 'form_create_product_submit',
                  },
                  {
                    type: 'reset',
                    label: 'Cancel',
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
    pageTitle: 'Products',
    content: [
      {
        type: 'button',
        label: 'Add product',
        className:
          'btn btn-primary btn btn-primary px-3 py-2 text-sm text-white duration-150 cursor-pointer bg-blue-700 rounded hover:bg-blue-900 active:shadow-lg my-4',
        serverHandler: 'open_product_create_sidepanel',
      },
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
                  prefix: '$',
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
          }
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
    pageTitle: 'User List',
    contentType: 'table',
  },
};

export default pages;
