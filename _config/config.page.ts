export interface IPages {
  [path: string]: object;
}

// pages config
const pages: IPages = {
  // CLIENT LIST
  '/client': {
    pageTitle: 'Client List',
    contentType: 'table',
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
    contentType: 'table',
  },

  // USER LIST
  '/user': {
    pageTitle: 'User List',
    contentType: 'table',
  },
};

export default pages;
