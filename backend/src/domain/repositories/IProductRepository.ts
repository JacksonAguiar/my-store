import { ProductEntity } from 'src/domain/entities/Product';

export interface IProductRepository {
    create(product: ProductEntity): Promise<void>;
    findById(id: string): Promise<ProductEntity | null>;
    findAll(p?: number): Promise<any>;
    update(product: ProductEntity): Promise<void>;
    delete(id: string): Promise<void>;
}
