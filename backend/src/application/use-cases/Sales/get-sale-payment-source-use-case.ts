import { ISaleRepository } from "src/domain/repositories/ISaleRepository";

export class GetSalePaymentSourceUseCase {
  private saleRepository: ISaleRepository;

  constructor(saleRepository: ISaleRepository) {
    this.saleRepository = saleRepository;
  }

  async execute(
    id: string
  ): Promise<{ type: string; url: string | null; status: string }> {
    var sale = await this.saleRepository.findById(id);

    if (!sale) throw Error("not found");

    const type = sale.getPaymentMethod();
    const status = sale.getStatus();

    const url =
      type == "credit_card" || status == "paid"
        ? null
        : type == "bill"
        ? "http://localhost:4000/downloads/boleto.pdf"
        : "00020101021226740014br.gov.bcb.pix2552example.com/pix/8baaa2f3-9c41-40d1-a91a-bc93113bd4415204000053039865406123.455802BR5913Fulano de Tal6008BRASILIA62190515RP12345678-20196304FA24";

    return { type, url, status };
  }
}
