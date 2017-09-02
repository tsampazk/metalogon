/**
 * Load dependencies
 */

global.async = require("async");
let bodyParser = require("body-parser");
let cors = require("cors");
let express = require("express");
let http = require("http");
global.Joi = require("Joi");
let jwPlatform = require("jwplatform-api");
global._ = require("lodash");
require("./dependencies/lodash-additional")(_); // TODO: npm package?
let mongoose = require('mongoose');
global.joigoose = require("joigoose")(mongoose);
global.uuid = require("uuid");

/**
 * Configuration
 */

global.config = require("./app/config");

/**
 * Store
 */

let db = mongoose.createConnection(config.mongodb.host);

/**
 * MVC
 */

let schemas = {};
let models = {};
let controllers = {};

// Canons
schemas.canon = require("./schemas/canon");
models.canon = require("./factories/model")(db, schemas.canon);
controllers.canon = require("./factories/controller")(models.canon);

// Categories
schemas.category = require("./schemas/category");
models.category = require("./factories/model")(db, schemas.category);
controllers.category = require("./factories/controller")(models.category);

// Genres
schemas.genre = require("./schemas/genre");
models.genre = require("./factories/model")(db, schemas.genre);
controllers.genre = require("./factories/controller")(models.genre);

// Classes
schemas.class = require("./schemas/class");
models.class = require("./factories/model")(db, schemas.class);
controllers.class = require("./factories/controller")(models.class);

// Videos
schemas.video = require("./schemas/video");
models.video = require("./factories/model")(db, schemas.video);
controllers.video = require("./factories/controller")(models.video);

// Canons/categories tree
controllers.tree = require("./controllers/tree")(models);

/**
 * JW Player
 */

controllers.jwvideo = require("./jwplayer/controller")(jwPlatform);

/**
 * Express
 */

let app = express();

// Middleware
app.use(cors());                                            // Enable cross-origin requests
app.use(bodyParser.json({                                   // Parses json request data
    type: "application/json",
    extended: true
}));
app.use(bodyParser.urlencoded({                             // Parses form request data
    type: "application/x-www-form-urlencoded",
    extended: true
}));

// Routing
_.forEach(controllers, function(controller, key) {
    if (controller.get) { app.get(config.api.root + "/" + key + "/:id", controller.get); console.log("GET " + config.api.root + "/" + key + "/:id"); }
    if (controller.getAll) { app.get(config.api.root + "/" + key, controller.getAll); console.log("GET " + config.api.root + "/" + key); }
    if (controller.create) { app.post(config.api.root + "/" + key, controller.create); console.log("POST " + config.api.root + "/" + key); }
    if (controller.update) { app.put(config.api.root + "/" + key + "/:id", controller.update); console.log("PUT " + config.api.root + "/" + key + "/:id"); }
    if (controller.delete) { app.delete(config.api.root + "/" + key + "/:id", controller.delete); console.log("DELETE " + config.api.root + "/" + key + "/:id"); }
});

/**
 * SERVER
 */

let server = http.createServer();

server.on("request", app); // Mount express app

server.listen(config.api.port, config.api.interface, function() {
    
    let address = server.address();
    
    console.log("API server is listening at http://" + address.address + ":" + address.port);
    
});
