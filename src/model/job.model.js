export default class JobStructure {
  constructor(
    id,
    jobCategory,
    jobDesignation,
    jobLocation,
    companyName,
    salaryRange,
    applyBy,
    skillsRequired,
    numberOfOpenings,
    recruiterEmail
  ) {
    this.id = id;
    this.jobCategory = jobCategory;
    this.jobDesignation = jobDesignation;
    this.jobLocation = jobLocation;
    this.companyName = companyName;
    this.salaryRange = salaryRange;
    this.applyBy = applyBy;
    this.skillsRequired = skillsRequired;
    this.numberOfOpenings = numberOfOpenings;

    this.recruiterEmail = recruiterEmail;
  }
  pushJobStructureArray(formData, recruiterEmail) {
    const newJob = new JobStructure(
      jobStructureArray.length + 1,
      formData.jobCategory,
      formData.jobDesignation,
      formData.jobLocation,
      formData.companyName,
      formData.salaryRange,
      formData.applyBy,
      formData.skillsRequired,
      formData.numberOfOpenings,
      recruiterEmail
    );

    jobStructureArray.push(newJob);
  }
  getJobStructureArray() {
    return jobStructureArray;
  }
  getJobById(Id) {
    return jobStructureArray.find((job) => job.id === Number(Id));
  }
  updateJob(jobObj, jobId, recruiterEmail) {
    const updatedJob = new JobStructure(
      Number(jobId),
      jobObj.jobCategory,
      jobObj.jobDesignation,
      jobObj.jobLocation,
      jobObj.companyName,
      jobObj.salaryRange,
      jobObj.applyBy,
      jobObj.skillsRequired,
      jobObj.numberOfOpenings,
      recruiterEmail
    );
    const index = jobStructureArray.findIndex((job) => job.id == jobObj.id);
    jobStructureArray[index] = updatedJob;
  }

  deleteJob(jobId) {
    console.log("deleted");
    const index = jobStructureArray.findIndex((job) => job.id == jobId);
    jobStructureArray.splice(index, 1);
  }
}

let jobStructureArray = [
  new JobStructure(
    1,
    "Remote",
    "Backend Developer",
    "New Delhi",
    "Coding Ninjas",
    "16-18 LPA",
    "2023-11-23",
    "HTML, CSS, Javascript, Bootstrap",
    19
  ),

  new JobStructure(
    2,
    "Hybrid",
    "Frontend Developer",
    "New York, USA",
    "Google",
    "16-18 LPA",
    "2023-11-23",
    "HTML, CSS, Javascript, Bootstrap",
    19
  ),

  new JobStructure(
    3,
    "On-Site",
    "Full-Stack Developer",
    "Tokyo, Japan",
    "Microsoft",
    "16-18 LPA",
    "2023-11-23",
    "HTML, CSS, Javascript, Bootstrap",
    19
  )
];
