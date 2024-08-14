import UserModel from "../model/user.model.js";
import JobStructure from "../model/job.model.js";
import ApplicantRecord from "../model/applicant.model.js";
import NotificationMail from "../notifications/notificationMails.js";
import jwt from "jsonwebtoken";

let userModel = new UserModel();
let jobStructure = new JobStructure();
let applicantRecord = new ApplicantRecord();
let notificationMail = new NotificationMail();

export default class FormController {
  postCreateJob(req, res) {
    const recruiterEmail = req.user.email;

    jobStructure.pushJobStructureArray(req.body, recruiterEmail);
    let jobStructureArray = jobStructure.getJobStructureArray();

    return res.render("job-list-page", {
      jobStructureArray,
      userEmail: recruiterEmail,
      token: req.cookies.jwtToken
    });
  }

  postUpdateJob(req, res) {
    const jobId = req.params.id;
    const recruiterEmail = req.user.email;
    jobStructure.updateJob(req.body, jobId, recruiterEmail);
    const jobObj = jobStructure.getJobById(jobId);
    const numberOfApplicants = jobStructure.getJobStructureArray().length;
    return res.render("more-details-page", {
      jobObj,
      numberOfApplicants,
      userEmail: recruiterEmail,
      token: req.cookies.jwtToken
    });
  }

  getLogIn(req, res) {
    return res.render("login-page.ejs");
  }

  getRegister(req, res) {
    return res.render("register-page.ejs");
  }

  postRegister(req, res) {
    const { userName, userEmail, userPassword } = req.body;
    userModel.pushUserModelArray(userName, userEmail, userPassword);
    // return res.status(200).send('register')
    return res.render("login-page.ejs");
  }

  postLogin(req, res) {
    const { userEmail, userPassword } = req.body;
    const validUser = userModel.isValidUser(userEmail, userPassword);
    if (!validUser) {
      return res.render("404.ejs");
    } else {
      //1.creating the token
      const token = jwt.sign(
        { email: userEmail },
        "Np1feZQmW6aIC44XK4KFRBFoSbbwG4tL",
        { expiresIn: "1h" }
      );
      //sending token as a cookies
      res
        .status(201)
        .cookie("jwtToken", token, { maxAge: 900000, httpOnly: false });

      return res.render("home-page.ejs", { userEmail, token });
    }
  }

  getCreateJob(req, res) {
    const recruiterEmail = req.user.email;
    // console.log(recruiterEmail);

    return res.render("create-job-page.ejs", {
      userEmail: recruiterEmail,
      token: req.cookies.jwtToken
    });
  }
  getUpdateJob(req, res) {
    const jobId = req.params.id;
    const jobObj = jobStructure.getJobById(jobId);
    const loggedInRecruiter = req.user.email;
    if (jobObj && jobObj.recruiterEmail === loggedInRecruiter) {
      res.render("update-job-page.ejs", {
        jobObj,
        userEmail: loggedInRecruiter,
        token: req.cookies.jwtToken
      });
    } else {
      res.render("404.ejs");
    }
  }
  getApplyJob(req, res) {
    const jobId = req.params.id;
    const jobObj = jobStructure.getJobById(jobId);
    return res.render("apply-form-page.ejs", { jobObj });
  }
  postApplyJob(req, res) {
    const applicantObj = req.body;
    const resume = req.file.filename;
    const companyName = applicantObj.companyName;

    applicantRecord.createCompanyArray(companyName);
    applicantRecord.addResumePath(applicantObj, resume);
    applicantRecord.pushApplicantRecordObj(companyName, applicantObj);
    notificationMail.jobConfirmationMail(applicantObj);

    console.log(applicantObj.applicantEmail);
    return res.render("job-submitted-page", { applicantObj });
  }
  getLogout(req, res) {
    res.clearCookie("jwtToken"); // Clear the JWT token cookie
    res.redirect("/login"); // Redirect to the login page
  }
}
