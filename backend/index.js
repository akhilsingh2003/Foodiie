const express= require("express");
const app=express();
const port=5000
const DbConnection=require('./db');
DbConnection();


app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-requested-With,Content-Type,Accept"
    );
    next();
})

app.use(express.json());
app.use('/api',require("./routes/CreateUser"));
app.use('/api',require("./routes/DisplayData"));
app.use('/api',require("./routes/OrderData"));
app.use('/api',require("./routes/Mail"));



app.get("/",(req,res)=>{
    res.send("hello world")
})

app.listen(port,()=>{
console.log(`Server running on ${port}`);
});