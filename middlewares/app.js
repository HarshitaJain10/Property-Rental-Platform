const express=require("express");
const app=express();
const expresserror=require("./expresserror");

// app.use((req,res,next)=>{
//     console.log("i am middleware");
//     res.send("finished");
//     next();
// });

// app.get("/",(req,res)=>{
//     res.send("i am root");
// });

//logger fun or utility middleware-morgan
// app.use((req,res,next)=>{
//     req.time=new Date(Date.now()).toString();
//     console.log(req,req.hostname,req.pathname,req.time);
//     next();
// })
// app.use("/api",(req,res)=>{
//     let{token}=req.query;
//     if(token==="giveaccess"){
//         next();
//     }
//     res.send("denied");
// });
// app.get("/api",(req,res)=>{
//     res.send("data");
// });
//multiple middle+ default express error handler
const check=("/api",(req,res)=>{
    let{token}=req.query;
    if(token==="giveaccess"){
        next();
    }
    throw new expresserror(401,"denied");
});
app.get("/api",check,(req,res)=>{
    res.send("data");
});
app.get("/err",(req,res)=>{
    abcd=abcd;
})

app.get("/admin",(req,res)=>{
    throw new expresserror(403,"access forbidden");
})
//custom err handler
app.use((err,req,res,next)=>{
    let{status,message}=err;
    res.status(status).send(message);
    
})
app.get("/",(req,res)=>{
    res.send("random page");
});


app.listen(8080,()=>{
    console.log("listening");
});