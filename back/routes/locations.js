const path = require("path");
const express = require("express");
const Joi = require('joi');
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = Joi.extend(joiPasswordExtendCore);
const {sequelize,Locations} = require("../models");

const route = express.Router();
module.exports = route;

route.get("/api", async (req,res) => {
       try{
           const locations = await Locations.findAll();
           return res.json(locations);
       } catch(err){
           console.log(err);
           res.status(500).json({ error: "Greska", data: err });
       }
});

route.post("/dodaj",  async (req,res) => {
    const shema = Joi.object().keys({
        street: Joi.string().trim().min(2).max(100).required(),
        number: Joi.string().trim().required(),
        city : Joi.string().trim().min(2).max(30).required(),
        zipnumber: Joi.number().integer().min(10000).max(99999).required()
    });
    const {error, succ} = shema.validate(req.body)
    if(error){
        res.status(403).json({ msg: error.details[0].message});
        console.log(error)
    } else {
    try{
        const novalocation = await Locations.create(req.body);
        return res.json(novalocation);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
}
});

route.delete("/obrisi/:id",  async (req,res) => {
    try{
        const location = await Locations.findByPk(req.params.id);
        console.log(location)
        location.destroy();
        return res.json( location.id );
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.put("/edit/:id", async(req,res)=>{
    const shema = Joi.object().keys({
        street: Joi.string().trim().min(2).max(100).required(),
        number: Joi.string().trim().required(),
        city : Joi.string().trim().min(2).max(30).required(),
        zipnumber: Joi.number().integer().min(10000).max(99999).required()
    });
    const {error, succ} = shema.validate(req.body)
    if(error){
        res.status(403).json({ msg: error.details[0].message});
        console.log(error)
    } else {
    try{
        let location = await Locations.findByPk(req.params.id);
        location.street = req.body.street;
        location.number = req.body.number;
        location.city = req.body.city;
        location.zipnumber = req.body.zipnumber;
        await location.save();
        res.send(location);
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
}
});

route.get("/api/:id", async (req, res) => {
    try{
        let data = await Locations.findByPk(req.params.id);
        return res.json(data);
    } catch{ 
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
 });