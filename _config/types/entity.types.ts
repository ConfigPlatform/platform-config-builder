import { ColumnOptions } from 'typeorm';

export interface IEntityField {
  name: string;
  type: 'string' | 'number';
  options: ColumnOptions;
}
export type TRelation =
  | 'one-to-one'
  | 'one-to-many'
  | 'many-to-one'
  | 'many-to-many';
export interface IRelationField {
  name: string;
  type: 'relation';
  options: {
    relationType: TRelation;
    ref: string;
    foreignField?: string;
    ownerSide?: boolean;
    cascade?: true;
  };
}
export interface IEntity {
  entityName: string;
  fields: (IEntityField | IRelationField)[];
}
// entities config
const entities: IEntity[] = [
  {
    entityName: 'product',
    fields: [
      { name: 'name', type: 'string', options: { type: 'varchar' } },
      { name: 'price', type: 'number', options: { type: 'int' } },
      { name: 'description', type: 'string', options: { type: 'varchar' } },
    ],
  },
  {
    entityName: 'client',
    fields: [
      { name: 'firstName', type: 'string', options: { type: 'varchar' } },
      { name: 'lastName', type: 'string', options: { type: 'varchar' } },
      { name: 'phone', type: 'string', options: { type: 'varchar' } },
      {
        name: 'invoices',
        type: 'relation',
        options: {
          relationType: 'one-to-many',
          ref: 'invoice',
          foreignField: 'client',
        },
      },
    ],
  },
  {
    entityName: 'invoice',
    fields: [
      {
        name: 'products',
        type: 'relation',
        options: {
          relationType: 'many-to-many',
          ownerSide: true,
          ref: 'product',
        },
      },
      {
        name: 'client',
        type: 'relation',
        options: {
          relationType: 'many-to-one',
          ref: 'client',
          foreignField: 'invoices'
        },
      },
    ],
  },
];
export default entities;