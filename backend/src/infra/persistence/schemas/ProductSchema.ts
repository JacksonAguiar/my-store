import mongoose, { Schema, Document } from "mongoose";
import { PaginateModel } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

export interface IProductDocument extends Document {
  name: string;
  description: string;
  image: string;
  price: number;
  stock: number;
}

const ProductSchema: Schema<IProductDocument> = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: false },
  stock: { type: Number, required: true },
});

ProductSchema.plugin(mongoosePaginate);

interface IProductModel<T extends Document> extends PaginateModel<T> {}

const Product: IProductModel<IProductDocument> =
  mongoose.model<IProductDocument>(
    "Product",
    ProductSchema
  ) as IProductModel<IProductDocument>;
export default Product;
