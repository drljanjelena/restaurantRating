const path = require("path");
const express = require("express");

const {sequelize,ListViditedAndRestaurants} = require("../models");

const route = express.Router();
module.exports = route;

route.get("/api", async (req,res) => {
       try{
           const listvisitedandrestaurant = await ListViditedAndRestaurants.findAll();
           return res.json(listvisitedandrestaurant);
       } catch(err){
           console.log(err);
           res.status(500).json({ error: "Greska", data: err });
       }
});

route.post("/dodaj",  async (req,res) => {
    try{
        const lvar = await ListViditedAndRestaurants.create(req.body);
        return res.json(lvar);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.delete("/obrisi/:id",  async (req,res) => {
 try{
     const lvar = await ListViditedAndRestaurants.findByPk(req.params.id);
     lvar.destroy();
     return res.json( lvar.id );
 } catch(err){
     console.log(err);
     res.status(500).json({ error: "Greska", data: err });
 }
});

route.put("/edit/:id", async(req,res)=>{
    try{
        let lvar = await ListViditedAndRestaurants.findByPk(req.params.id);
        lvar.restaurantID = req.body.restaurantID;
        lvar.datum = req.body.datum;
        await lvar.save();
        res.send(lvar);
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.get("/api/:id", async (req, res) => {
    try{
        let data = await ListViditedAndRestaurants.findByPk(req.params.id);
        return res.json(data);
    } catch{ 
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
 });