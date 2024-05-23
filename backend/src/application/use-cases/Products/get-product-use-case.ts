import { IProductRepository } from "src/domain/repositories/IProductRepository";
import { ProductEntity } from "src/domain/entities/Product";

interface IPaginatedData {
  docs: ProductEntity[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
}

export class GetProductsUseCase {
  private productRepository: IProductRepository;

  constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(p?: number): Promise<IPaginatedData> {
    var res = await this.productRepository.findAll(p);
    return res;
  }
}
