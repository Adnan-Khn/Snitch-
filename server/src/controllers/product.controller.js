import productModel from "../models/product.model.js"
import { uploadFile } from "../services/imagekit.service.js"

export const createProductController = async(req,res)=>{
    //console.log(req.body)
    //console.log(req.files)

    const imageFileUrls = []

    for (let i = 0;i<req.files.length;i++){
        const res = await uploadFile({
            buffer:req.files[i].buffer,
            originalname:req.files[i].originalname
        })
        //console.log(res)
        imageFileUrls.push(res.url)
    }
    //console.log(imageFileUrls)
    const prod = await productModel.create({
        title: req.body.title,
        description:req.body.description,
        images:imageFileUrls,
        price:req.body.price,
        sizes:req.body.sizes,
        seller:req.user.userId

    })
    res.status(201).json({
        message:"Product created successfully",
        product:prod
    })

}

export const getAllProductsController = async(req,res)=>{
    let prods = await productModel.find();

    console.log(prods)
    res.status(200).json({
        message:"All Products listed",
        products:prods
    })
} 