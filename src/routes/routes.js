const Router = require("express");
const schemaValidator = require("../apps/middlewares/schemaValidator");
const UserController = require("../apps/controllers/UserController");
const AuthenticationController = require("../apps/controllers/AuthenticationController");
const UserSchema = require("../schema/create.user.schema.json");
const routes = Router();


routes.post("/users", schemaValidator(UserSchema), UserController.create);

routes.post("/auth", AuthenticationController.authenticate);

routes.get("/health", (req, res) => {
    return res.send({message: "connected with success"})
})

module.exports = routes;