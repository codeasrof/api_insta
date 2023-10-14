const Router = require("express")
const schemaValidator = require("../apps/middlewares/schemaValidator")
const UserController = require("../apps/controllers/UserController")
const PostController = require("../apps/controllers/PostController")
const AuthenticationController = require("../apps/controllers/AuthenticationController")
const AuthenticationMiddleware =  require("../apps/middlewares/authentication")
const UserSchema = require("../schema/create.user.schema.json")
const AuthSchema = require("../schema/auth.schema.json")
const PostSchema = require("../schema/post.schema.json")
const {upload} = require("../configs/multer")
const FileController = require("../apps/controllers/FileController")
const routes = Router();


routes.post("/users", schemaValidator(UserSchema), UserController.create)

routes.post("/auth",schemaValidator(AuthSchema), AuthenticationController.authenticate)

routes.use(AuthenticationMiddleware)

routes.put("/user", UserController.update)
routes.delete("/user", UserController.delete)
routes.get("/user-profile", UserController.userProfile)
routes.post("/upload", upload.single("image"), FileController.upload)
routes.post("/post", schemaValidator(PostSchema), PostController.create)
routes.delete("/post/:id", PostController.delete)
routes.put("/post/:id", PostController.update)

routes.get("/health", (req, res) => {
    return res.send({message: "connected with success"})
})

module.exports = routes;