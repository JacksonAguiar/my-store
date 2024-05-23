import { ISaleRepository } from "src/domain/repositories/ISaleRepository";
import { SaleEntity } from "src/domain/entities/Sale";
import { SaleDTO } from "src/application/dto/SaleDTO";
import { IProductRepository } from "src/domain/repositories/IProductRepository";
import { ProductEntity } from "src/domain/entities/Product";

export class CreateSaleUseCase {
  private saleRepository: ISaleRepository;
  private productRepository: IProductRepository;

  constructor(
    saleRepository: ISaleRepository,
    productRepository: IProductRepository
  ) {
    this.saleRepository = saleRepository;
    this.productRepository = productRepository;
  }

  async execute(dto: SaleDTO): Promise<string> {
    const status = dto.paymentMethod != "credit_card" ? "unpaid" : "paid";

    const sale = new SaleEntity(
      status,
      dto.paymentMethod,
      dto.total,
      dto.userId,
      dto.products
    );

    dto.products.map(async (e) => {
      const product = await this.productRepository.findById(e.productId);

      if (!product) throw Error("Produto não encontrado");

      if (product?.getStock() < e.quantity) {
        throw Error("Estoque insuficiente, item: "+ product.getName());
      }

      const newStock = product.getStock() - e.quantity;

      await this.productRepository.update(
        new ProductEntity(
          product.getId(),
          product.getName(),
          product.getPrice(),
          product.getDescription(),
          newStock,
          product.getImage()
        )
      );
    });

    var saleId = await this.saleRepository.create(sale);

    return saleId;
  }
}
