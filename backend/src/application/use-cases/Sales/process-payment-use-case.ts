import { ISaleRepository } from "src/domain/repositories/ISaleRepository";

export class ProcessSalePaymentUseCase {
  private saleRepository: ISaleRepository;

  constructor(saleRepository: ISaleRepository) {
    this.saleRepository = saleRepository;
  }

  async execute(id: string): Promise<void> {
    await this.saleRepository.updateStatus(id, "paid");
  }
}
