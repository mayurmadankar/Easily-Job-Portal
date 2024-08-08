
import JobStructure from "../model/job.model.js";
import ApplicantRecord from "../model/applicant.model.js";

let jobStructure = new JobStructure();
let applicantRecord = new ApplicantRecord();

export default class JobController{

    getHomePage(req,res){
        return res.render('home-page.ejs',{userEmail:req.session.UserEmail});
    }

    getJobs(req, res) {
        let jobStructureArray = jobStructure.getJobStructureArray();
        return res.render('job-list-page', { jobStructureArray, userEmail: req.session.userEmail });
    }

    getMoreDetails(req, res) {
        const jobId = req.params.id;
        const jobObj = jobStructure.getJobById(jobId);
        const numberOfApplicants = jobStructure.getJobStructureArray().length;

        // console.log('Job ID:', jobId);
        // console.log('Job Object:', jobObj);

        if (!jobObj) {
            return res.status(404).render('404.ejs');
        }
        
        return res.render('more-details-page.ejs', { jobObj, numberOfApplicants, userEmail: req.session.userEmail });
    }
    getApplicantsList(req, res) {
        const jobId = req.params.id;
        const jobObj = jobStructure.getJobById(jobId);
        const applicantArray = applicantRecord.getApplicantRecordObj()[jobObj.companyName];
        return res.render('applicants-list-page.ejs', { jobObj, applicantArray, userEmail: req.session.userEmail });
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
    getJobDelete(req, res) {
        const jobId = req.params.id;
        const jobObj = jobStructure.getJobById(jobId);
        const loggedInRecruiter = req.session.userEmail;

        if (jobObj && jobObj.recruiterEmail === loggedInRecruiter) {
            jobStructure.deleteJob(jobId);
            let jobStructureArray = jobStructure.getJobStructureArray();
            return res.render('job-list-page', { jobStructureArray });
        } else {
            res.render('404.ejs');
        }
    }

    getJobStructureArrayAPI(req, res) {
        const api = jobStructure.getJobStructureArray();
        return res.json({ data: api });
    }
}