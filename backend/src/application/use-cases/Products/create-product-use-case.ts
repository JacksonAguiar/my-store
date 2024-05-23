import { IProductRepository } from "src/domain/repositories/IProductRepository";
import { ProductEntity } from "src/domain/entities/Product";
import { ProductDTO } from "src/application/dto/ProductDTO";

export class CreateProductUseCase {
  private productRepository: IProductRepository;

  constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(dto: ProductDTO): Promise<void> {
    const product = new ProductEntity(
      dto.id,
      dto.name,
      dto.price,
      dto.description,
      dto.stock,
      dto.image
    );
    await this.productRepository.create(product);
  }
}
