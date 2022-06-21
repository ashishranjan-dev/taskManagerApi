const express = require("express");
const app = express();
const dotenv = require("dotenv")
dotenv.config()
const tasks =require('./routes/task')
const notfound=require('./middlewares/not-found')
const errorHandlerMiddleWare=require('./middlewares/error_handler')
const port = process.env.PORT || 3000;
const connectdb = require("./db/connect");
app.use(express.json());



//middlewares

app.use('/api/v1/tasks',tasks)

app.use(notfound)
app.use(errorHandlerMiddleWare)




// routes



app.get('/hello',async(req,res)=>{
  res.send('asdnasidn')
})

const start = async () => {
  try {
    await connectdb(process.env.MONGO_URI).then(() => {
      app.listen(port, () => {
        console.log(`server is listening to the port ${port}`);
      });
    });
  } catch (error) {
    console.log(error);
  }
};

start()
