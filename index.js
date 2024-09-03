// import express from "express";
const express = require('express');
const jsontoken = require('jsonwebtoken');

const port = 4000;

const app = express();
const secrettoken = "secretkey";

//creating get api
app.get('/', (req, res) => {
    res.json({ msg: "My first API" });
})

app.post('/login', (req, res) => {
    const user = { id: 1, username: "ramya", email: "ramya@gmail.com", password: "1234" }
    jsontoken.sign({ user }, secrettoken, { expiresIn: "300s" }, (err, token) => { res.json({ token }) });
})

app.post('/fetch',authenticatetoken,(req,res)=>{
    jsontoken.verify(req.token,secrettoken,(err,data)=>{
        if(err){
            res.send({msg: "Invalid Token"});
        }
        else{
            res.json({data, msg:" successfully verified"});
        }
    })

})

function authenticatetoken(req,res,next){
    const header=req.headers["authorization"];
    if(typeof header !== "undefined"){
        const bearer = header.split(" ");
        const token=bearer[1];
        req.token=token;
        next();


    }
    else{
        res.send({msg:"Token Invalid"});
    }
}

app.listen(port, () => {
    console.log(`server is running on ${port}`);
})