const path = require("path");
const express = require("express");
const Joi = require('joi');
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = Joi.extend(joiPasswordExtendCore);
const {sequelize,WeeksFavourites} = require("../models");

const route = express.Router();
module.exports = route;

route.get("/api", async (req,res) => {
       try{
           const weeksfavourite = await WeeksFavourites.findAll();
           return res.json(weeksfavourite);
       } catch(err){
           console.log(err);
           res.status(500).json({ error: "Greska", data: err });
       }
});

route.post("/dodaj",  async (req,res) => {
    const shema = Joi.object().keys({
        weekNo: Joi.number().integer().min(1).max(52).required(),
        date: Joi.date().iso().required(),
        restaurantID : Joi.number().integer().min(1).required(),
    });
    const {error, succ} = shema.validate(req.body)
    if(error){
        res.status(403).json({ msg: error.details[0].message});
        console.log(error)
    } else {
    try{
        const wf = await WeeksFavourites.create(req.body);
        return res.json(wf);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
}
});

route.delete("/obrisi/:id",  async (req,res) => {
 try{
     const wf = await WeeksFavourites.findByPk(req.params.id);
     wf.destroy();
     return res.json( wf.id );
 } catch(err){
     console.log(err);
     res.status(500).json({ error: "Greska", data: err });
 }
});

route.put("/edit/:id", async(req,res)=>{
    const shema = Joi.object().keys({
        weekNo: Joi.number().integer().min(1).max(52).required(),
        date: Joi.date().iso().required(),
        restaurantID : Joi.number().integer().min(1).required(),
    });
    const {error, succ} = shema.validate(req.body)
    if(error){
        res.status(403).json({ msg: error.details[0].message});
        console.log(error)
    } else {
    try{
        let wf = await WeeksFavourites.findByPk(req.params.id);
        wf.weekNo = req.body.weekNo;
        wf.date = req.body.date;
        wf.restaurantID = req.body.restaurantID;
        await wf.save();
        res.send(wf);
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
}
});

route.get("/api/:id", async (req, res) => {
    try{
        let data = await WeeksFavourites.findByPk(req.params.id);
        return res.json(data);
    } catch{ 
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
 });