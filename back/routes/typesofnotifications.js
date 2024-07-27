const path = require("path");
const express = require("express");

const {sequelize,TypesOfNotifications,} = require("../models");

const route = express.Router();
module.exports = route;


route.get("/api", async (req,res) => {
       try{
           const typeofnotifications = await TypesOfNotifications.findAll();
           return res.json(typeofnotifications);
       } catch(err){
           console.log(err);
           res.status(500).json({ error: "Greska", data: err });
       }
});

route.post("/dodaj",  async (req,res) => {
    try{
        const tipO = await TypesOfNotifications.create(req.body);
        return res.json(tipO);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.put("/edit/:id", async(req,res)=>{
    try{
        let tipO = await TypesOfNotifications.findByPk(req.params.id);
        tipO.name = req.body.name;
        await tipO.save();
        res.send(tipO);
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.delete("/obrisi/:id",  async (req,res) => {
 try{
     const tipO = await TypesOfNotifications.findByPk(req.params.id);
     tipO.destroy();
     return res.json( tipO.id );
 } catch(err){
     console.log(err);
     res.status(500).json({ error: "Greska", data: err });
 }
});

route.get("/api/:id", async (req, res) => {
    try{
        let data = await TypesOfNotifications.findByPk(req.params.id);
        return res.json(data);
    } catch{ 
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
 });