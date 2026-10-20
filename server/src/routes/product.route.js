import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { createProductController, getAllProductsController } from "../controllers/product.controller.js";
import multer from "multer";
import { productValidator } from "../validators/product.validator.js";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fieldSize: 1 * 1024 * 1024,
    files: 5,
  },
});
const routes = Router();

routes.post(
  "/",
  authenticate,
  (req, res, next) => {
    //this middleware is for authenticating the if its user or seller
    if (req.user.role !== "seller") {
      res.status(403).json({
        message: "User are not allowed to create product",
      });
    }
    next();
  },
  //jo data aaya h usko read kr ske isliye multer use krte h
  upload.array("images"),

  (req, res, next) => {
    //this middleware is for converting req from string to json
    //price: '{"amount":439,"currency":"INR"}',
    //sizes: '[{size:"XS",stock:34},{size:"L",stock:68}]'

    req.body.price = JSON.parse(req.body.price);
    req.body.sizes = JSON.parse(req.body.sizes);

    next();
  },
  productValidator,
  createProductController,
);
routes.get("/",
  //so that it can only run for logged in user
  authenticate,getAllProductsController)

export default routes;
