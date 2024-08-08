
import express from 'express';
import path from 'path';
import RouterController from './src/controller/router.controller.js';
import ejsLayouts from 'express-ejs-layouts';
import FormController from './src/controller/form.controller.js';
import session from 'express-session';
import { uploadFile } from './src/middleware/file-upload-middleware.js';
import {auth} from './src/middleware/auth.middleware.js'

const routerController = new RouterController();
const formController = new FormController();

const server = express();

server.use(session({
    secret: 'SecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false
    },
}));


server.set('view engine','ejs');
server.set('views',path.join(path.resolve(),'src','views'));

server.use(ejsLayouts);
server.use(express.urlencoded({ extended: true }));
server.use(express.static('src/views'));
server.use(express.static("public"));


server.get('/',routerController.getHomePage);

server.get('/jobs', routerController.getJobs);

server.get('/login', formController.getLogIn);
server.post('/login', formController.postLogin);

server.get('/register', formController.getRegister);
server.post('/register', formController.postRegister)

server.get('/create-job', formController.getCreateJob);
server.post('/create-job', auth, formController.postCreateJob);

server.get('/more-details/:id', routerController.getMoreDetails);

server.get('/apply-job/:id', formController.getApplyJob);
server.post('/apply-job/:id', uploadFile.single('applicantResume'), formController.postApplyJob);

server.get('/applicants-list/:id', auth, routerController.getApplicantsList);

server.get('/update-job/:id', auth, formController.getUpdateJob);
server.post('/update-job/:id', auth, formController.postUpdateJob);

server.post('/delete-job/:id', auth, routerController.getJobDelete);

server.get('/logout',formController.getLogout);

server.get('/api/jobStructureArray',routerController.getJobStructureArrayAPI);

const PORT=2000;

server.listen(PORT,()=>{
    console.log('Server is listening at PORT'+" "+PORT);
})