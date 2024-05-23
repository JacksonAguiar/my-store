import { ISaleRepository } from "src/domain/repositories/ISaleRepository";
import { SaleEntity } from "src/domain/entities/Sale";
import SaleModel, {
  ISaleDocument,
} from "src/infra/persistence/schemas/SaleSchema";
import { PaginateResult } from "mongoose";

export class MongoSaleRepository implements ISaleRepository {
  async create(sale: SaleEntity): Promise<string> {
    const saleModel = new SaleModel({
      paymentMethod: sale.getPaymentMethod(),
      status: sale.getStatus(),
      total: sale.getTotal(),
      userId: sale.getUserId(),
      products: sale.getProducts(),
    });
    const _sale = await saleModel.save();
    return _sale.id;
  }

  async findAll(): Promise<PaginateResult<ISaleDocument>> {
    const page = 1;
    const limit = 10;
    const options = {
      page,
      limit,
      populate: [
        { path: "userId", select: "name" },
        { path: "products.productId", select: "name" },
      ],
    };
    const sales = await SaleModel.paginate({}, options);

    return sales;
  }
  
  async findById(id: string): Promise<SaleEntity | null> {
    const sale = await SaleModel.findById(id);

    if (!sale) return null;

    return new SaleEntity(
      sale.status,
      sale.paymentMethod,
      sale.total,
      sale.userId,
      sale.id
    );
  }
  async updateStatus(id: string, status: string): Promise<void> {
    await SaleModel.findOneAndUpdate({ id }, { status: status });
  }
}
