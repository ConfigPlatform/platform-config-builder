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
