import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from 'fs';

export const createProductController = async(req, res) => {
    try {
        const {name, description, price, category, quantity, shipping} = req.fields;
        const {photo} = req.files;
        // validation
        switch(true){
            case !name: 
            return res.status(500).send({error:'Name Is required'})
            case !description: 
            return res.status(500).send({error:'description Is required'})
            case !price: 
            return res.status(500).send({error:'price Is required'})
            case !category: 
            return res.status(500).send({error:'category Is required'})
            case !quantity: 
            return res.status(500).send({error:'quantity Is required'})
            case photo && photo.size > 1000000: 
            return res.status(500).send({error:'Photo Is required and should be less then 2mb'})
        }
        const products = new productModel({...req.fields, slug:slugify(name)});
        if(photo){
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type;
        }
        await products.save()
        res.status(201).send({
            success: true,
            message: 'Product Create Successfully',
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in creating product',
            error
        })
    }
};