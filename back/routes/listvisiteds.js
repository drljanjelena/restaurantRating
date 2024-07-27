const path = require("path");
const express = require("express");

const {sequelize,ListVisiteds} = require("../models");

const route = express.Router();
module.exports = route;

route.get("/api", async (req,res) => {
       try{
           const listvisited = await ListVisiteds.findAll();
           return res.json(listvisited);
       } catch(err){
           console.log(err);
           res.status(500).json({ error: "Greska", data: err });
       }
   });

route.post("/dodaj",  async (req,res) => {
    try{
        const lv = await ListVisiteds.create(req.body);
        return res.json(lv);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.put("/edit/:id", async(req,res)=>{
    try{
        let lv = await ListVisiteds.findByPk(req.params.id);
        lv.dateOfVisit = req.body.dateOfVisit;
        await lv.save();
        res.send(lv);
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.delete("/obrisi/:id",  async (req,res) => {
 try{
     const lv = await ListVisiteds.findByPk(req.params.id);
     lv.destroy();
     return res.json( lv.id );
 } catch(err){
     console.log(err);
     res.status(500).json({ error: "Greska", data: err });
 }
});

route.get("/api/:id", async (req, res) => {
    try{
        let data = await ListVisiteds.findByPk(req.params.id);
        return res.json(data);
    } catch{ 
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
 });