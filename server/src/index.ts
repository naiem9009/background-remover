import dotenv from "dotenv"
dotenv.config()
import express, { Request, Response } from 'express';
import cors from "cors"
import dbConnect from "./config/db";
import userRoute from "./routes/userRoute"
import imageRoute from "./routes/imageRoute"

const app = express();
const port = process.env.PORT || 4400;



// middleware use
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended : false}))


// routes
app.use("/api/user", userRoute)
app.use("/api/image", imageRoute)

app.get('/', (req: Request, res: Response) => {
  res.send('API working');
});

app.listen(port, async () => {
  await dbConnect();
  console.log(`Server is running on http://localhost:${port}`);
});
