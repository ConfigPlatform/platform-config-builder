export interface IField {
  value: string;
  entityField: string;
  update?: string;
}

export type TRelation = 'addRelation' | 'removeRelation';
export type TActionType =
  | 'variable'
  | 'mutate'
  | 'select'
  | 'create'
  | 'return'
  | 'delete'
  | 'update'
  | TRelation
  | 'parallel'
  | 'condition';

export interface IInsertAction {
  type: 'insert';
  entityName: string;
  fields: { value: string; entityField: string }[];
  assignToVar?: string;
  awaitResult?: boolean;
}

export interface IUpdateAction {
  type: 'update';
  entityName: string;
  fields: { entityField: string; value: string }[];
  where: { [key: string]: any };
  awaitResult?: boolean;
}

export interface IDeleteAction {
  type: 'delete';
  entityName: string;
  where: { [key: string]: any };
  awaitResult?: boolean;
}

export interface IVariableAction {
  type: 'variable';
  name: string;
  value: string;
  as: string;
}

export interface IConditionAction {
  type: 'condition';
  condition: string;
  onMatch: TServerAction[];
  onNotMatch: TServerAction[];
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

export interface ICloseModal {
  clientHandler: 'close_modal';
  id: string;
}

export interface IOpenModal {
  clientHandler: 'open_modal';
  id: string;
}

export interface ICloseSidepanel {
  clientHandler: 'close_sidepanel';
  id: string;
}

export interface IOpenSidepanel {
  clientHandler: 'open_sidepanel';
  id: string;
}

export interface IRefreshData {
  clientHandler: 'refresh_data';
  select: string;
}

export type TClientAction =
  | IRedirectPageAction
  | ISetMessageAction
  | ICloseSidepanel
  | IOpenSidepanel
  | ICloseModal
  | IOpenModal
  | IRefreshData;

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
  where?: { [key: string]: any };
  orderBy?: { [key: string]: 'ASC' | 'DESC' };
  orWhere?: [string, string];
  multiple?: boolean;
  itemsPerPage?: number;
  assignToVar?: string;
  awaitResult?: boolean;
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
  awaitResult?: boolean;
}

export interface IAddRelationAction extends IRelationAction {
  type: 'addRelation';
  addId: string;
}

export interface IRemoveRelationAction extends IRelationAction {
  type: 'removeRelation';
  removeId: string;
}

export interface IParallelAction {
  type: 'parallel';
  actions: TServerAction[];
  assignToVar?: string;
  awaitResult?: boolean;
}

