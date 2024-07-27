const path = require("path");
const express = require("express");
const Joi = require('joi');
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = Joi.extend(joiPasswordExtendCore);
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const {sequelize,Users} = require("../models");

const route = express.Router();
module.exports = route;

route.get("/api", async (req,res) => {
       try{
           const user = await Users.findAll();
           return res.json(user);
       } catch(err){
           console.log(err);
           res.status(500).json({ error: "Greska", data: err });
       }
});

route.post("/dodaj",  async (req,res) => {
    const shema = Joi.object().keys({
        name: Joi.string().trim().min(2).max(30).required(),
        email: Joi.string().trim().email().required(),
        password : joiPassword.string().minOfLowercase(3).minOfUppercase(1)
                                .minOfSpecialCharacters(1).minOfNumeric(1).required(),
        role: Joi.string().required()
    });
    const {error, succ} = shema.validate(req.body)
    if(error){
        res.status(403).json({ msg: error.details[0].message});
        console.log(error)
    } else {
        const obj = {
            name: req.body.name,
            email: req.body.email,
            role: req.body.role,
            password: bcrypt.hashSync(req.body.password, 10)
        };
        Users.create(obj)
        .then( rows => {
            const usr = {
                userId: rows.id,
                user: rows.name
            };
            const token = jwt.sign(usr, process.env.ACCESS_TOKEN_SECRET);
            console.log(token);
            res.json({ token: token });
        }).catch(err=>res.status(500).json(err));
}
});

route.put("/edit/:id", async(req,res)=>{
    const shema = Joi.object().keys({
        name: Joi.string().trim().min(2).max(30).required(),
        email: Joi.string().trim().email().required(),
        password : joiPassword.string().minOfLowercase(3).minOfUppercase(1)
                                .minOfSpecialCharacters(1).minOfNumeric(1),
        role: Joi.string().valid("Admin","Moderator","User").required()
    });
    const {error, succ} = shema.validate(req.body)
    if(error){
        res.status(403).json({ msg: error.details[0].message});
        console.log(error)
    } else {
    try{
        let user = await Users.findByPk(req.params.id);
        user.name = req.body.name;
        user.email = req.body.email;
        user.role = req.body.role;
        await user.save();
        res.send(user);
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
}
});


route.delete("/obrisi/:id",  async (req,res) => {
    try{
        const user = await Users.findByPk(req.params.id);
        user.destroy();
        return res.json( user.id );
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

   route.get("/api/:id", async (req, res) => {
    try{
        let data = await Users.findByPk(req.params.id);
        return res.json(data);
    } catch{ 
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
 });