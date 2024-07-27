const path = require("path");
const express = require("express");

const {sequelize, Komentaris,Users} = require("../models");

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({extended:true}));
module.exports = route;

route.get("/api", async (req,res) => {
       try{
           const komentari = await Komentaris.findAll();
           return res.json(komentari);
       } catch(err){
           console.log(err);
           res.status(500).json({ error: "Greska", data: err });
       }
});

route.post("/dodaj",  async (req,res) => {
    try{
        const com = await Komentaris.create(req.body);
        return res.json(com);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.delete("/obrisi/:id",  async (req,res) => {
 try{
     const com = await Komentaris.findByPk(req.params.id);
     com.destroy();
     return res.json( com.id );
 } catch(err){
     console.log(err);
     res.status(500).json({ error: "Greska", data: err });
 }
});

route.put("/edit/:id", async(req,res)=>{
    try{
        let comment = await Komentaris.findByPk(req.params.id);
        comment.kontent = req.body.kontent;
        comment.ocenaID = req.body.ocenaID;
        comment.restaurantID = req.body.restaurantID;
        await comment.save();
        res.send(comment);
        console.log(comment);
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.get("/api/:id", async (req, res) => {
    try{
        let data = await Komentaris.findByPk(req.params.id);
        return res.json(data);
    } catch{ 
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
 });

 route.get('/api/restaurant/:id', async (req, res) => {
    try{
        const comments = await Komentaris.findAll({
            where: { restaurantID: req.params.id },
            include: [Users]
        });
        return res.json(comments);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});
