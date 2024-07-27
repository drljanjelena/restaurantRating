const path = require("path");
const express = require("express");
const Joi = require('joi');
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = Joi.extend(joiPasswordExtendCore);
const {sequelize,Restaurants} = require("../models");
const { Router } = require("express");

const route = express.Router();
module.exports = route;

route.use(express.json());
route.use(express.urlencoded({extended:true}));


route.get("/api", async (req,res) => {
    try{
        const restaurants = await Restaurants.findAll();
        return res.json(restaurants);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.post("/dodaj",  async (req,res) => {
    const shema = Joi.object().keys({
        name: Joi.string().trim().min(2).max(30).required(),
        radnoVreme: Joi.string().trim().required(),
        locationID : Joi.number().integer().min(1),
        typeID: Joi.number().integer().min(1)
    });
    const {error, succ} = shema.validate(req.body)
    if(error){
        res.status(403).json({ msg: error.details[0].message});
        console.log(error)
    } else {
       try{
           const novirestoran = await Restaurants.create(req.body);
           return res.json(novirestoran);
       } catch(err){
           console.log(err);
           res.status(500).json({ error: "Greska", data: err });
       }
    }
   });

route.delete("/obrisi/:id",  async (req,res) => {
    try{
        const restaurant = await Restaurants.findByPk(req.params.id);
        restaurant.destroy();
        return res.json( restaurant.id );
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.put("/edit/:id", async(req,res)=>{
    const shema = Joi.object().keys({
        name: Joi.string().trim().min(2).max(30).required(),
        radnoVreme: Joi.string().trim().required(),
        locationID : Joi.number().integer().min(1),
        typeID: Joi.number().integer().min(1)
    });
    const {error, succ} = shema.validate(req.body)
    if(error){
        res.status(403).json({ msg: error.details[0].message});
        console.log(error)
    } else {
    try{
        let restaurant = await Restaurants.findByPk(req.params.id);
        restaurant.name = req.body.name;
        restaurant.radnoVreme = req.body.radnoVreme;
        restaurant.locationID = req.body.locationID;
        restaurant.typeID = req.body.typeID;
        await restaurant.save();
        res.send(restaurant);
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
}
});

route.get("/api/:id", async (req, res) => {
    try{
        let data = await Restaurants.findByPk(req.params.id);
        return res.json(data);
    } catch{ 
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
 });

 const { Op } = require("sequelize");
 route.get("/api/find/:q", async (req, res) => {
    try{
        let data = await Restaurants.findAll({
            where: {
                [Op.or]: {
                    id: {
                        [Op.substring]: req.params.q
                    },
                    name: {
                        [Op.substring]: req.params.q
                    },
                    radnoVreme: {
                        [Op.substring]: req.params.q
                    }
                }
            }
        });
        return res.json(data);
    } catch(err){ 
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
 });