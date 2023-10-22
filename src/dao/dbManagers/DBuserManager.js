import UserModel from "../models/users.model.js";

export class UserManager{
    async setCartID(email, cartID){
        return await UserModel.findOneAndUpdate(
            { email: email }, 
            { $set: { 'currentCartID': cartID } }, 
            { new: true }
        )
    }
    async changeRol(id){
        const user = await UserModel.findById(id);
        if(user.role == 'user'){
            user.role = 'premium'
        } else {
            user.role = 'user';
        }
        user.save()
        return user
    }
}