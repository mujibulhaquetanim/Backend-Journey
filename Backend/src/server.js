import express from "express";
const app = express();

const port = process.env.PORT || 3000;

app.get('/', (req,res)=>{
    res.send('Server is Ready')
});

app.listen(port,()=>{
    console.log(`server at http://localhost:${port}`);
});