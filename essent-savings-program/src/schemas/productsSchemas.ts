import mongoose, { Model, Schema } from 'mongoose';
import { CreateProductRequest } from '../models/products';

const CreateProductRequestSchema: Schema<CreateProductRequest> = new mongoose.Schema({
  title: {
    type: String,
    minLength: 5,
    maxLength: 50,
    required: true,
  },
  description: {
    type: String,
    minLength: 10,
    maxLength: 50,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
});

const CreateProductRequestModel: Model<CreateProductRequest> = mongoose.model('productRequest', CreateProductRequestSchema);

export { CreateProductRequestSchema, CreateProductRequestModel };
