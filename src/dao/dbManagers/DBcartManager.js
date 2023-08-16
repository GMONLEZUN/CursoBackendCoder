import { cartsModel } from "../models/carts.model.js";

export class CartManager {

    async getCartById(id) {
      return await cartsModel.find({ _id: id }).lean();
    }
  
    async addCart() {
      const res = cartsModel.create({products: []});
      return res;
    }
  
    async addProductToCart(cart, data) {
      let qty = 1;
      const cartTemp = await this.getCartById(cart);

      if (cartTemp[0].products.length > 0) {
        for (const product of cartTemp[0].products) {
          if (product.productId == data.id) {
            product.quantity += 1;
            const res = await cartsModel.findByIdAndUpdate(
              cart._id,
              { $set: { [`products.${cartTemp[0].products.indexOf(product)}.quantity`]: product.quantity } },
              { new: true }
            );
            return res;
          }
        }
      }
      
      const res = await cartsModel.findByIdAndUpdate(
        cart._id,
        { $push: { products: { productId: data.id, quantity: qty } } },
        { new: true }
      );
      return res;
    };

    async deleteCartById(id){
      const res = cartsModel.findByIdAndDelete(id);
      return res;
    };
  }
  