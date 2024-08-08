
import UserModel from "../model/user.model.js";
import JobStructure from "../model/job.model.js";
import ApplicantRecord from "../model/applicant.model.js";
import NotificationMail from '../notifications/notificationMails.js'


let userModel = new UserModel();
let jobStructure = new JobStructure();
let applicantRecord = new ApplicantRecord();
let notificationMail = new NotificationMail();

export default class FormController{  
    postCreateJob(req, res) {
        const recruiterEmail = req.session.userEmail;
        jobStructure.pushJobStructureArray(req.body,recruiterEmail);
        let jobStructureArray = jobStructure.getJobStructureArray();
        return res.render('job-list-page', { jobStructureArray, userEmail: req.session.userEmail });
    }

    postUpdateJob(req, res) {
        const jobId = req.params.id;
        const recruiterEmail = req.session.userEmail;
        jobStructure.updateJob(req.body, jobId, recruiterEmail);
        const jobObj = jobStructure.getJobById(jobId);
        const numberOfApplicants = jobStructure.getJobStructureArray().length;
        return res.render('more-details-page', { jobObj, numberOfApplicants, userEmail: req.session.userEmail });
    }

    getLogIn(req, res) {
        return res.render('login-page.ejs', { userEmail: req.session.userEmail });
    }

   getRegister(req, res) {
    return res.render('register-page.ejs', { userEmail: req.session.userEmail });
}

 postRegister(req, res) {
    const { userName, userEmail, userPassword } = req.body;
    userModel.pushUserModelArray(userName, userEmail, userPassword);
    return res.render('login-page.ejs');
 }

 postLogin(req, res) {
    const { userEmail, userPassword } = req.body;
    const validUser = userModel.isValidUser(userEmail, userPassword);
    if (!validUser) {
        return res.render('404.ejs');
    } else {
        req.session.userEmail = userEmail;
        return res.render('home-page.ejs', { userEmail: req.session.userEmail });
    }
}

     getCreateJob(req, res) {
        return res.render('create-job-page.ejs', { userEmail: req.session.userEmail });
    }
    getUpdateJob(req, res) {
        const jobId = req.params.id;
        const jobObj = jobStructure.getJobById(jobId);
        const loggedInRecruiter = req.session.userEmail;
        if (jobObj && jobObj.recruiterEmail === loggedInRecruiter) {
            res.render('update-job-page.ejs', { jobObj, userEmail: req.session.userEmail });
        } else {
            res.render('404.ejs');
        }

    }
    getApplyJob(req, res) {
        const jobId = req.params.id;
        const jobObj = jobStructure.getJobById(jobId);
        return res.render('apply-form-page.ejs', { jobObj, userEmail: req.session.userEmail });
    }
    postApplyJob(req,res){
        const applicantObj = req.body;
        const resume = req.file.filename;
        const companyName = applicantObj.companyName;
        
        applicantRecord.createCompanyArray(companyName);
        applicantRecord.addResumePath(applicantObj, resume);
        applicantRecord.pushApplicantRecordObj(companyName, applicantObj);
    notificationMail.jobConfirmationMail(applicantObj);

    console.log(applicantObj.applicantEmail);
        return res.render('job-submitted-page', { applicantObj });
    }
    getLogout(req,res){
        req.session.destroy((err)=>{
            if(err){
                console.log(err);
            }else{
                res.redirect('/login');
            }
        })
    }
}