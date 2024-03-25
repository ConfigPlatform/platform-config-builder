import { ColumnOptions } from 'typeorm';

export interface IEntityField {
  name: string;
  type: 'string' | 'number';
  options: ColumnOptions & {
    relationType?: string;
    ref?: string;
    ownerSide?: string;
    foreignField?: string;
  };
}

export interface IEntity {
  entityName: string;
  fields: IEntityField[];
}
