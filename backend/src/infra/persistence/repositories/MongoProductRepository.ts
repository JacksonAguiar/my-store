import { IProductRepository } from "src/domain/repositories/IProductRepository";
import { ProductEntity } from "src/domain/entities/Product";
import ProductModel from "src/infra/persistence/schemas/ProductSchema";

export class MongoProductRepository implements IProductRepository {
  async create(product: ProductEntity): Promise<void> {
    const productDoc = new ProductModel({
      name: product.getName(),
      price: product.getPrice(),
      description: product.getDescription(),
      stock: product.getStock(),
      image: product.getImage(),
    });
    await productDoc.save();
  }

  async findById(id: string): Promise<ProductEntity | null> {
    const productDoc = await ProductModel.findById(id);
    if (!productDoc) return null;
    return new ProductEntity(
      productDoc.id,
      productDoc.name,
      productDoc.price,
      productDoc.description,
      productDoc.stock,
      productDoc.image
    );
  }

  async findAll(): Promise<any> {
    const page = 1;
    const limit = 10;
    const options = {
      page,
      limit,
    };
    const productDocs = await ProductModel.paginate({}, options);

    const productDocsEntity = productDocs.docs.map(
      (e: any) =>
        new ProductEntity(
          e.id,
          e.name,
          e.price,
          e.description,
          e.stock,
          e.image
        )
    );

    const {
      hasPrevPage,
      hasNextPage,
      prevPage,
      nextPage,
      ...finalResult
    }: any = productDocs;

    finalResult.docs = productDocsEntity;

    return finalResult;
  }

  async update(product: ProductEntity): Promise<void> {
    await ProductModel.findByIdAndUpdate(product.getId(), {
      name: product.getName(),
      price: product.getPrice(),
      description: product.getDescription(),
      stock: product.getStock(),
      image: product.getImage(),
    });
  }

  async delete(id: string): Promise<void> {
    await ProductModel.findByIdAndDelete(id);
  }
}
