import { cartsModel } from "../models/carts.model.js";

export class CartManager {
    async getProducts() {
      return await cartsModel.find({}).lean();
    }

    async getCartById(id) {
      return await cartsModel.find({ _id: id });
    }
  
    async addCart() {
      const res = cartsModel.create({products: []});
      return res;
    }
  
    async addProductToCart(cart, data, qty) {
      const res = cartsModel.findByIdAndUpdate(cart._id, { $push: { products: { productId: data.id, quantity: qty } } });
      return res;
    };

    async deleteCartById(id){
      const res = cartsModel.findByIdAndDelete(id);
      return res;
    };
  }
  