// src/presentation/controllers/ProductController.ts
import { Request, Response } from "express";
import { CreateProductUseCase } from "src/application/use-cases/Products/create-product-use-case";
import { GetProductsUseCase } from "src/application/use-cases/Products/get-product-use-case";
import { GetOneProductUseCase } from "src/application/use-cases/Products/get-one-product-use-case";
import { UpdateProductUseCase } from "src/application/use-cases/Products/update-product-use-case";
import { MongoProductRepository } from "src/infra/persistence/repositories/MongoProductRepository";
import { ProductDTO } from "src/application/dto/ProductDTO";

const productRepository = new MongoProductRepository();

export class ProductController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const createProductUseCase = new CreateProductUseCase(productRepository);
      const dto: ProductDTO = req.body;

      dto.image = req.file?.path;

      await createProductUseCase.execute(dto);
      res.status(201).json("Product created successfully");
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }

  async get(req: Request, res: Response): Promise<void> {
    try {
      const useCase = new GetProductsUseCase(productRepository);
      const p = req.query.p;
      const products = await useCase.execute(Number(p));

      if (products) {
        res.json(products);
      } else {
        res.status(404).json("Product not found");
      }
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    const getProductByIdUseCase = new GetOneProductUseCase(productRepository);
    const product = await getProductByIdUseCase.execute(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json("Product not found");
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const updateProductUseCase = new UpdateProductUseCase(productRepository);
      const dto: ProductDTO = req.body;
      dto.id = req.params.id;

      if (req.body.imageUpdated) {
        dto.image = req.file?.path;
        console.log("image updated");
      }

      await updateProductUseCase.execute(dto);
      res.json("Product updated successfully");
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }
}
