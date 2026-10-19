import express from "express";
import cookieParser from "cookie-parser"
import AuthRoutes from "../routes/auth.route.js"
import ProductRoutes from "../routes/product.route.js"

const app = express();

app.use(express.json());
app.use(cookieParser())
app.use("/api/auth",AuthRoutes)
app.use("/api/products",ProductRoutes)

export default app