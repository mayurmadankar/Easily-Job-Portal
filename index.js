import express from "express";
import path from "path";
import RouterController from "./src/controller/router.controller.js";
import ejsLayouts from "express-ejs-layouts";
import FormController from "./src/controller/form.controller.js";
import session from "express-session";
import { uploadFile } from "./src/middleware/file-upload-middleware.js";
// import { auth } from "./src/middleware/auth.middleware.js";
import jwtAuth from "./src/middleware/jwt.middleware.js";
import cookieParser from "cookie-parser";
import loggerMiddleware from "./src/middleware/logger.omiddleware.js";

const routerController = new RouterController();
const formController = new FormController();

const server = express();
server.use(cookieParser());

server.use(
  session({
    secret: "SecretKey",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false
    }
  })
);

server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src", "views"));

server.use(ejsLayouts);
server.use(express.urlencoded({ extended: true }));
server.use(express.static("src/views"));
server.use(express.static("public"));
server.use(loggerMiddleware);

server.get("/", routerController.getHomePage);

server.get("/jobs", routerController.getJobs);

server.get("/login", formController.getLogIn);
server.post("/login", formController.postLogin);

server.get("/register", formController.getRegister);
server.post("/register", formController.postRegister);

server.get("/create-job", jwtAuth, formController.getCreateJob);
server.post("/create-job", jwtAuth, formController.postCreateJob);

server.get("/more-details/:id", jwtAuth, routerController.getMoreDetails);

server.get("/apply-job/:id", formController.getApplyJob);
server.post(
  "/apply-job/:id",
  uploadFile.single("applicantResume"),
  formController.postApplyJob
);

server.get("/applicants-list/:id", jwtAuth, routerController.getApplicantsList);

server.get("/update-job/:id", jwtAuth, formController.getUpdateJob);
server.post("/update-job/:id", jwtAuth, formController.postUpdateJob);

server.post("/delete-job/:id", jwtAuth, routerController.getJobDelete);

server.get("/logout", formController.getLogout);

server.get("/api/jobStructureArray", routerController.getJobStructureArrayAPI);

export default server;
