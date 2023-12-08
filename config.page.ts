export interface IPages {
  [path: string]: object;
}

// pages config
const pages: IPages = {
  // CLIENT LIST
  '/client': {
    id: 1,
    pageTitle: 'Client List',
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
                    defaultValue: 'John',
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

  // PRODUCT CREATE
  '/product/create': {
    id: 1,
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
                    defaultValue: 'John',
                    validation: 'min:3|max:10',
                  },
                  {
                    name: 'description',
                    label: 'Description',
                    type: 'string',
                    required: true,
                  },
                  {
                    name: 'category',
                    label: 'Category',
                    type: 'select',
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
    id: 2,
    pageTitle: 'Product List',
    contentType: 'table',
  },

  // USER LIST
  '/user': {
    id: 3,
    pageTitle: 'User List',
    contentType: 'table',
  },
};

export default pages;
