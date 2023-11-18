import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { CreateProductRequestModel } from '../schemas/productsSchemas';
import products from '../products';
import { productHistoryRecords } from '../models/products';

export default class ProductController {
  public static getProducts(req: Request, res: Response) {
    const simulatedDay = parseInt(req.header('Simulated-Day') || '0', 10);
    if (productHistoryRecords[simulatedDay]) { 
      res.status(200).json(productHistoryRecords[simulatedDay]); 
    } 
    else res.sendStatus(404);
  }

  public static getProductById(req: Request, res: Response) {
    const { productId } = req.params;
    const simulatedDay = parseInt(req.header('Simulated-Day') || '0', 10);
    if (productHistoryRecords[simulatedDay]) {
      const productById = productHistoryRecords[simulatedDay]
        .find((product) => product.id === productId);
      if (productById) { res.status(200).json(productById); } else { res.sendStatus(404); }
    } else res.sendStatus(404);
  }

  public static async createProduct(req: Request, res: Response) {
    const simulatedDay = parseInt(req.header('Simulated-Day') || '0', 10);
    try {
      const {
        title, description, price, stock,
      } = req.body;
      const newProduct = new CreateProductRequestModel(req.body);
      await newProduct.validate();

      const addProduct = {
        id: uuidv4(),
        title,
        description,
        price,
        stock,
      };

      products.push(addProduct);
      productHistoryRecords[simulatedDay] = products;
      return res.status(200).json(addProduct);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}
