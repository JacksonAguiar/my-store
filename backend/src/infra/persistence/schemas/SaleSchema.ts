import mongoose, { Schema, Document, PaginateModel } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

export interface ISaleDocument extends Document {
    status: string;
    paymentMethod: string;
    total: number;
    userId: any;
    products: [];
}

const saleItemSchema = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
});

const SaleSchema: Schema<ISaleDocument> = new Schema({
    status: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    total: { type: Number, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    products: [saleItemSchema],
});

SaleSchema.plugin(mongoosePaginate);

interface ISaleModel<T extends Document> extends PaginateModel<T> {}

const Sale: ISaleModel<ISaleDocument> = mongoose.model<ISaleDocument>('Sale', SaleSchema) as ISaleModel<ISaleDocument>;
export default Sale;
