export interface IField {
  value: string;
  entityField: string;
  update?: string;
}

export type TRelation = 'addRelation' | 'removeRelation';
export type TActionType = 'variable' | 'mutate' | 'select' | 'create' | 'return' | 'delete' | TRelation;

export interface IInsertAction {
  type: 'insert';
  entityName: string;
  fields: { value: string; entityField: string }[];
  assignVar?: string;
}

export interface IDeleteAction {
  type: 'delete'; 
  entityName: string;
  where: [string, string]; 
}

export interface IVariableAction {
  type: 'variable';
  name: string;
  value: string;
  as: string;
}

export interface IRedirectPageAction {
  clientHandler: 'redirect_page';
  path: string;
}

export type TMessageStatus = 'success' | 'info' | 'warning' | 'error';
export type TMessagePlacement =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

export interface ISetMessageAction {
  clientHandler: 'set_message';
  id: string;
  status: TMessageStatus;
  duration: number;
  placement: TMessagePlacement;
  content: string;
}

export type TClientAction = IRedirectPageAction | ISetMessageAction;

export interface IReturnAction {
  type: 'return';
  data?: any;
  config?: TClientAction[];
  multiple?: boolean;
  pagination?: { itemsPerPage: number };
}

export interface ISelectAction {
  type: 'select';
  entityName: string;
  leftJoinAndSelect?: [string, string] | [string, string][];
  where?: [string, string];
  andWhere?: [string, string];
  orWhere?: [string, string];
  multiple?: boolean;
  itemsPerPage?: number;
  assignVar: string;
}

export interface IMutateAction {
  type: 'mutate';
  field: string;
  value: string;
}

export interface IRelationAction {
  type: TRelation;
  entityName: string;
  entityId: string;
  field: string;
}

export interface IAddRelationAction extends IRelationAction {
  type: 'addRelation';
  addId: string;
}

export interface IRemoveRelationAction extends IRelationAction {
  type: 'removeRelation';
  removeId: string;
}

export type TServerAction =
  | IInsertAction
  | IReturnAction
  | ISelectAction
  | IMutateAction
  | IAddRelationAction
  | IRemoveRelationAction
  | IVariableAction
  | IDeleteAction

export interface IHandler {
  name: string;
  actions: TServerAction[];
}

const form_create_product_submit: IHandler = {
  name: 'form_create_product_submit',
  actions: [
    {
      type: 'insert',
      entityName: 'product',
      fields: [
        {
          entityField: 'name',
          value: '$data.name',
        },
        {
          entityField: 'price',
          value: '$data.price',
        },
        {
          entityField: 'description',
          value: '$data.description',
        },
      ],
    },
    {
      type: 'return',
      config: [
        {
          clientHandler: 'set_message',
          id: 'product_created',
          status: 'success',
          duration: 3000,
          placement: 'top-right',
          content: 'Product was created',
        },
        {
          clientHandler: 'redirect_page',
          path: '/product',
        },
      ],
    },
  ],
};

const form_create_invoice_submit: IHandler = {
  name: 'form_create_invoice_submit',
  actions: [
    {
      type: 'select',
      entityName: 'product',
      where: ['name', '$data.product'],
      assignVar: 'product',
    },
    {
      type: 'select',
      entityName: 'client',
      where: ['lastName', '$data.client'],
      assignVar: 'client',
    },
    {
      type: 'insert',
      entityName: 'invoice',
      fields: [{ entityField: 'client', value: '$client.id' }],
      assignVar: 'invoice',
    },
    {
      type: 'addRelation',
      entityName: 'client',
      entityId: '$client.id',
      field: 'invoices',
      addId: '$invoice.identifiers[0].id',
    },
    {
      type: 'addRelation',
      entityName: 'invoice',
      entityId: '$invoice.identifiers[0].id',
      field: 'products',
      addId: '$product.id',
    },
    {
      type: 'return',
      config: [
        {
          clientHandler: 'set_message',
          id: 'invoice_created',
          status: 'success',
          duration: 3000,
          placement: 'top-right',
          content: 'Invoice was created',
        },
        {
          clientHandler: 'redirect_page',
          path: '/invoice',
        },
      ],
    },
  ],
};

const form_create_client_submit: IHandler = {
  name: 'form_create_client_submit',
  actions: [
    {
      type: 'mutate',
      field: '$data.firstName',
      value: '$data.firstName.toUpperCase()',
    },
    {
      type: 'mutate',
      field: '$data.lastName',
      value: '$data.lastName.toUpperCase()',
    },
    {
      type: 'insert',
      entityName: 'client',
      fields: [
        {
          entityField: 'firstName',
          value: '$data.firstName',
        },
        {
          entityField: 'lastName',
          value: '$data.lastName',
        },
        {
          entityField: 'phone',
          value: '$data.phone',
        },
      ],
    },
    {
      type: 'return',
      config: [
        {
          clientHandler: 'set_message',
          id: 'client_created',
          status: 'success',
          duration: 3000,
          placement: 'top-right',
          content: 'Client was created',
        },
        {
          clientHandler: 'redirect_page',
          path: '/client',
        },
      ],
    },
  ],
};

const invoice_get_all: IHandler = {
  name: 'invoice_get_all',
  actions: [
    {
      type: 'select',
      entityName: 'invoice',
      leftJoinAndSelect: [
        ['client', 'client'],
        ['products', 'product'],
      ],
      itemsPerPage: 5,
      multiple: true,
      assignVar: 'products',
    },
    {
      type: 'return',
      data: {
        items: '$products',
        totalCount: '$productsCount',
        pagination: { itemsPerPage: 5 },
      },
      config: null,
    },
  ],
};

const product_get_all: IHandler = {
  name: 'product_get_all',
  actions: [
    {
      type: 'select',
      entityName: 'product',
      itemsPerPage: 5,
      multiple: true,
      assignVar: 'products',
    },
    {
      type: 'return',
      data: {
        items: '$products',
        totalCount: '$productsCount',
        pagination: { itemsPerPage: 5 },
      },
      config: null,
    },
  ],
};

const client_get_all: IHandler = {
  name: 'client_get_all',
  actions: [
    {
      type: 'select',
      entityName: 'client',
      leftJoinAndSelect: ['invoices', 'invoice'],
      itemsPerPage: 5,
      assignVar: 'clients',
    },
    {
      type: 'return',
      data: {
        items: '$clients',
        totalCount: '$clientsCount',
        pagination: { itemsPerPage: 5 },
      },
      config: null,
    },
  ],
};

const form_create_product_cancel: IHandler = {
  name: 'form_create_product_cancel',
  actions: [
    {
      type: 'return',
      config: [
        {
          clientHandler: 'redirect_page',
          path: '/product',
        },
      ],
    },
  ],
};

const handlers: IHandler[] = [
  form_create_product_submit,
  form_create_client_submit,
  form_create_invoice_submit,
  form_create_product_cancel,
  product_get_all,
  client_get_all,
  invoice_get_all,
];

export default handlers;
