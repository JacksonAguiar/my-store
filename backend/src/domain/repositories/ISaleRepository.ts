
import { PaginateResult } from 'mongoose';
import { SaleEntity } from 'src/domain/entities/Sale';
import { UserEntity } from 'src/domain/entities/User';
import { ISaleDocument } from 'src/infra/persistence/schemas/SaleSchema';

export interface ISaleRepository {
    create(product: SaleEntity): Promise<string>;
    findAll(p?:number): Promise<PaginateResult<ISaleDocument>>;
    findById(id: string): Promise<SaleEntity | null>;
    updateStatus(id: string, status: string): Promise<void>;
}
