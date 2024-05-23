import { IProductRepository } from "src/domain/repositories/IProductRepository";
import { ProductEntity } from "src/domain/entities/Product";
import { ProductDTO } from "src/application/dto/ProductDTO";

export class GetOneProductUseCase {
  private productRepository: IProductRepository;

  constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(id: string): Promise<ProductEntity | null> {
    var res = await this.productRepository.findById(id);

    if (!res) return null;

    return new ProductEntity(
      res.getId(),
      res.getName(),
      res.getPrice(),
      res.getDescription(),
      res.getStock(),
      res.getImage()
    );
  }
}
