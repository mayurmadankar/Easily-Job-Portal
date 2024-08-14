import JobStructure from "../model/job.model.js";
import ApplicantRecord from "../model/applicant.model.js";
// import jwtAuth from "../middleware/jwt.middleware.js";

let jobStructure = new JobStructure();
let applicantRecord = new ApplicantRecord();

export default class JobController {
  getHomePage(req, res) {
    return res.render("home-page.ejs");
  }

  getJobs(req, res) {
    let jobStructureArray = jobStructure.getJobStructureArray();
    return res.render("job-list-page", { jobStructureArray });
  }

  getMoreDetails(req, res) {
    const jobId = req.params.id;
    const jobObj = jobStructure.getJobById(jobId);
    const numberOfApplicants = jobStructure.getJobStructureArray().length;
    const recruiterEmail = req.user.email;

    if (!jobObj) {
      return res.status(404).render("404.ejs");
    }

    return res.render("more-details-page.ejs", {
      jobObj,
      numberOfApplicants,
      userEmail: recruiterEmail,
      token: req.cookies.jwtToken
    });
  }
  getApplicantsList(req, res) {
    const jobId = req.params.id;
    const jobObj = jobStructure.getJobById(jobId);
    const applicantArray =
      applicantRecord.getApplicantRecordObj()[jobObj.companyName];
    const userEmail = req.user.email; // from jwt
    return res.render("applicants-list-page.ejs", {
      jobObj,
      applicantArray,
      userEmail
    });
  }

  getUpdateJob(req, res) {
    const jobId = req.params.id;
    const jobObj = jobStructure.getJobById(jobId);
    const loggedInRecruiter = req.user.email;
    if (jobObj && jobObj.recruiterEmail === loggedInRecruiter) {
      res.render("update-job-page.ejs", {
        jobObj,
        userEmail: loggedInRecruiter
      });
    } else {
      res.render("404.ejs");
    }
  }
  getJobDelete(req, res) {
    const jobId = req.params.id;
    const jobObj = jobStructure.getJobById(jobId);
    const loggedInRecruiter = req.user.email;

    if (jobObj && jobObj.recruiterEmail === loggedInRecruiter) {
      jobStructure.deleteJob(jobId);
      let jobStructureArray = jobStructure.getJobStructureArray();
      return res.render("job-list-page", { jobStructureArray });
    } else {
      res.render("404.ejs");
    }
  }

  getJobStructureArrayAPI(req, res) {
    const api = jobStructure.getJobStructureArray();
    return res.json({ data: api });
  }
}
