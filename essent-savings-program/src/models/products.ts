import products from '../products';

interface CreateProductRequest {
  title: string;
  description: string;
  price: number;
  stock: number;
}

interface Product {
  id: string,
  title: string;
  description: string;
  price: number;
  stock: number;
}

type CreateProductResponse = Product;
type GetProductResponse = Product[];
type GetProductByIdResponse = Product;
type ProductRecords = Product[];
type ProductHistory = ProductRecords[];

const productHistoryRecords: ProductHistory = [Array.from(products)];

export {
  CreateProductRequest, Product, CreateProductResponse, GetProductResponse, GetProductByIdResponse,
  ProductHistory,productHistoryRecords
};
