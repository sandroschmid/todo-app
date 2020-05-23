import { BaseEntity } from './base-entity';

export interface TodoItem extends BaseEntity {

  readonly name: string;
  readonly description: string;
  readonly isDone: boolean;

}
