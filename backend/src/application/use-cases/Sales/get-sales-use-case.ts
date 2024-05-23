import { ISaleRepository } from "src/domain/repositories/ISaleRepository";

interface SaleResponse {
  id: string | undefined;
  paymentMethod: string;
  status: string;
  total: number;
  customer: string | null;
  products: string[];
}

interface IPaginatedData {
  docs: SaleResponse[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
}

export class GetSalesUseCase {
  private saleRepository: ISaleRepository;

  constructor(saleRepository: ISaleRepository) {
    this.saleRepository = saleRepository;
  }

  async execute(p?: number): Promise<IPaginatedData> {
    const sales = await this.saleRepository.findAll(p);
    const transformedResult = {
      ...sales,
      docs: sales.docs.map((sale) => ({
        id: sale._id,
        status: sale.status,
        paymentMethod: sale.paymentMethod,
        total: sale.total,
        customer: sale.userId.name,
        products: sale.products.map(
          (product: any) => product.quantity + " " + product.productId.name
        ),
      })),
    };

    const { hasPrevPage, hasNextPage, prevPage, nextPage, ...finalResult } =
      transformedResult;

    return finalResult as IPaginatedData;
  }
}
