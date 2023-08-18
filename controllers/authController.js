

import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "./../helpers/authHelper.js"
import JWT from 'jsonwebtoken';


export const registerController = async (req,res) => {
    console.log(req.body);
    try {
        const {name, email, password, phone, address, answer} = req.body;
        // validations
        if(!name){
            returnres.send({message: 'Name is Required'})
        }
        if(!email){
            returnres.send({message: 'Email is Required'})
        }
        if(!password){
            returnres.send({message: 'Password is Required'})
        }       
        if(!phone){
            returnres.send({message: 'Phone is Required'})
        }
        if(!address){
            returnres.send({message: 'Address is Required'})
        }if(!answer){
            returnres.send({message: 'Answer is Required'});
        }
        // check user
        const exisitingUser = await userModel.findOne({email})
        if(exisitingUser){
            return res.status(200).send({
                success:false,
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
            answer,
            password : hashedPassword,
        }).save();

        res.status(201).send({
            success: true,
            message: "User Register Successfully",
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
        
            _id: user._id,
            name:user.name,
            email:user.email,
            phone:user.phone,
            address:user.address,
            role:user.role,
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

// Forgot Password Controller
export const forgotPasswordController = async(req, res) => {
    try {
        const {email, answer, newPassword} = req.body
        if(!email){
            res.status(400).send({message: 'Email is required'})
        }if(!answer){
            res.status(400).send({message: 'answer is required'})

        }if(!newPassword){
            res.status(400).send({message: 'New Password is required'})

        }
        // chekced
        const user = await userModel.findOne({email, answer});

        //validation 
        if(!user){
            return res.status(404).send({
                success: false,
                message: 'Wrong email and answer'
            });
        }
        const hashed = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id, { password: hashed});
        res.status(200).send({
            success: true,
            message: 'Password reset Successfully',
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: 'Something went wrong',
            error,

        });
    }
};

// test controller
export const testController = (req, res) => {
    try {
        res.send('procted router');
    } catch (error) {
        console.log(error);
        res.send({error});
        
    }
};
