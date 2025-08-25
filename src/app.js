import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app = express()

//basic configurations
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//cors configurations
app.use(cors({
    origin : process.env.ORIGIN?.split(",") || "localhost:5173",
    credentials:true,
    methods: ["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
    allowedHeaders:["Authorization","Content-Type"]
}))

//import the routes
import healthCheckRouter from "./routes/healthCheckRoutes.js"
import authRouter from "./routes/authRoutes.js"

app.use("/api/v1/healthcheck", healthCheckRouter)
app.use("/api/v1/auth",authRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})



export default app