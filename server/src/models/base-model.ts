import { Model, QueryContext } from 'objection';

export class BaseModel extends Model {
    id!: number;
    createdAt!: Date;
    updatedAt!: Date;

    async $beforeInsert(queryContext: QueryContext) {
        await super.$beforeInsert(queryContext);

        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}