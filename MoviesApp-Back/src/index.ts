import express from "express";
import videoRouter from "../src/routers/videoRouter"
import userRouter from "../src/routers/userRouter"
import imageRouter from "../src/routers/imageRouter"
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import path from "path"
import cors from 'cors'
import session from 'express-session'
import bodyParser from "body-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const parentDir = path.dirname(__dirname);  

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

//Middlewares
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors())
app.use('/uploads', express.static(path.join(parentDir, 'uploads')));
app.use(
  session({
    secret: "dev",
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 6000 * 60 },
  })
);


//Routes
app.use(videoRouter);
app.use(userRouter);
app.use(imageRouter)


app.listen(PORT, () => {
  console.log(`Server starts on ${PORT} port`);
});
