# Easily-The Job Portal

This Job Portal Web Application is a comprehensive platform developed using Node.js and Express.js, providing a seamless experience for both recruiters and job seekers. Built with HTML, CSS, JavaScript, and Bootstrap, and leveraging the power of server-side scripting with Node.js, this application simplifies the job search and recruitment process


## Technologies

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
![Javascript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Git](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)



## Features

- **Recruiter Management:** 

    - Recruiters can register and log in securely to access their dashboard.

    - Perform CRUD (Create, Read, Update, Delete) operations on job postings, facilitating easy management of available positions.

    - View a detailed list of all applicants who have applied for the job postings.

    - Recruiters are allowed to open resumes of the job applicants

- **Job Seeker Interface:**

    - Job seekers can explore available job listings easily and efficiently using the live search bar.

    - Apply for desired jobs directly through the platform, streamlining the application process.

- **In-Memory Data Structures:**

    - The application utilizes in-memory data structures for efficient data handling, ensuring quick access and retrieval of information.

- **Notification System:**

    - Upon submitting a job application, users receive automatic notification emails, enhancing communication and keeping them informed about their application status.

### Steps to Setup

1. Clone the repository
2. Install dependencies
3. Run the server from the index.js file 
3. The server will start listening on port 3600.


## Project Structure

- **`public/`**

    - **`resume/`** All the uploaded resumes are stored here.

- **`src/`** Main application code.  

     - **`controller/`**
         - **`form.controller.js`** This file is handling all the form actions.

         - **`router.controller.js`** This file is handling all the form actions.

     - **`middleware`**
        - **`auth.middleware.js file`** This file has all the authentication codes.

        - **`file-upload.middleware.js file`** This file handles all the uploads using the multer library.

     - **`model/`**

         - **`applicant.model.js`** Defining the applicant model.

         - **`job.modle.js`** Defining the job model.

         - **`user.modle.js`** Defining the user model.

     - **`notifications/`**

         - **`notificatioMails.js`** Handling all the notification mails

     - **`views/`**:All the static files are in this folder. 

        - **`images/`** This folder has all the images used in the application.

        - **`scripts/`** 

            - **`nav-scripts.js`** This file is handling all the scripts of this nav bar.

            - **`universal-scripts.js`** This file is handling all the scripts of this application.

        - **`styles/`**

             - **`emailTemplate.css`** This file has all styles of the email template.

            - **`styles.css`** This file has all styles of the application.
        
        - **`404.ejs`** Error page of the application.

        - **`applicants-list-page.ejs`** This page represents the list of all the applicants who applied for a specific job.

        - **`apply-form-page.ejs`** Application form for the job.

        - **`create-job-page.ejs`** Form for the recruiters to create the job.

        - **`emailTemplate.html`** Form for the recruiters to create the job.

        - **`home-page.ejs`** Home page of the application.

        - **`job-list-page.ejs`** List of all the jobs.

        - **`job-submitted-page.ejs`** Confirmation page after successful submission of the job application.

        - **`layout.ejs`** This is the layout of the application.

        - **`login-page.ejs`** login page for recruiters.

        - **`more-details-page.ejs`** Details about the job.

        - **`register-page.ejs`** Registration page of the recruiters.

        - **`update-job-page.ejs`** Form to update the job.


- **`index.js`** Entry point of the application.
- **`package-lock.json`** File containing records of each dependency's version.
- **`package.json`** File containing project metadata and dependencies.
- **`README.md`** File containing complete information of the application.


## Dependencies

  - **ejs**: For handling dynamic layouts.

  - **express**: Framework form node.js.

  - **express-ejs-layouts**: For layouts to prevent code redundancy.

  - **express-session**: For authentications and handling cookies.

  - **multer**: For handling multipart form data.

  - **nodemailer**: For email notifications.


## Screenshots

### Home Page

![Home Page](/src/views/images/Easily-Home-Page.png "Home Page")

### Create Job Page

![Create Job Page](/src/views/images/Easily-Create-Job-Page.png "Create Job Page")

### Job Details Page

![Job Details Page](/src/views/images/Easily-Job-Details-page.png "Job Details Page")

### Job List Page

![Job List Page](/src/views/images/Easily-Job-List-Page.png "Job List Page")

### Login Page

![Login Page](/src/views/images/Easily-Login-Page.png "Login Page")

### Register Page

![Register Page](/src/views/images/Easily-Register-Page.png "Register Page")

### Job Details Page (Recruiter)

![Job Details Page (Recruiter)](/src/views/images/Easily-Rec-Job-Details-Page.png "Job Details Page (Recruiter)")


## Author

Mayur Madankar

## Contact me 

 [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/mayur-madankar/)  [![LeetCode](https://img.shields.io/badge/-LeetCode-FFA116?style=for-the-badge&logo=LeetCode&logoColor=black)](https://leetcode.com/u/mayurmadankar/)  [![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:madankarmayur5@gmail.com) 
 [![Naukari](https://img.shields.io/badge/Naukri.com-0A66C2?style=for-the-badge&logo=Naukri.com&logoColor=white)](https://www.naukri.com/mnjuser/profile?id=&altresid)

## License

This project is licensed under the ISC License.

