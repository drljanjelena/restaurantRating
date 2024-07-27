const path = require("path");
const express = require("express");
const cors=require('cors');
const jwt = require('jsonwebtoken');
const {sequelize,Komentaris,Users} = require("./models");

const http = require('http');
const { Server } = require("socket.io");
require('dotenv').config();

const app = express();    
const server = http.createServer(app);

app.use(express.json());
app.use(cors(corsOptions));

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:8080',
        methods: ['GET', 'POST'],
        credentials: true
    },
    allowEIO3: true
});

var corsOptions = {
    origin:  'http://localhost:8080',
    optionsSuccessStatus: 200
}



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

app.use(express.static(path.join(__dirname, 'static')));

const oceneRoutes = require("./routes/ocena.js");
app.use("/ocene", oceneRoutes);

const usersRoutes = require("./routes/users.js");
app.use("/users", usersRoutes);

const restaurantsRoutes = require("./routes/restaurant.js");
app.use("/restaurants", restaurantsRoutes);

const typeofrestaurantsRoutes = require("./routes/typeofrestaurants.js");
app.use("/typeofrestaurants", typeofrestaurantsRoutes);

const typeofnotificationsRoutes = require("./routes/typesofnotifications.js");
app.use("/typeofnotifications", typeofnotificationsRoutes);

const notificationsRoutes = require("./routes/notifications.js");
app.use("/notifications", notificationsRoutes);

const locationsRoutes = require("./routes/locations.js");
app.use("/locations", locationsRoutes);

const weeksfavouriteRoutes = require("./routes/weeksfavourites.js");
app.use("/weeksfavourite", weeksfavouriteRoutes);

const listvisitedandrestaurantRoutes = require("./routes/listivisitedandrestaurants.js");
app.use("/listvisitedandrestaurant1", listvisitedandrestaurantRoutes);

const listvisitedRoutes = require("./routes/listvisiteds.js");
app.use("/listvisited", listvisitedRoutes);

const commentsRoutes = require("./routes/comments.js");
app.use("/komentari", commentsRoutes);

function authSocket(msg, next) {
    if (msg[1].token == null) {
        next(new Error("Not authenticated"));
    } else {
        jwt.verify(msg[1].token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                next(new Error(err));
            } else {
                msg[1].user = user;
                next();
            }
        });
    }
}

io.on('connection', socket => {
    socket.use(authSocket);
 
    socket.on('comment', msg => {
        const data = {
            content : msg.content,
            userID : msg.userID,
            restaurantID : msg.restaurantID,
        }
        console.log(data);
        
        Komentaris.create(data)
            .then( rows => {
                Komentaris.findOne({ where: { id: rows.id }})
                    .then( msg => io.emit('comment', JSON.stringify(msg)) ) 
            }).catch( err => socket.emit('error', err.message) );
    });

    socket.on('error', err => socket.emit('error', err.message) );
});

server.listen({ port: 4000 }, async () => {
    await sequelize.authenticate();
});