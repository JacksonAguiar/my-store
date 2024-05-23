import { Request, Response } from "express";
import { ProcessSalePaymentUseCase } from "src/application/use-cases/Sales/process-payment-use-case";
import { MongoSaleRepository } from "src/infra/persistence/repositories/MongoSaleRepository";
import { CreateSaleUseCase } from "src/application/use-cases/Sales/create-sale-use-case";
import { GetSalesUseCase } from "src/application/use-cases/Sales/get-sales-use-case";
import { MongoUserRepository } from "src/infra/persistence/repositories/MongoUserRepository";
import { MongoProductRepository } from "src/infra/persistence/repositories/MongoProductRepository";
import { SaleDTO } from "src/application/dto/SaleDTO";
import { GetSalePaymentSourceUseCase } from "src/application/use-cases/Sales/get-sale-payment-source-use-case";

const saleRepository = new MongoSaleRepository();
const userRepository = new MongoUserRepository();
const productRepository = new MongoProductRepository();

export class SaleController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const createSaleUseCase = new CreateSaleUseCase(saleRepository, productRepository);
      const saleDTO: SaleDTO = req.body;

      var response = await createSaleUseCase.execute(saleDTO);

      res
        .status(201)
        .json({ id: response, message: "order created successfully" });
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }

  async fetch(req: Request, res: Response): Promise<void> {
    const getAllSalesUseCase = new GetSalesUseCase(saleRepository);
    const p = req.query.p;

    var response = await getAllSalesUseCase.execute(Number(p));
    res.status(200).json(response);
  }

  async proccessPayment(req: Request, res: Response): Promise<void> {
    const ProccessPaymentUseCase = new ProcessSalePaymentUseCase(saleRepository);

    await ProccessPaymentUseCase.execute(req.params.id);

    res.status(200).send();
  }

  async getPaymentSource(req: Request, res: Response): Promise<void> {
    const GetPaymentSouzeUseCase = new GetSalePaymentSourceUseCase(saleRepository);

    var response = await GetPaymentSouzeUseCase.execute(req.params.id);

    res.status(200).json(response);
  }
}
