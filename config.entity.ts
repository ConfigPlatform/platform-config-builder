import { ColumnOptions } from 'typeorm';

export interface IEntityField {
  name: string;
  type: 'string' | 'number';
  options: ColumnOptions;
}

export interface IEntity {
  entityName: string;
  fields: IEntityField[];
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
    ],
  },
];

export default entities;
