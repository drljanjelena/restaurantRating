const path = require("path");
const express = require("express");

const {sequelize,TypeOfRestaurants} = require("../models");

const route = express.Router();
module.exports = route;

route.get("/api", async (req,res) => {
       try{
           const typeofrestaurants = await TypeOfRestaurants.findAll();
           return res.json(typeofrestaurants);
       } catch(err){
           console.log(err);
           res.status(500).json({ error: "Greska", data: err });
       }
});
   
route.post("/dodaj",  async (req,res) => {
    try{
        const noviTipRestorana = await TypeOfRestaurants.create(req.body);
        return res.json(noviTipRestorana);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.put("/edit/:id", async(req,res)=>{
    try{
        let tipR = await TypeOfRestaurants.findByPk(req.params.id);
        tipR.name = req.body.name;
        await tipR.save();
        res.send(tipR);
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.delete("/obrisi/:id",  async (req,res) => {
    try{
        const typeOR = await TypeOfRestaurants.findByPk(req.params.id);
        typeOR.destroy();
        return res.json( typeOR.id );
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.get("/api/:id", async (req, res) => {
    try{
        let data = await TypeOfRestaurants.findByPk(req.params.id);
        return res.json(data);
    } catch{ 
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
 });