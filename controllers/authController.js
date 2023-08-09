

import userModel from "../models/userModel.js";
import { hashPassword } from "./../helpers/authHelper.js"

export const registerController = async (req,res) => {
    console.log(req.body);
    try {
        const {name, email, password, phone, address} = req.body;
        // validations
        if(!name){
            returnres.send({error: 'Name is Required'})
        }
        if(!email){
            returnres.send({error: 'Email is Required'})
        }
        if(!password){
            returnres.send({error: 'Password is Required'})
        }       
        if(!phone){
            returnres.send({error: 'Phone is Required'})
        }
        if(!address){
            returnres.send({error: 'Address is Required'})
        }
        // check user
        const exisitingUser = await userModel.findOne({email})
        if(exisitingUser){
            return res.status(200).send({
                success:true,
                message: 'Already Register Please Login'
            })
        }
        //register user
        const hashedPassword = await hashPassword(password);

        //save 
        const user = await new userModel({
            name, 
            email, 
            phone, 
            address, 
            password : hashedPassword,
        }).save();

        res.status(201).send({
            success: true,
            message: 'User Register Successfully',
            user,
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Registeration',
            error,
        });
        
    }
};


