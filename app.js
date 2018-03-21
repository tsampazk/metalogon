/**
 * Load dependencies
 */

global.async = require("async");
const bodyParser = require("body-parser");
const cors = require("cors");
const crypto = require("crypto");
const express = require("express");
const http = require("http");
global.Joi = require("joi");
const jwPlatform = require("jwplatform-api");
global._ = require("lodash");
require("./dependencies/lodash-additional")(_); // TODO: npm package?
const mongo = require("mongodb");
global.uuid = require("uuid");

/**
 * Configuration
 */

global.config = require("./app/config");

/**
 * Lib
 */

const cryptography = require("./lib/cryptography")(crypto, uuid);
const store = require("./lib/store")(mongo);

/**
 * MVC
 */

const schemas = {};
const models = {};
const controllers = {};
const invitations = {};

// Annotation
schemas.annotation = require("./schemas/annotation");
models.annotation = require("./factories/model")(store, schemas.annotation);
controllers.annotation = require("./factories/controller")(models.annotation);

// Assignments
schemas.assignment = require("./schemas/assignment");
models.assignment = require("./factories/model")(store, schemas.assignment);
controllers.assignment = require("./factories/controller")(models.assignment);

// Canons
schemas.canon = require("./schemas/canon");
models.canon = require("./factories/model")(store, schemas.canon);
controllers.canon = require("./factories/controller")(models.canon);

// Categories
schemas.category = require("./schemas/category");
models.category = require("./factories/model")(store, schemas.category);
controllers.category = require("./factories/controller")(models.category);

// Classes
schemas.class = require("./schemas/class");
models.class = require("./factories/model")(store, schemas.class);
controllers.class = require("./factories/controller")(models.class);

// Collaborations
schemas.collaboration = require("./schemas/collaboration");
models.collaboration = require("./factories/model")(store, schemas.collaboration);
controllers.collaboration = require("./factories/controller")(models.collaboration);

// Enrollments
schemas.enrollment = require("./schemas/enrollment");
models.enrollment = require("./factories/model")(store, schemas.enrollment);
controllers.enrollment = require("./factories/controller")(models.enrollment);

// Genres
schemas.genre = require("./schemas/genre");
models.genre = require("./factories/model")(store, schemas.genre);
controllers.genre = require("./factories/controller")(models.genre);

// Users
schemas.user = require("./schemas/user");
models.user = require("./factories/model")(store, schemas.user);
controllers.user = require("./controllers/user")(models.user, cryptography, invitations);

// Videos
schemas.video = require("./schemas/video");
models.video = require("./factories/model")(store, schemas.video);
controllers.video = require("./factories/controller")(models.video);

// Canons/categories tree
controllers.tree = require("./controllers/tree")(models);

// Login
controllers.login = require("./controllers/login")(models.user, cryptography);

// Invitations
controllers.invitation = require("./controllers/invitation")(invitations);

// Collaborators
controllers.collaborator = require("./controllers/collaborator")(models.user, models.collaboration);

// Collaborated videos
controllers.collaborated = require("./controllers/collaborated")(models.video, models.collaboration);

/**
 * JW Player
 */

controllers.jwvideo = require("./controllers/jwvideo")(jwPlatform);
controllers.jwconversion = require("./controllers/jwconversion")(jwPlatform);

/**
 * Express
 */

const app = express();

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

// Context
const context = require("./middleware/context")(models.user);
app.use(context.initialize);
app.use(context.authenticate);
app.use(context.authorize);

// Routing
_.forEach(controllers, function(controller, key) {
    if (controller.get) { app.get(config.api.root + "/" + key + "/:id", controller.get); console.log("GET " + config.api.root + "/" + key + "/:id"); }
    if (controller.getAll) { app.get(config.api.root + "/" + key, controller.getAll); console.log("GET " + config.api.root + "/" + key); }
    if (controller.create) { app.post(config.api.root + "/" + key, controller.create); console.log("POST " + config.api.root + "/" + key); }
    if (controller.update) { app.put(config.api.root + "/" + key + "/:id", controller.update); console.log("PUT " + config.api.root + "/" + key + "/:id"); }
    if (controller.delete) { app.delete(config.api.root + "/" + key + "/:id", controller.delete); console.log("DELETE " + config.api.root + "/" + key + "/:id"); }
});

// Errors
app.use(context.handleErrors);


/**
 * SERVER
 */

const server = http.createServer();

server.on("request", app); // Mount express app

async.series([
    (done) => store.connect(done),
    (done) => server.listen(config.api.port, config.api.interface, done)
], (err) => {
    if (!err) {

        //models.genre.getAll(null, (err, genres) => _.each(genres, (genre) => models.genre.create(genre, _=>{})));
        models.genre.getAll(null, (err, genres) => console.log(genres));


        let address = server.address();

        console.log("API server is listening at http://" + address.address + ":" + address.port);

    }
    else {
        console.log(err);
    }
});

