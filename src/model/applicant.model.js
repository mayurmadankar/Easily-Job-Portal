export default class ApplicantRecord{
    createCompanyArray(companyName) {
        if (!applicantRecordObj[companyName]) {
            applicantRecordObj[companyName] = [];
        }
    }
    addResumePath(applicantObj, resume) {
        applicantObj['applicantResume'] = resume;
    }
    pushApplicantRecordObj(companyName, applicantObj) {
        applicantRecordObj[companyName].push(applicantObj);

    }
    getApplicantRecordObj() {
        return applicantRecordObj;
    }
}
const applicantRecordObj=[

];