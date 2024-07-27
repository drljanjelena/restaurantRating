const path = require("path");
const express = require("express");

const {sequelize,Ocenas} = require("../models");

const route = express.Router();
module.exports = route;

route.get("/api", async (req,res) => {
    try{
        const ocene = await Ocenas.findAll();
        return res.json(ocene);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.post("/dodaj",  async (req,res) => {
    try{
        const novaOcena = await Ocenas.create(req.body);
        return res.json(novaOcena);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.put("/edit/:id", async(req,res)=>{
    try{
        let ocena = await Ocenas.findByPk(req.params.id);
        ocena.opis = req.body.opis;
        await ocena.save();
        res.send(ocena);
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.delete("/obrisi/:id",  async (req,res) => {
 try{
     const ocena = await Ocenas.findByPk(req.params.id);
     ocena.destroy();
     return res.json( ocena.id );
 } catch(err){
     console.log(err);
     res.status(500).json({ error: "Greska", data: err });
 }
});

route.get("/api/:id", async (req, res) => {
    try{
        let data = await Ocenas.findByPk(req.params.id);
        return res.json(data);
    } catch{ 
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
 });