

import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "./../helpers/authHelper.js"
import JWT from 'jsonwebtoken';


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

// POST LOGIN 

export const loginController = async (req, res) => {
 try {
    const {email, password} = req.body;
    // validations
    if(!email || !password){
        return res.status(404).send({
            success: false,
            message: 'Invalid email or password'
        });
    }

    //Check user
    const user = await userModel.findOne({email});
    if(!user) {
        return res.status(404).send({
            success: false,
            message: 'Email is not Registerd',
        });
    }
    // check passsword
    const match = await comparePassword(password, user.password)
    if(!match) {
        return res.status(200).send({
            success: false,
            message: 'Invalid passwod',
        });
    }

    // token 
    const token = await JWT.sign({_id: user._id}, process.env.JWT_SECRET, {
        expiresIn:'7d',
    });

    res.status(200).send({
        success:true,
        message: 'login successfully',
        user: {
        
            name:user.name,
            email:user.email,
            phone:user.phone,
            address:user.address,
        },
        token,
    });
    
 } catch (error) {
    console.log(error)
    res.status(500).send({
        success: false,
        message: 'Error in login',
        error,
    });
 }
};

// test controller
export const testController = (req, res) => {
    res.send('procted router');
};
