const express=require('express');

const app=express();
const port=process.config.env || 3000
app.listen(PORT,()=>{
    console.log(`server running at ${PORT}`);

})