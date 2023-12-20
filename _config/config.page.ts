export interface IPages {
  [path: string]: object;
}

// pages config
const pages: IPages = {
  // CLIENT LIST
  '/client': {
    pageTitle: 'Client List',
    content: [
      {
        type: 'table',
        id: 'client_table',
        className: 'min-w-full leading-normal',
        select: 'client_get_all',
        content: [
          {
            type: 'tableHead',
            content: [
              {
                type: 'tableHeading',
                className:
                  'px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider',
                name: 'ID',
              },
              {
                type: 'tableHeading',
                className:
                  'px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider',
                name: 'First Name',
              },
              {
                type: 'tableHeading',
                className:
                  'px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider',
                name: 'Last Name',
              },
              {
                type: 'tableHeading',
                className:
                  'px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider',
                name: 'Phone',
              },
            ],
          },
          {
            type: 'tableBody',
            selectRef: 'client_get_all',
            content: [
              {
                className:
                  'px-5 py-5 border-b border-gray-200 bg-white text-sm',
                dataKey: 'id',
              },
              {
                className:
                  'px-5 py-5 border-b border-gray-200 bg-white text-sm',
                dataKey: 'firstName',
              },
              {
                className:
                  'px-5 py-5 border-b border-gray-200 bg-white text-sm',
                dataKey: 'lastName',
              },
              {
                className:
                  'px-5 py-5 border-b border-gray-200 bg-white text-sm',
                dataKey: 'phone',
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
    pageTitle: 'Payment List',
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
    pageTitle: 'Client Create',
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
    pageTitle: 'Product Create',
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
          {
            type: 'column',
            className: 'col-span-6',
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

  // PRODUCT LIST
  '/product': {
    pageTitle: 'Product List',
    content: [
      {
        type: 'table',
        id: 'product_table',
        className: 'min-w-full leading-normal',
        select: 'product_get_all',
        content: [
          {
            type: 'tableHead',
            content: [
              {
                type: 'tableHeading',
                className:
                  'px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider',
                name: 'ID',
              },
              {
                type: 'tableHeading',
                className:
                  'px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider',
                name: 'Name',
              },
              {
                type: 'tableHeading',
                className:
                  'px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider',
                name: 'Price',
              },
              {
                type: 'tableHeading',
                className:
                  'px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider',
                name: 'Description',
              },
              {
                type: 'tableHeading',
                className:
                  'px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider',
                name: 'Client',
              },
            ],
          },
          {
            type: 'tableBody',
            selectRef: 'product_get_all',
            content: [
              {
                className:
                  'px-5 py-5 border-b border-gray-200 bg-white text-sm',
                dataKey: 'id',
              },
              {
                className:
                  'px-5 py-5 border-b border-gray-200 bg-white text-sm',
                dataKey: 'name',
              },
              {
                className:
                  'px-5 py-5 border-b border-gray-200 bg-white text-sm',
                dataKey: 'price',
              },
              {
                className:
                  'px-5 py-5 border-b border-gray-200 bg-white text-sm',
                dataKey: 'description',
              },
              {
                className:
                  'px-5 py-5 border-b border-gray-200 bg-white text-sm',
                dataKey: 'client.lastName',
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
