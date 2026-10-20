import dotenv from "dotenv"
dotenv.config()

export const config = {
    MONGODB_URI : process.env.MONGODB_URI,
    ACCESS_TOKEN_SECRET : process.env.ACCESS_SECRET,
    REFRESH_TOKEN_SECRET : process.env.REFRESH_SECRET,
    IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY
}