export type TServerAction =
  | IInsertAction
  | IReturnAction
  | ISelectAction
  | IMutateAction
  | IAddRelationAction
  | IRemoveRelationAction
  | IVariableAction
  | IUpdateAction
  | IDeleteAction
  | IParallelAction
  | IConditionAction;

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
      awaitResult: true,
    },
    {
      type: 'return',
      config: [
        {
          clientHandler: 'set_message',
          id: 'product_created',
          status: 'success',
          duration: 2000,
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
      type: 'variable',
      name: 'dataPromiseResults',
      value: 'null',
      as: 'let',
    },
    {
      type: 'variable',
      name: 'invoice',
      value: 'null',
      as: 'let',
    },
    {
      type: 'parallel',
      actions: [
        {
          type: 'select',
          entityName: 'product',
          where: { name: '$data.product' },
        },
        {
          type: 'select',
          entityName: 'client',
          where: { lastName: '$data.client' },
        },
      ],
      assignToVar: 'dataPromiseResults',
      awaitResult: true,
    },
    {
      type: 'variable',
      name: '[product, client]',
      value: '$dataPromiseResults',
      as: 'let',
    },
    {
      type: 'insert',
      entityName: 'invoice',
      fields: [{ entityField: 'client', value: '$client.id' }],
      assignToVar: 'invoice',
      awaitResult: true,
    },
    {
      type: 'parallel',
      actions: [
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
      ],
      awaitResult: true,
    },
    {
      type: 'return',
      config: [
        {
          clientHandler: 'set_message',
          id: 'invoice_created',
          status: 'success',
          duration: 2000,
          placement: 'top-right',
          content: 'Invoice has been created',
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
      awaitResult: true,
    },
    {
      type: 'return',
      config: [
        {
          clientHandler: 'set_message',
          id: 'client_created',
          status: 'success',
          duration: 2000,
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
      type: 'variable',
      name: 'invoicesGetRes',
      value: 'null',
      as: 'let',
    },
    {
      type: 'select',
      entityName: 'invoice',
      orderBy: { id: 'DESC' },
      leftJoinAndSelect: [
        ['client', 'client'],
        ['products', 'product'],
      ],
      itemsPerPage: 5,
      multiple: true,
      awaitResult: true,
      assignToVar: 'invoicesGetRes',
    },
    {
      type: 'return',
      data: {
        items: '$invoicesGetRes[0]',
        totalCount: '$invoicesGetRes[1]',
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
      type: 'variable',
      name: 'productsGetRes',
      value: 'null',
      as: 'let',
    },
    {
      type: 'select',
      entityName: 'product',
      orderBy: { id: 'DESC' },
      itemsPerPage: 5,
      multiple: true,
      awaitResult: true,
      assignToVar: 'productsGetRes',
    },
    {
      type: 'return',
      data: {
        items: '$productsGetRes[0]',
        totalCount: '$productsGetRes[1]',
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
      type: 'variable',
      name: 'clientsGetRes',
      value: 'null',
      as: 'let',
    },
    {
      type: 'select',
      entityName: 'client',
      leftJoinAndSelect: ['invoices', 'invoice'],
      orderBy: { id: 'DESC' },
      itemsPerPage: 5,
      awaitResult: true,
      assignToVar: 'clientsGetRes',
    },
    {
      type: 'return',
      data: {
        items: '$clientsGetRes[0]',
        totalCount: '$clientsGetRes[1]',
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

const form_create_invoice_cancel: IHandler = {
  name: 'form_create_invoice_cancel',
  actions: [
    {
      type: 'return',
      config: [
        {
          clientHandler: 'redirect_page',
          path: '/invoice',
        },
      ],
    },
  ],
};

const open_product_create_sidepanel: IHandler = {
  name: 'open_product_create_sidepanel',
  actions: [
    {
      type: 'return',
      config: [
        {
          clientHandler: 'open_sidepanel',
          id: 'create_product',
        },
      ],
    },
  ],
};

const close_product_create_sidepanel: IHandler = {
  name: 'close_product_create_sidepanel',
  actions: [
    {
      type: 'return',
      config: [
        {
          clientHandler: 'close_sidepanel',
          id: 'create_product',
        },
      ],
    },
  ],
};

const product_create_sidepanel_submit: IHandler = {
  name: 'product_create_sidepanel_submit',
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
      awaitResult: true,
    },
    {
      type: 'return',
      config: [
        {
          clientHandler: 'close_sidepanel',
          id: 'create_product',
        },
        {
          clientHandler: 'refresh_data',
          select: 'product_get_all',
        },
        {
          clientHandler: 'set_message',
          id: 'product_created',
          status: 'success',
          duration: 2000,
          placement: 'top-right',
          content: 'Product was created',
        },
      ],
    },
  ],
};

const open_invoice_create_sidepanel: IHandler = {
  name: 'open_invoice_create_sidepanel',
  actions: [
    {
      type: 'return',
      config: [
        {
          clientHandler: 'open_sidepanel',
          id: 'create_invoice',
        },
      ],
    },
  ],
};

const close_invoice_create_sidepanel: IHandler = {
  name: 'close_invoice_create_sidepanel',
  actions: [
    {
      type: 'return',
      config: [
        {
          clientHandler: 'close_sidepanel',
          id: 'create_invoice',
        },
      ],
    },
  ],
};

const invoice_create_sidepanel_submit: IHandler = {
  name: 'invoice_create_sidepanel_submit',
  actions: [
    {
      type: 'insert',
      entityName: 'invoice',
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
      awaitResult: true,
    },
    {
      type: 'return',
      config: [
        {
          clientHandler: 'close_sidepanel',
          id: 'create_invoice',
        },
        {
          clientHandler: 'refresh_data',
          select: 'invoice_get_all',
        },
        {
          clientHandler: 'set_message',
          id: 'invoice_created',
          status: 'success',
          duration: 2000,
          placement: 'top-right',
          content: 'Invoice has been created',
        },
      ],
    },
  ],
};

const open_client_create_modal: IHandler = {
  name: 'open_client_create_modal',
  actions: [
    {
      type: 'return',
      config: [
        {
          clientHandler: 'open_modal',
          id: 'create_client',
        },
      ],
    },
  ],
};

const close_client_create_modal: IHandler = {
  name: 'close_client_create_modal',
  actions: [
    {
      type: 'return',
      config: [
        {
          clientHandler: 'close_modal',
          id: 'create_client',
        },
      ],
    },
  ],
};

const client_create_modal_submit: IHandler = {
  name: 'client_create_modal_submit',
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
      awaitResult: true,
    },
    {
      type: 'return',
      config: [
        {
          clientHandler: 'close_modal',
          id: 'create_client',
        },
        {
          clientHandler: 'set_message',
          id: 'client_created',
          status: 'success',
          duration: 2000,
          placement: 'top-right',
          content: 'Client was created',
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
  form_create_invoice_cancel,
  product_get_all,
  client_get_all,
  invoice_get_all,
  open_product_create_sidepanel,
  close_product_create_sidepanel,
  product_create_sidepanel_submit,
  open_invoice_create_sidepanel,
  close_invoice_create_sidepanel,
  invoice_create_sidepanel_submit,
  open_client_create_modal,
  close_client_create_modal,
  client_create_modal_submit,
];

export default handlers;
