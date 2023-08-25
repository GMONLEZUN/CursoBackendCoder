import passport from "passport";
import local from "passport-local";
import UserModel from "../dao/models/users.model.js";
import { createHash, isValidPassword } from "../utils.js";


const localStrategy = local.Strategy;

const initializePassport = async () =>{
    passport.use('register', new localStrategy(
        {passReqToCallback:true, usernameField: 'email'}, async (req, username, password, done) =>{
            const {first_name, last_name, email, age} = req.body;
            try{
                let user = await UserModel.findOne({email:username});

                if (user) {
                    console.log('user already exists');
                    return done(null, false)
                }

                const newUser = {first_name, last_name, email, age, password:createHash(password)};
                let result = await UserModel.create(newUser);
                return done(null, result);

            } catch (error) {
                return done('error al obtener el usuario'+error);
            }
        }
    ))
    passport.use('login', new localStrategy({ usernameField: "email"}, async(username, password, done)=>{
        try {
            const user = await UserModel.findOne({email: username})
            if (!user) {
                return done(null,false, {message:"usuario inexistente"})
            } else{
                if (!isValidPassword(user.password, password)) {
                    return done(null, false, {message:"bad Password"});
                } else{
                    console.log("Authentication successful:", user);          
                    return done(null, user)
                }
            }
        } catch (error) {
            console.error("Authentication error:", error);
            return done(error);
        }
    })
    )
    
    passport.serializeUser((user,done)=>{
        done(null, user._id);
    })
    passport.deserializeUser(async (id,done)=>{
        let user = await UserModel.findById(id);
        done(null, user);
    })
}

export default initializePassport;