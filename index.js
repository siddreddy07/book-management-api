import express from 'express'
import dotenv from 'dotenv'
import {connectDb} from './src/utils/dbConnect.js'
import bookRoutes from './src/routes/book.routes.js'
import morgan from 'morgan';

const app = express()
dotenv.config()

const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(morgan('dev'));


app.use('/api', bookRoutes);


app.listen(PORT,()=>{
    connectDb()
    console.log('Server Running on PORT : ',PORT)
})