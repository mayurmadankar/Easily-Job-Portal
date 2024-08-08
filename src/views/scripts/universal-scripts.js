//THIS FUNCTION IS FOR DELETE CONFERMATION
function confirmDelete(jobId) {
    const isConfirm = confirm("Are you sure ?");
    if (isConfirm) {
        fetch("/delete-job/" + jobId, {
            method: "POST"

        }).then(res => {
            if (res.ok) {
                window.location.href = '/jobs';
            }
        });
    }
}

//THIS FUNCTION SHOWS THE DATE ON WHICH THE JOB WAS POSTED 
document.addEventListener('DOMContentLoaded', function () {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
    document.getElementById('jobPostedDate').textContent = formattedDate;
});

//THIS FUNCTION OPENS THE RESUME PDF 
function openResume(resume) {
    console.log(resume);
    window.open(`/resume/${resume}`, '_blank');
}

//THIS FUNCTION COLLECTS THE [JobStructureArray] FROM THE BACKEND
document.addEventListener('DOMContentLoaded', function () {
    let searchBar = document.getElementById("my-search-input");
    searchBar.addEventListener("keyup", () => {
        let searchValue = document.getElementById("my-search-input").value.toUpperCase();

        let api = '/api/jobStructureArray';
        let res = fetch(api);
        res.then((value) => {
            return value.json();
        }).then((value) => {
            let iHTML = "";
            let apiObj = value.data;
            for (jobObj of apiObj) {
                let jobDesignation = jobObj.jobDesignation.toUpperCase();
                if (jobDesignation.indexOf(searchValue) == 0 && searchValue != "") {
                    iHTML += ` <div class="col-12 col-md-5 col-lg-4 mb-5">
                    <div class="my-card ">
                        <h2 class="mb-4 "><i class="bi bi-buildings"></i>${jobObj.companyName}</h2>
                        <h5><i class="bi bi-person-check"></i> Designation:</h5>
                        <p>${jobObj.jobDesignation}</p>
                        <h5><i class="bi bi-geo-alt"></i> Location:</h5>
                        <p>${jobObj.jobLocation}</p>
                        <h5><i class="bi bi-laptop"></i> Skills Required:</h5>
                        <p class="mb-5">${jobObj.skillsRequired}</p>
                        <a href="/more-details/${jobObj.id}" class="my-btn">More Details</a>
                    </div>
                </div>`;
                }
                document.getElementById("my-search-results").innerHTML = iHTML;

            }

        })

    });
});


//THIS FUNCTION SCROLLS THE PAGE TO THE TOP WHEN THE USER STARTS TYPING IN THE SEARCH BOX
document.addEventListener('DOMContentLoaded', function () {
    let searchBar = document.getElementById("my-search-input");
    searchBar.addEventListener("keyup", () => {

        window.scrollTo({
            top: 0,
            behavior: 'auto'
        });


    });
});
