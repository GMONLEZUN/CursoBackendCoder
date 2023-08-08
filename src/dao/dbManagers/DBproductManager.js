import { productsModel } from "../models/products.model.js";

export class ProductManager {
    async getProducts() {
      return await productsModel.find({}).lean();
    }

    async getProductById(id) {
      return await productsModel.find({ _id: id });
    }
  
    async addProduct(data) {
      const res = productsModel.create(data);
      return res;
    }
  
    async updateProductById(id, data) {
      const res = productsModel.findByIdAndUpdate(id, data);
      return res;
    };

    async deleteProductById(id){
      const res = productsModel.findByIdAndDelete(id);
      return res;
    };
  }
  