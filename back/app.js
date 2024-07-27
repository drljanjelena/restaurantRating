const path = require("path");
const express = require("express");
const jwt = require('jsonwebtoken');
const cors=require('cors');
require('dotenv').config();


const {sequelize} = require("./models");

const app = express();      

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

function getCookies(req) {
    if (req.headers.cookie == null) return {};

    const rawCookies = req.headers.cookie.split('; ');
    const parsedCookies = {};

    rawCookies.forEach( rawCookie => {
        const parsedCookie = rawCookie.split('=');
        parsedCookies[parsedCookie[0]] = parsedCookie[1];
    });

    return parsedCookies;
};

function authToken(req, res, next) {
    const cookies = getCookies(req);
    const token = cookies['token'];
  
    if (token == null) return res.redirect(301, '/login');
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            
        if (err) return res.redirect(301, '/login');
    
        req.user = user;
    
        next();
    });
}

function isUser(req,res,next){
    const {role} = req.user;
    if((role === 'User')){
        return res.sendStatus(403);
    }else{
        next();
    }
}

function isModeratororUser(req,res,next){
    const {role} = req.user;
    if(role != 'Admin'){
        return res.sendStatus(403);
    }else{
        next();
    }
}

app.use(express.json());
app.use(express.static(path.join(__dirname, 'static')));

app.get("/", authToken, (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'login.html'));
});

app.get("/ocene", authToken,isUser, (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'rating.html'));
});


app.get("/komentari",authToken,isUser, (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'comments.html'));
});


app.get("/users",authToken,isModeratororUser, (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'users.html'));
});


app.get("/restaurants",authToken,isUser, (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'restaurants.html'));
});


app.get("/typeofrestaurants",authToken,isUser, (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'typesofresturants.html'));
});


app.get("/typeofnotifications",authToken,isUser, (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'typesofnotifications.html'));
});


app.get("/notifications",authToken,isUser, (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'notifications.html'));
});


app.get("/locations",authToken,isUser, (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'locations.html'));
});


app.get("/weeksfavourite",authToken,isUser, (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'weeksfavourites.html'));
});


app.get("/listvisitedandrestaurant1",authToken,isUser, (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'listvisitedandrestaurants.html'));
});


app.get("/listvisited",authToken,isUser, (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'vistitedlist.html'));
});

app.listen({ port: 8000 }, async () => {
    await sequelize.authenticate();
});