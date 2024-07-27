const path = require("path");
const express = require("express");

const {sequelize,Notifications} = require("../models");

const route = express.Router();
module.exports = route;

route.get("/api", async (req,res) => {
       try{
           const notifications = await Notifications.findAll();
           return res.json(notifications);
       } catch(err){
           console.log(err);
           res.status(500).json({ error: "Greska", data: err });
       }
});

route.post("/dodaj",  async (req,res) => {
    try{
        const notification = await Notifications.create(req.body);
        return res.json(notification);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.delete("/obrisi/:id",  async (req,res) => {
 try{
     const notification = await Notifications.findByPk(req.params.id);
     notification.destroy();
     return res.json( notification.id );
 } catch(err){
     console.log(err);
     res.status(500).json({ error: "Greska", data: err });
 }
});

route.put("/edit/:id", async(req,res)=>{
    try{
        let notification = await Notifications.findByPk(req.params.id);
        notification.content = req.body.content;
        await notification.save();
        res.send(notification);
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.get("/api/:id", async (req, res) => {
    try{
        let data = await Notifications.findByPk(req.params.id);
        return res.json(data);
    } catch{ 
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
 });