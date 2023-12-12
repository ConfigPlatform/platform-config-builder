export interface IField {
  fieldName: string;
  entityFieldName: string;
  update?: string;
}

export interface IAction {
  type: 'create' | 'returnConfig';
  data: any;
}

export interface IHandler {
  name: string;
  entityName: string;
  actions: IAction[];
}

const form_create_product_submit: IHandler = {
  name: 'form_create_product_submit',
  entityName: 'product',
  actions: [
    {
      type: 'create',
      data: [
        {
          fieldName: 'name',
          entityFieldName: 'name',
        },
        {
          fieldName: 'price',
          entityFieldName: 'price',
        },
        {
          fieldName: 'description',
          entityFieldName: 'description',
        },
      ],
    },
    {
      type: 'returnConfig',
      data: [
        {
          clientHandler: 'message_set',
          data: {
            status: 'success',
            name: 'Client was created',
          },
        },
        {
          clientHandler: 'page_redirect',
          data: {
            path: '/client',
          },
        },
      ],
    },
  ],
};

const form_create_client_submit: IHandler = {
  name: 'form_create_client_submit',
  entityName: 'client',
  actions: [
    {
      type: 'create',
      data: [
        {
          fieldName: 'firstName',
          entityFieldName: 'firstName',
          update: '$firstName.toUpperCase()',
        },
        {
          fieldName: 'lastName',
          entityFieldName: 'lastName',
          update: '$lastName.toUpperCase()',
        },
        {
          fieldName: 'phone',
          entityFieldName: 'phone',
        },
      ],
    },
    {
      type: 'returnConfig',
      data: [
        {
          clientHandler: 'message_set',
          data: {
            status: 'success',
            name: 'Client was created',
          },
        },
        {
          clientHandler: 'page_redirect',
          data: {
            path: '/client',
          },
        },
      ],
    },
  ],
};

const handlers: IHandler[] = [
  form_create_product_submit,
  form_create_client_submit,
];

export default handlers;
