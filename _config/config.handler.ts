export interface IField {
  fieldName: string;
  entityFieldName: string;
  update?: string;
}

export type TActionType = 'mutation' | 'select' | 'create' | 'return';

export interface ICreateAction {
  type: 'create';
  data: { fieldName: string; entityFieldName: string }[];
}

export interface IReturnAction {
  type: 'return';
  data?: any;
  config?: any;
}

export interface ISelectAction {
  type: 'select';
  joins?: [string, string][];
  multiple?: boolean;
  assignVar: string;
}

export interface IMutationAction {
  type: 'mutation';
  dataVar: string;
  data: { fieldName: string; update: string }[];
}

export interface IHandler {
  name: string;
  entityName: string;
  actions: (ICreateAction | IReturnAction | ISelectAction | IMutationAction)[];
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
        {
          fieldName: 'client',
          entityFieldName: 'client',
        },
      ],
    },
    {
      type: 'return',
      config: [
        {
          clientHandler: 'message_set',
          data: {
            status: 'success',
            name: 'Product was created',
          },
        },
        {
          clientHandler: 'page_redirect',
          data: {
            path: '/product',
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
      type: 'mutation',
      dataVar: 'data',
      data: [
        {
          fieldName: 'firstName',
          update: '$firstName.toUpperCase()',
        },
        {
          fieldName: 'lastName',
          update: '$lastName.toUpperCase()',
        },
      ],
    },
    {
      type: 'create',
      data: [
        {
          fieldName: 'firstName',
          entityFieldName: 'firstName',
        },
        {
          fieldName: 'lastName',
          entityFieldName: 'lastName',
        },
        {
          fieldName: 'phone',
          entityFieldName: 'phone',
        },
      ],
    },
    {
      type: 'return',
      config: [
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

const product_get_all: IHandler = {
  name: 'product_get_all',
  entityName: 'product',
  actions: [
    {
      type: 'select',
      joins: [['product.client', 'client']],
      multiple: true,
      assignVar: 'products',
    },
    {
      type: 'return',
      data: '$products',
      config: null,
    },
  ],
};

const client_get_all: IHandler = {
  name: 'client_get_all',
  entityName: 'client',
  actions: [
    {
      type: 'select',
      multiple: true,
      assignVar: 'clients',
    },
    {
      type: 'return',
      data: '$clients',
      config: null,
    },
  ],
};

const handlers: IHandler[] = [
  form_create_product_submit,
  form_create_client_submit,
  product_get_all,
  client_get_all
];

export default handlers;
